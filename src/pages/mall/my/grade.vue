<template>
  <div class="link">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{alias.agent || '代理中心'}}
    </x-header>
    <div class="link-body" v-if="showInfo">
      <div class="link-one">
        <img :src="userInfo.avatar || './static/libs/img/touxiang.png'" alt="">
        <div class="one-item">
          <div v-if="info.cityInfo === '' && info.channelInfo === '' && info.poolInfo === ''">
            <img src="../../../assets/mall/img/my/link1.png" alt="">
            <p v-if="userInfo.nickname">{{'昵称：' + userInfo.nickname}}</p>
            <p v-if="!userInfo.nickname">{{'UID：' + userInfo.uid}}</p>
          </div>
          <div  v-if="info.cityInfo">
            <img src="../../../assets/mall/img/my/link1.png" alt="">
            <p>{{alias.birthLevel || '地区代理'}}：{{info.cityInfo}}</p>
          </div>
          <div v-if="info.channelInfo">
            <img src="../../../assets/mall/img/my/link1.png" alt="">
            <p>{{alias.channelType || '渠道代理'}}：{{info.channelInfo}}</p>
          </div>
          <div v-if="info.poolInfo">
            <img src="../../../assets/mall/img/my/link1.png" alt="">
            <p>{{alias.poolType || '全球分红'}}：{{info.poolInfo}}</p>
          </div>
        </div>
      </div>
      <div class="link-two">
        <div class="address1" v-if="reUserInfo">
          <div>
            <img src="../../../assets/mall/img/my/link2.png" alt="">
            <p>{{agentInfo.up || '我的上级'}}</p>
          </div>
          <p>{{reUserInfo.nickname || reUserInfo.realname || reUserInfo.mobile}}</p>
        </div>
        <div class="address1" @click="jumpTo({name: 'mallMyTeam'})">
          <div>
            <img src="../../../assets/mall/img/my/link3.png" alt="">
            <p>{{agentInfo.team || '我的团队'}}</p>
          </div>
          <img src="../../../assets/mall/img/my/left.png" alt="">
        </div>
        <div class="address1" @click="jumpTo({name: 'mallExploitShop'})" v-if="info.otoUserType && $isMallUnderShop">
          <div>
            <img src="../../../assets/mall/img/under/u6.png" alt="">
            <p>{{'拓店者'}}</p>
          </div>
          <img src="../../../assets/mall/img/my/left.png" alt="">
        </div>
        <div class="address1" @click="jumpTo({name: 'mallMyCity'})" v-if="info.cityInfo && $isMallUnderShop">
          <div>
            <img src="../../../assets/mall/img/under/u7.png" alt="">
            <p>{{'我的区域'}}</p>
          </div>
          <img src="../../../assets/mall/img/my/left.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './my.less'
  import * as apiHttp from '../../../api/index'
  export default {
    data () {
      return {
        info: {},
        reUserInfo: {},
        userInfo: {},
        alias: {},
        agentInfo: {},
        showInfo: false
      }
    },
    mounted () {
      apiHttp.agentCenter().then(res => {
        if (res.code === 0) {
          this.showInfo = true
          this.info = res.data
          this.reUserInfo = res.data.reUserInfo
          this.userInfo = res.data.userInfo
          this.alias = res.data.titleInfo.alias
          this.agentInfo = res.data.titleInfo.alias.agentInfo
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/mall/style/_Variables";
  .link{
    .link-body{
      margin-top: @margin-top;
      .link-one{
        height: 1.84rem;
        background: #ffffff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 .3rem;
        margin-bottom: .2rem;
        img{
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
        }
        .one-item{
          margin-left: .3rem;
          div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
              width: .37rem;
              height: .29rem;
              margin-right: .2rem;
            }
            p{
              color: @font-main-color;
              font-size: @font-big;
            }
          }
        }
      }
      .link-two{
        .address1{
          margin: 0 0 .1rem;
          div{
            img{
              height: .53rem;
              width: .53rem;
              border-radius: 50%;
            }
          }
          img{
            width: 0.15rem;
            height: 0.25rem;
          }
        }
      }
    }
  }
</style>
