import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/pages/layout/'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/wechatLogin',
          name: 'wechatLogin',
          component: resolve => require(['@/pages/auth/wechat_login'], resolve),
          meta: {title: '微信登录', keepAlive: true}
        },
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
          meta: {title: '登录'}
        },
        {
          path: '/wxbind',
          name: 'wxbind',
          component: resolve => require(['@/pages/auth/wxbind'], resolve),
          meta: {title: '绑定手机号'}
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/pages/auth/register'], resolve),
          meta: {title: '注册'}
        },
        {
          path: '/forget',
          name: 'forget',
          component: resolve => require(['@/pages/auth/forget'], resolve),
          meta: {title: '忘记密码'}
        },
        {
          path: '/mobileLogin',
          name: 'mobileLogin',
          component: resolve => require(['@/pages/auth/mobile_login'], resolve),
          meta: {title: '手机登录'}
        },
        {
          path: '/guide',
          name: 'guide',
          component: resolve => require(['@/pages/layout/guide'], resolve)
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/pages/home/'], resolve),
          meta: {title: '首页', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/signIn',
          name: 'signIn',
          component: resolve => require(['@/pages/home/signIn'], resolve),
          meta: {title: '签到', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/newIndex',
          name: 'newIndex',
          component: resolve => require(['@/pages/superRouter/index'], resolve),
          meta: {title: '超级入口', keepAlive: false, isShowHead: false, isShowTab: true}
        },
        {
          path: '/videoList',
          name: 'videoList',
          component: resolve => require(['@/pages/home/videoList'], resolve),
          meta: {title: '共享影视', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/videoPay',
          name: 'videoPay',
          component: resolve => require(['@/pages/home/videoPay'], resolve),
          meta: {title: '支付中心', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/videoCard',
          name: 'videoCard',
          component: resolve => require(['@/pages/home/videoCard'], resolve),
          meta: {title: '卡密列表', keepAlive: false, isShowSearch: true, isShowTab: false}
        },
        {
          path: '/videoDetail',
          name: 'videoDetail',
          component: resolve => require(['@/pages/home/videoDetail'], resolve),
          meta: {title: '共享影视', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/dayingList',
          name: 'dayingList',
          component: resolve => require(['@/pages/home/dayingList'], resolve),
          meta: {title: '晒单', keepAlive: true, isShowSearch: true, isShowTab: false}
        },
        {
          path: '/dayingDetail',
          name: 'dayingDetail',
          component: resolve => require(['@/pages/home/dayingDetail'], resolve),
          meta: {title: '详情', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/daying',
          name: 'daying',
          component: resolve => require(['@/pages/home/daying'], resolve),
          meta: {title: '晒单', keepAlive: true, isShowHead: true, isShowTab: false}
        },
        {
          path: '/comment',
          name: 'comment',
          component: resolve => require(['@/pages/home/comment'], resolve),
          meta: {title: '发表评论', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/dayingShop',
          name: 'dayingShop',
          component: resolve => require(['@/pages/home/dayingShop'], resolve),
          meta: {title: '选择晒单商品', keepAlive: true, isShowHead: true, isShowTab: false}
        },
        {
          path: '/liveBroadcast',
          name: 'liveBroadcast',
          component: resolve => require(['@/pages/home/liveBroadcast'], resolve),
          meta: {title: '好券直播', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/alibc',
          name: 'aliBc',
          component: resolve => require(['@/pages/home/aliBc'], resolve),
          meta: {title: '淘宝', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/classify',
          name: 'classify',
          component: resolve => require(['@/pages/home/classify'], resolve),
          meta: {title: '分类', keepAlive: true, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/otherclassify',
          name: 'otherclassify',
          component: resolve => require(['@/pages/home/otherclassify'], resolve),
          meta: {title: '分类', keepAlive: true, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/home/search'], resolve),
          meta: {title: '搜索', keepAlive: false, isShowSearch: true, isShowTab: false}
        },
        {
          path: '/sort',
          name: 'sort',
          component: resolve => require(['@/pages/sort'], resolve),
          meta: {title: '分类页', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/block',
          name: 'block',
          component: resolve => require(['@/pages/block'], resolve),
          meta: {title: '交易大厅', keepAlive: true, isShowHead: false, isShowTab: false}
        },
        {
          path: '/turnOut',
          name: 'turnOut',
          component: resolve => require(['@/pages/block/turnOut'], resolve),
          meta: {title: '转出到集分宝', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/exchange',
          name: 'exchange',
          component: resolve => require(['@/pages/block/exchange'], resolve),
          meta: {title: '兑换区块币', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/blockList',
          name: 'blockList',
          component: resolve => require(['@/pages/block/list'], resolve),
          meta: {title: '交易记录', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/my',
          name: 'my',
          component: resolve => require(['@/pages/my'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/my1',
          name: 'my1',
          component: resolve => require(['@/pages/my/index1'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/my2',
          name: 'my2',
          component: resolve => require(['@/pages/my/index2'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/my3',
          name: 'my3',
          component: resolve => require(['@/pages/my/index3'], resolve),
          meta: {title: '我的', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/info',
          name: 'info',
          component: resolve => require(['@/pages/my/info'], resolve),
          meta: {title: '个人信息', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/revise',
          name: 'revise',
          component: resolve => require(['@/pages/my/revise'], resolve),
          meta: {title: '修改密码', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/contact',
          name: 'contact',
          component: resolve => require(['@/pages/my/contact'], resolve),
          meta: {title: '联系客服', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/help',
          name: 'help',
          component: resolve => require(['@/pages/my/help'], resolve),
          meta: {title: '帮助中心', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/linkman',
          name: 'linkman',
          component: resolve => require(['@/pages/my/linkman'], resolve),
          meta: {title: '联系我们', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/weighting',
          name: 'weighting',
          component: resolve => require(['@/pages/my/weighting'], resolve),
          meta: {title: '加权分红', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/weightingHelp',
          name: 'weightingHelp',
          component: resolve => require(['@/pages/my/weightingHelp'], resolve),
          meta: {title: '活动规则', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/notice',
          name: 'notice',
          component: resolve => require(['@/pages/my/notice'], resolve),
          meta: {title: '消息', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/noticeDetail',
          name: 'noticeDetail',
          component: resolve => require(['@/pages/my/noticeDetail'], resolve),
          meta: {title: '消息详情', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/about',
          name: 'about',
          component: resolve => require(['@/pages/my/about'], resolve),
          meta: {title: '文章', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/footprint',
          name: 'footprint',
          component: resolve => require(['@/pages/my/footprint'], resolve),
          meta: {title: '足迹', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/collect',
          name: 'collect',
          component: resolve => require(['@/pages/my/collect'], resolve),
          meta: {title: '我的收藏', keepAlive: false, isShowSearch: true, isShowTab: false}
        },
        {
          path: '/binding',
          name: 'binding',
          component: resolve => require(['@/pages/my/binding'], resolve),
          meta: {title: '绑定微信', keepAlive: true, isShowHead: true, isShowTab: false}
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: resolve => require(['@/pages/my/withdraw'], resolve),
          meta: {title: '提现', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/jifenbao',
          name: 'jifenbao',
          component: resolve => require(['@/pages/my/jifenbao'], resolve),
          meta: {title: '集分宝提现', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/jifenbaoList',
          name: 'jifenbaoList',
          component: resolve => require(['@/pages/my/jifenbaoList'], resolve),
          meta: {title: '账户明细', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/operator',
          name: 'operator',
          component: resolve => require(['@/pages/my/operator'], resolve),
          meta: {title: '运营商返佣', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/withdrawlist',
          name: 'withdrawlist',
          component: resolve => require(['@/pages/my/withdrawlist'], resolve),
          meta: {title: '提现明细', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/join',
          name: 'join',
          component: resolve => require(['@/pages/my/join'], resolve),
          meta: {title: '加入运营商', isShowHead: true}
        },
        {
          path: '/upgradeAgency',
          name: 'upgradeAgency',
          component: resolve => require(['@/pages/my/upgradeAgency'], resolve),
          meta: {title: '升级运营总监', isShowHead: true}
        },
        {
          path: '/freeUpgrade',
          name: 'freeUpgrade',
          component: resolve => require(['@/pages/my/freeUpgrade'], resolve),
          meta: {title: '升级运营商', isShowHead: true}
        },
        {
          path: '/partnership',
          name: 'partnership',
          component: resolve => require(['@/pages/my/partnership'], resolve),
          meta: {title: '申请代理', isShowHead: true}
        },
        {
          path: '/team',
          name: 'team',
          component: resolve => require(['@/pages/my/team'], resolve),
          meta: {title: '团队', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/profit',
          name: 'profit',
          component: resolve => require(['@/pages/my/profit'], resolve),
          meta: {title: '收益', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/invite',
          name: 'invite',
          component: resolve => require(['@/pages/my/invite'], resolve),
          meta: {title: '邀请', keepAlive: true, isShowHead: true, isShowTab: false}
        },
        {
          path: '/pullNew',
          name: 'pullNew',
          component: resolve => require(['@/pages/my/pullNew'], resolve),
          meta: {title: 'U券拉新', keepAlive: true, isShowHead: false, isShowTab: false}
        },
        {
          path: '/pullNewRule',
          name: 'pullNewRule',
          component: resolve => require(['@/pages/my/pullNewRule'], resolve),
          meta: {title: '拉新规则详解', keepAlive: true, isShowHead: true, isShowTab: false}
        },
        {
          path: '/sharePoster',
          name: 'sharePoster',
          component: resolve => require(['@/pages/my/sharePoster'], resolve),
          meta: {title: 'U券拉新-海报分享', keepAlive: true, isShowHead: false, isShowTab: false}
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/pages/my/order'], resolve),
          meta: {title: '我的订单', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/orderlist',
          name: 'orderlist',
          component: resolve => require(['@/pages/my/orderlist'], resolve),
          meta: {title: '订单列表', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/add',
          name: 'add',
          component: resolve => require(['@/pages/my/add'], resolve),
          meta: {title: '添加账户', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/materials',
          name: 'materials',
          component: resolve => require(['@/pages/materials'], resolve),
          meta: {title: '素材', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/materials2',
          name: 'materials2',
          component: resolve => require(['@/pages/materials/index2'], resolve),
          meta: {title: '素材', keepAlive: true, isShowSearch: false, isShowTab: true}
        },
        {
          path: '/circle',
          name: 'circle',
          component: resolve => require(['@/pages/materials/circle'], resolve),
          meta: {title: '趣味发圈', isShowHead: true, keepAlive: true, isShowSearch: true}
        },
        {
          path: '/list',
          name: 'list',
          component: resolve => require(['@/pages/home/list'], resolve),
          meta: {title: '分类', isShowHead: true, isShowTab: false, keepAlive: true}
        },
        {
          path: '/select',
          name: 'select',
          component: resolve => require(['@/pages/home/select'], resolve),
          meta: {title: '好货优选', isShowHead: true, isShowTab: false, keepAlive: true}
        },
        {
          path: '/super',
          name: 'super',
          component: resolve => require(['@/pages/super'], resolve),
          meta: {title: '超級搜', isShowTab: true, keepAlive: true}
        },
        {
          path: '/results',
          name: 'results',
          component: resolve => require(['@/pages/super/results'], resolve),
          meta: {title: '搜索结果', isShowSearch: true, isShowTab: false, keepAlive: true}
        },
        {
          path: '/supergoods',
          name: 'supergoods',
          component: resolve => require(['@/pages/super/supergoods'], resolve),
          meta: {title: '搜索详情', isShowSearch: false, isShowTab: false}
        },
        {
          path: '/supergoods1',
          name: 'supergoods1',
          component: resolve => require(['@/pages/super/supergoods1'], resolve),
          meta: {title: '搜索详情', isShowSearch: false, isShowTab: false}
        },
        {
          path: '/supergoods2',
          name: 'supergoods2',
          component: resolve => require(['@/pages/super/supergoods2'], resolve),
          meta: {title: '搜索详情', isShowSearch: false, isShowTab: false}
        },
        {
          path: '/share',
          name: 'share',
          component: resolve => require(['@/pages/home/share'], resolve),
          meta: {title: '分享', isShowHead: true}
        },
        {
          path: '/personSpeak',
          name: 'personSpeak',
          component: resolve => require(['@/pages/home/personSpeak'], resolve),
          meta: {title: '达人说', isShowHead: true, keepAlive: true}
        },
        {
          path: '/personArticle',
          name: 'personArticle',
          component: resolve => require(['@/pages/home/personArticle'], resolve),
          meta: {title: '达人文章', isShowHead: true, keepAlive: true}
        },
        {
          path: '/fastrob',
          name: 'fastrob',
          component: resolve => require(['@/pages/home/fastrob'], resolve),
          meta: {title: '秒杀', isShowHead: false}
        },
        {
          path: '/discounts',
          name: 'discounts',
          component: resolve => require(['@/pages/home/discounts'], resolve),
          meta: {title: '优惠专场', isShowHead: true}
        },
        {
          path: '/mall/home',
          name: 'mallHome',
          component: resolve => require(['../pages/mall/home/index.vue'], resolve),
          meta: {title: '商城首页', keepAlive: false, isShowSearch: false, isShowTab: false, isShopShowTab: false}
        },
        {
          path: '/mall/news',
          name: 'mallNews',
          component: resolve => require(['../pages/mall/home/news.vue'], resolve),
          meta: {title: '消息', keepAlive: true, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/newDetail',
          name: 'mallNewDetail',
          component: resolve => require(['../pages/mall/home/newDetail.vue'], resolve),
          meta: {title: '消息详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/search',
          name: 'mallSearch',
          component: resolve => require(['../pages/mall/home/search.vue'], resolve),
          meta: {title: '搜索', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/fixing_order',
          name: 'mallFixing_order',
          component: resolve => require(['../pages/mall/home/fixing_order.vue'], resolve),
          meta: {title: '订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/payMent',
          name: 'mallPayMent',
          component: resolve => require(['../pages/mall/home/payMent.vue'], resolve),
          meta: {title: '支付', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/homeDetail',
          name: 'mallHomeDetail',
          component: resolve => require(['../pages/mall/home/homeDetail.vue'], resolve),
          meta: {title: '商品详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/CSD',
          name: 'mallCSD',
          component: resolve => require(['../pages/mall/home/CSD.vue'], resolve),
          meta: {title: '客服', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/firmOrder',
          name: 'mallFirmOrder',
          component: resolve => require(['../pages/mall/home/firmOrder.vue'], resolve),
          meta: {title: '确认订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/paySuccess',
          name: 'mallPaySuccess',
          component: resolve => require(['../pages/mall/home/paySuccess.vue'], resolve),
          meta: {title: '支付成功', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/shopProductList',
          name: 'mallShopProductList',
          component: resolve => require(['../pages/mall/home/shopProductList.vue'], resolve),
          meta: {title: '商品分类', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/orderDetail',
          name: 'mallOrderDetail',
          component: resolve => require(['../pages/mall/home/orderDetail.vue'], resolve),
          meta: {title: '订单详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/Refund_detail',
          name: 'mallRefund_detail',
          component: resolve => require(['../pages/mall/home/Refund_detail.vue'], resolve),
          meta: {title: '退款详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/comment',
          name: 'mallComment',
          component: resolve => require(['../pages/mall/home/comment.vue'], resolve),
          meta: {title: '评论', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/my',
          name: 'mallMy',
          component: resolve => require(['../pages/mall/my/index.vue'], resolve),
          meta: {title: '个人中心', keepAlive: false, isShowSearch: false, isShowTab: false, isShopShowTab: false}
        },
        {
          path: '/mall/footprint',
          name: 'mallFootprit',
          component: resolve => require(['../pages/mall/my/footprint.vue'], resolve),
          meta: {title: '我的足记', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/address',
          name: 'mallAddress',
          component: resolve => require(['../pages/mall/my/address.vue'], resolve),
          meta: {title: '地址列表', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/addAddress',
          name: 'mallAddAddress',
          component: resolve => require(['../pages/mall/my/addAddress.vue'], resolve),
          meta: {title: '添加地址', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/updateAddress',
          name: 'mallUpdateAddress',
          component: resolve => require(['../pages/mall/my/updateAddress.vue'], resolve),
          meta: {title: '修改地址', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/exchange',
          name: 'mallExchange',
          component: resolve => require(['../pages/mall/my/exchange.vue'], resolve),
          meta: {title: '退款信息', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/logistics',
          name: 'mallLogistics',
          component: resolve => require(['../pages/mall/my/logistics.vue'], resolve),
          meta: {title: '查看物流', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/appraise',
          name: 'mallAppraise',
          component: resolve => require(['../pages/mall/my/appraise.vue'], resolve),
          meta: {title: '评价', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/cart',
          name: 'mallCart',
          component: resolve => require(['../pages/mall/cart/index.vue'], resolve),
          meta: {title: '购物车', keepAlive: false, isShowSearch: false, isShowTab: false, isShopShowTab: false}
        },
        {
          path: '/mall/shopCenter',
          name: 'mallShopCenter',
          component: resolve => require(['../pages/mall/shops/index.vue'], resolve),
          meta: {title: '商家中心', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/applyShop',
          name: 'mallApplyShop',
          component: resolve => require(['../pages/mall/shops/applyShop.vue'], resolve),
          meta: {title: '申请商家', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/business',
          name: 'mallBusiness',
          component: resolve => require(['../pages/mall/business/index.vue'], resolve),
          meta: {title: '商家首页', keepAlive: true, isShowSearch: false, isShowTab: false, isShopShowTab: false}
        },
        {
          path: '/mall/category',
          name: 'mallCategory',
          component: resolve => require(['../pages/mall/business/category.vue'], resolve),
          meta: {title: '商家分类', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/collection',
          name: 'mallCollection',
          component: resolve => require(['../pages/mall/collection/index.vue'], resolve),
          meta: {title: '商品收藏', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/shops',
          name: 'mallShops',
          component: resolve => require(['../pages/mall/collection/shop.vue'], resolve),
          meta: {title: '店铺收藏', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/seller',
          name: 'mallSeller',
          component: resolve => require(['../pages/mall/business/seller.vue'], resolve),
          meta: {title: '商家详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/productList',
          name: 'mallProductList',
          component: resolve => require(['../pages/mall/home/productList.vue'], resolve),
          meta: {title: '商品列表', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/articleInfo',
          name: 'mallArticleInfo',
          component: resolve => require(['../pages/mall/home/articleInfo.vue'], resolve),
          meta: {title: '文章详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/articleList',
          name: 'mallArticleList',
          component: resolve => require(['../pages/mall/home/articleList.vue'], resolve),
          meta: {title: '文章列表', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/offOrders',
          name: 'mallOffOrders',
          component: resolve => require(['../pages/mall/shops/offOrders.vue'], resolve),
          meta: {title: '线下订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/onOrders',
          name: 'mallOnOrders',
          component: resolve => require(['../pages/mall/shops/onOrders.vue'], resolve),
          meta: {title: '线上订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/onOrderDetails',
          name: 'mallOnOrderDetails',
          component: resolve => require(['../pages/mall/shops/onOrderDetails.vue'], resolve),
          meta: {title: '订单详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/withdrawList',
          name: 'mallWithdrawList',
          component: resolve => require(['../pages/mall/shops/withdrawList.vue'], resolve),
          meta: {title: '提现记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/withdraw',
          name: 'mallWithdraw',
          component: resolve => require(['../pages/mall/shops/withdraw.vue'], resolve),
          meta: {title: '提现中心', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/fundInfo',
          name: 'mallFundInfo',
          component: resolve => require(['../pages/mall/shops/fundInfo.vue'], resolve),
          meta: {title: '资金信息', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/balance',
          name: 'mallBalance',
          component: resolve => require(['../pages/mall/my/record/balance.vue'], resolve),
          meta: {title: '余额信息', keepAlive: false, isShowSearch: false, isShowHead:true, isShowTab: false}
        },
        {
          path: '/mall/yueList',
          name: 'mallYueList',
          component: resolve => require(['../pages/mall/my/record/yueList.vue'], resolve),
          meta: {title: '余额明细', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/yuePayment',
          name: 'mallYuePayment',
          component: resolve => require(['../pages/mall/my/record/yuePayment.vue'], resolve),
          meta: {title: '余额充值', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/Balancelist',
          name: 'mallBalancelist',
          component: resolve => require(['../pages/mall/my/record/mallBalancelist.vue'], resolve),
          meta: {title: '余额充值', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/yuWithdraw',
          name: 'mallYuWithdraw',
          component: resolve => require(['../pages/mall/my/record/yuWithdraw.vue'], resolve),
          meta: {title: '余额充值', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/withDrawList',
          name: 'mallWithDrawList',
          component: resolve => require(['../pages/mall/my/record/withDrawList.vue'], resolve),
          meta: {title: '余额充值记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myPoints',
          name: 'mallMyPoints',
          component: resolve => require(['../pages/mall/my/record/myPoints.vue'], resolve),
          meta: {title: '积分', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myPointsList',
          name: 'mallMyPointsList',
          component: resolve => require(['../pages/mall/my/record/myPointsList.vue'], resolve),
          meta: {title: '积分', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/commission',
          name: 'mallCommission',
          component: resolve => require(['../pages/mall/my/record/commission.vue'], resolve),
          meta: {title: '我的佣金', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/commissionList',
          name: 'mallCommissionList',
          component: resolve => require(['../pages/mall/my/record/commissionList.vue'], resolve),
          meta: {title: '佣金明细', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/donation',
          name: 'mallDonation',
          component: resolve => require(['../pages/mall/my/record/donation.vue'], resolve),
          meta: {title: '转赠', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/donationList',
          name: 'mallDonationList',
          component: resolve => require(['../pages/mall/my/record/donationList.vue'], resolve),
          meta: {title: '转赠记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/distributor',
          name: 'mallDistributor',
          component: resolve => require(['../pages/mall/my/distributor.vue'], resolve),
          meta: {title: '申请分销商', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/grade',
          name: 'mallGrade',
          component: resolve => require(['../pages/mall/my/grade.vue'], resolve),
          meta: {title: '我的等级', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myTeam',
          name: 'mallMyTeam',
          component: resolve => require(['../pages/mall/my/myTeam.vue'], resolve),
          meta: {title: '我的团队', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/buNew',
          name: 'mallBuyNew',
          component: resolve => require(['../pages/mall/my/buNew.vue'], resolve),
          meta: {title: '转赠记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/checkLogis',
          name: 'mallCheckLogis',
          component: resolve => require(['../pages/mall/my/checkLogis.vue'], resolve),
          meta: {title: '查看物流', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underShop',
          name: 'mallUnderShop',
          component: resolve => require(['../pages/mall/underShop/index'], resolve),
          meta: {title: '线下商家', keepAlive: false, isShowSearch: false, isShowTab: true, isShopShowTab: false}
        },
        {
          path: '/mall/underMy',
          name: 'mallUnderMy',
          component: resolve => require(['../pages/mall/underShop/underMy'], resolve),
          meta: {title: '个人中心', keepAlive: false, isShowSearch: false, isShowHead: true, isShopShowTab: false}
        },
        {
          path: '/mall/secthList',
          name: 'mallSecthList',
          component: resolve => require(['../pages/mall/underShop/secthList'], resolve),
          meta: {title: '搜索列表', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/UnderpayMent',
          name: 'mallUnderpayMent',
          component: resolve => require(['../pages/mall/underShop/UnderpayMent'], resolve),
          meta: {title: '线下支付', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/payUnder',
          name: 'mallPayUnder',
          component: resolve => require(['../pages/mall/underShop/payUnder'], resolve),
          meta: {title: '线下支付', keepAlive: false, isShowSearch: false, isShowTab: false}
        }, {
          path: '/mall/Underdetail',
          name: 'mallUnderdetail',
          component: resolve => require(['../pages/mall/underShop/detail'], resolve),
          meta: {title: '线下详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/rechargeCard',
          name: 'mallRechargeCard',
          component: resolve => require(['../pages/mall/underShop/rechargeCard'], resolve),
          meta: {title: '会员卡充值', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myCoupon',
          name: 'mallMyCoupon',
          component: resolve => require(['../pages/mall/underShop/myCoupon'], resolve),
          meta: {title: '我的优惠券', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myClub',
          name: 'mallMyClub',
          component: resolve => require(['../pages/mall/underShop/myClub'], resolve),
          meta: {title: '我的会员卡', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/hykCenter',
          name: 'mallHykCenter',
          component: resolve => require(['../pages/mall/underShop/hykCenter'], resolve),
          meta: {title: '会员卡中心', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/expenseList',
          name: 'mallExpenseList',
          component: resolve => require(['../pages/mall/underShop/expenseList'], resolve),
          meta: {title: '我的消费记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/cardPayment',
          name: 'mallCardPayment',
          component: resolve => require(['../pages/mall/underShop/cardPayment'], resolve),
          meta: {title: '会员卡充值', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/rechargeList',
          name: 'mallRechargeList',
          component: resolve => require(['../pages/mall/underShop/rechargeList'], resolve),
          meta: {title: '会员卡充值记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/drawYhj',
          name: 'mallDrawYhj',
          component: resolve => require(['../pages/mall/underShop/drawYhj'], resolve),
          meta: {title: '会员卡充值记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/exploitShop',
          name: 'mallExploitShop',
          component: resolve => require(['../pages/mall/underShop/exploitShop'], resolve),
          meta: {title: '拓店者', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/myCity',
          name: 'mallMyCity',
          component: resolve => require(['../pages/mall/underShop/myCity'], resolve),
          meta: {title: '我的区域', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/transactions',
          name: 'mallTransactions',
          component: resolve => require(['../pages/mall/underShop/transactions'], resolve),
          meta: {title: '店面交易额', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/vipOrderList',
          name: 'mallVipOrderList',
          component: resolve => require(['../pages/mall/underShop/vipOrderList'], resolve),
          meta: {title: '直属会员订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/offOrderDetails',
          name: 'mallOffOrderDetails',
          component: resolve => require(['../pages/mall/shops/offOrderDetails'], resolve),
          meta: {title: '线下订单详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/vipRechargeList',
          name: 'mallVipRechargeList',
          component: resolve => require(['../pages/mall/shops/vipRechargeList'], resolve),
          meta: {title: '会员卡充值记录', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underOrderList',
          name: 'mallUnderOrderList',
          component: resolve => require(['../pages/mall/underShop/underOrderList'], resolve),
          meta: {title: '我的线下订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underOrderDetails',
          name: 'mallUnderOrderDetails',
          component: resolve => require(['../pages/mall/underShop/underOrderDetails'], resolve),
          meta: {title: '我的线下订单详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/shopQrcode',
          name: 'mallShopQrcode',
          component: resolve => require(['../pages/mall/shops/shopQrcode'], resolve),
          meta: {title: '商家二维码', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underCancel',
          name: 'mallUnderCancel',
          component: resolve => require(['../pages/mall/underShop/underCancel'], resolve),
          meta: {title: '商家核销', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underGoodsDetails',
          name: 'mallUnderGoodsDetails',
          component: resolve => require(['../pages/mall/underShop/underGoodsDetails'], resolve),
          meta: {title: '线下商家商品详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underGoodsBuy',
          name: 'mallUnderGoodsBuy',
          component: resolve => require(['../pages/mall/underShop/underGoodsBuy'], resolve),
          meta: {title: '线下商家商品下单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/imageText',
          name: 'mallImageText',
          component: resolve => require(['../pages/mall/underShop/imageText'], resolve),
          meta: {title: '线下商家商品图文详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underGoodsList',
          name: 'mallUnderGoodsList',
          component: resolve => require(['../pages/mall/underShop/underGoodsList'], resolve),
          meta: {title: '线下商品订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underShopInfo',
          name: 'mallUnderShopInfo',
          component: resolve => require(['../pages/mall/underShop/underShopInfo'], resolve),
          meta: {title: '线下商家详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/under_order',
          name: 'mallUnder_order',
          component: resolve => require(['../pages/mall/underShop/under_order'], resolve),
          meta: {title: '线下商品订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/under_exchange',
          name: 'mallUnder_exchange',
          component: resolve => require(['../pages/mall/underShop/under_exchange'], resolve),
          meta: {title: '线下商品退款', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/off_order',
          name: 'mallOffGoodsOrders',
          component: resolve => require(['../pages/mall/shops/off_order'], resolve),
          meta: {title: '线下商品订单', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/off_order_detail',
          name: 'mallOff_order_detail',
          component: resolve => require(['../pages/mall/shops/off_order_detail'], resolve),
          meta: {title: '线下商品订单详情', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/pointsYue',
          name: 'mallPointsYue',
          component: resolve => require(['../pages/mall/my/record/pointsYue'], resolve),
          meta: {title: '积分转余额', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/pointsYueList',
          name: 'mallPointsYueList',
          component: resolve => require(['../pages/mall/my/record/pointsYueList'], resolve),
          meta: {title: '积分转余额', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underAddress',
          name: 'mallUnderAddress',
          component: resolve => require(['../pages/mall/underShop/underAddress.vue'], resolve),
          meta: {title: '商家地址', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/mall/underAppraise',
          name: 'mallUnderAppraise',
          component: resolve => require(['../pages/mall/underShop/underAppraise.vue'], resolve),
          meta: {title: '线下商品评价', keepAlive: false, isShowSearch: false, isShowTab: false}
        },{
          path: '/packet',
          name: 'packet',
          component: resolve => require(['../pages/packet/index.vue'], resolve),
          meta: {title: 'U券红包', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/redList',
          name: 'redList',
          component: resolve => require(['../pages/packet/redList.vue'], resolve),
          meta: {title: '红包记录', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true}
        },
        {
          path: '/redRule',
          name: 'redRule',
          component: resolve => require(['../pages/packet/redRule.vue'], resolve),
          meta: {title: '活动规则', keepAlive: false, isShowSearch: false, isShowTab: false, isShowHead: true}
        },
        {
          path: '/single',
          name: 'single',
          component: resolve => require(['../pages/single/index.vue'], resolve),
          meta: {title: '免单福利', keepAlive: false, isShowSearch: false, isShowTab: false}
        },
        {
          path: '/welfare',
          name: 'welfare',
          component: resolve => require(['../pages/single/welfare.vue'], resolve),
          meta: {title: '我的福利', keepAlive: false, isShowSearch: false, isShowTab: false,isShowHead: true}
        },
        {
          path: '/singleWeal',
          name: 'singleWeal',
          component: resolve => require(['../pages/single/singleWeal.vue'], resolve),
          meta: {title: '免单福利', keepAlive: false, isShowSearch: false, isShowTab: false,isShowHead: true}
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

const whiteList = ['login', 'about', 'register', 'newIndex', 'forget', 'mobileLogin', 'wechatLogin', 'guide', 'wxbind', 'home', 'sort', 'super', 'my', 'my1', 'my2', 'my3', 'materials', 'materials2', 'supergoods', 'supergoods2', 'search', 'results', 'list', 'fastrob', 'personSpeak', 'personArticle', 'discounts', 'circle', 'otherclassify', 'classify', 'liveBroadcast', 'dayingList', 'daying', 'comment', 'mallHome', 'mallHomeDetail', 'mallBusiness', 'mallSeller', 'mallUnderShop', 'mallUnderdetail', 'mallProductList', 'mallShopProductList', 'mallCategory', 'mallSecthList', 'mallNews', 'mallSearch', 'mallArticleList', 'mallArticleInfo', 'select']
router.beforeEach(function (to, from, next) {


  var firstPage = ['/home', '/newIndex', '/materials', '/my', '/newIndex'];
  var currentRoute = to.path;
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false;
  } else {
    window.canRightSlipBack = true;
  }
  // 登录拦截
  store.commit('hide')
  // if (!utils.storage.get('Uquanyun')) {
  //   utils.storage.set('Uquanyun', 'gone')
  //   next({
  //     path: '/guide'
  //   })
  // } else
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/wechatLogin'
    })
  } else {
    next()
  }
})

export default router
