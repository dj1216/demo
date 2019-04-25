<template>
  <div class="team">
    <x-header
      slot="header"
      :left-options="{showBack: false}" v-if="agentInfo.size > 0"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{agentInfo.team || '我的团队'}}
    </x-header>
    <x-header
      slot="header"
      :left-options="{showBack: false}" v-if="agentInfo.size == 0"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{agentInfo.team || '我的团队'}}({{(info.count0)}})
    </x-header>
    <div class="team-body">
      <div class="team-head" v-if="agentInfo.size > 0">
        <span @click="changeType(1)" :class="type === 1 ? 'spActive' : ''" v-if="agentInfo.size >= 1">{{agentInfo.one || '一级'}}({{info.count1}}人)</span>
        <span @click="changeType(2)" :class="type === 2 ? 'spActive' : ''" v-if="agentInfo.size >= 2">{{agentInfo.two || '二级'}}({{info.count2}}人)</span>
        <span @click="changeType(3)" :class="type === 3 ? 'spActive' : ''" v-if="agentInfo.size >= 3">{{agentInfo.three || '三级'}}({{info.count3}}人)</span>
      </div>
      <div style="margin-top: 40%" v-show="(info.count0 == 0) || (type == 2 && info.count2 == 0) || (type == 3 && info.count3 == 0) || (type == 1 && info.count1 == 0)">
        <img src="../../../assets/mall/img/my/tuandui.png" alt="" style="width: 34%;margin-left: 33%;">
        <p style="width: 40%;margin-left: 30%;">亲，您的团队暂时没有人哦!</p>
      </div>
      <div class="team-list" v-for="(item,i) in list" :key="i" @click="checkTeam(item.uid)">
        <img :src="item.avatar || './static/libs/img/touxiang.png'" alt="">
        <div>
          <p>昵称：{{item.nickname || '未设置'}}</p>
          <p v-if="item.realname">名称：{{item.realname}}</p>
          <p>会员编号：{{item.uid}}</p>
          <p v-if="item.mobile">手机号：{{item.mobile}}</p>
          <p v-if="item.isDis">等级：{{item.isDis}}</p>
          <p v-if="item.created_at">加入时间：{{formatDate(item.created_at)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  export default {
    data () {
      return {
        type: 0,
        info: {},
        list: {},
        agentInfo: {}
      }
    },
    mounted () {
      apiHttp.myTeam(this.type).then(res => {
        if (res.code === 0) {
          this.info = res.data
          this.list = res.data.list
          this.agentInfo = res.data.titleInfo.alias.agentInfo
        }
      })
    },
    methods: {
      changeType (type) {
        this.type = type
      },
      checkTeam (uid) {
        apiHttp.myTeamLe(uid).then(res => {
          if (res.code === 0) {
            this.info = res.data
            this.list = res.data.list
            this.agentInfo = res.data.titleInfo.alias.agentInfo
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/mall/style/_Variables";
  .team{
    .team-body{
      margin-top: @margin-top;
      .team-head{
        height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background: #ffffff;
        padding: 0 .3rem;
        margin-bottom: .2rem;
        .spActive{
          color: @main-red-color !important;
          border-bottom: 2px solid @main-red-color;
        }
        span{
          height: 1rem;
          line-height: 1rem;
          color: @font-main-color;
          font-size: @font-more-big;
          box-sizing: border-box;
        }
      }
      .team-list{
        padding: 0 .3rem;
        background: #ffffff;
        height: 2.8rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        img{
          height: 1.3rem;
          width: 1.3rem;
          border-radius: 50%;
          margin: -.8rem .3rem 0 0;
        }
        div{
          p{
            color: @font-main-color;
            font-size: @font-big;
          }
        }
      }
    }
  }
</style>
