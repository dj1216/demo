<template>
  <div class="yueList_box">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{titleInfo.credit1}}明细
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="content">
          <div id="d6"></div>
          <div class="list" v-for="(item,i) in jfList" :key="i">
            <div class="list_box">
              <div class="box_left">
                <div class="title">
                  {{typesInfo[item.types] || '其他'}}
                </div>
                <div class="time">
                  {{formatDate(item.created_at)}}
                </div>
              </div>
              <div class="box_right">
                <span v-if="item.price > 0">+</span>{{item.price}}
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import * as apiHttp from '../../../../api/index'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import * as utils from '../../../../utils'
  export default {
    components: {
      XHeader,
      MescrollVue
    },
    data () {
      return {
        finish: false,
        page: 1,
        jfList: [],
        typesInfo: {},
        titleInfo: utils.storage.get('titleInfo'),
        mescroll: null,
        mescrollDown: {
          auto: false,
          callback: this.refresh
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0
          },
          htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
          noMoreSize: 5,
          toTop: {
            src: './static/img/auth/back_top.png',
            offset: 1000
          },
          empty: {
            warpId: 'd6',
            icon: './static/img/auth/kong.png',
            tip: '暂无相关数据~'
          }
        }
      }
    },
    methods: {
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.jifenList(page.num).then(res => {
          if (res.code === 0) {
            this.typesInfo = res.data.typesInfo
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.jfList = []
            this.jfList = this.jfList.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      },
      refresh: function () {
        this.finish = false
        let This = this
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      }
    }
  }
</script>

<style>

</style>
