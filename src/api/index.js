import http from './http'
let mall = '/mall'
// let bizId = 1
// let biz = {biz_id: bizId}

export const login = function () {
  return http.get('/amoy/auth/login')
}
// 微信授权登录
export const postWechatLogin = function (type, token, mobile, inviteCode, password, rePassword) {
  return http.post('/amoy/auth/we-login', {type: type, access_token: token, mobile: mobile, invite_code: inviteCode, password: password, re_password: rePassword}, true)
}
// 获取验证码
export const postSmsCode = function (mobile) {
  return http.post('/amoy/auth/sms-verifycode', {mobile: mobile})
}

export const forget = function () {
  return http.get('/api/mi')
}

export const ceshi = function () {
  return http.post('/m1/index')
}
// 登录接口
export const imgcode = function () {
  return ''
}
// 首页
export const indexHome = function () {
  return http.post(mall + '/index/display')
}
// 商品列表
export const indexList = function (page) {
  return http.post(mall + '/index/goods-list', {page})
}
// 商品列表--订单详情
export const indexListSpid = function (spid, page) {
  return http.post(mall + '/index/goods-list', {spid, page})
}
// 商品列表
export const goodsDetail = function (goodsId) {
  return http.post(mall + '/index/goods-detail', {goodsId}, true)
}

// 商品收藏
export const goodsLike = function (goodsId) {
  return http.post(mall + '/users/goods-like', {goodsId})
}
// 商家收藏
export const shopsCare = function (spid) {
  return http.post('/mall/users/shops-care', {spid})
}
// 商品评论
export const goodsDiscuss = function (page, goodsId) {
  return http.post(mall + '/index/goods-discuss', {page, goodsId}, true)
}

// 商家收藏
export const goodLickList = function () {
  return http.post(mall + '/users/goods-like-list')
}
// 搜索列表
export const search = function (type) {
  return http.post(mall + '/index/search', {type: type}, true)
}
// 搜索列表
export const searchDelete = function () {
  return http.post(mall + '/users/search-delete')
}
// 地址列表
export const addressList = function () {
  return http.post(mall + '/users/address-list')
}
// 地址设为默认
export const addressDefault = function (id) {
  return http.post(mall + '/users/address-default', {id})
}
// 地址删除
export const addressDelete = function (id) {
  return http.post(mall + '/users/address-delete', {id})
}
// 地址添加
export const addAdress = function (username, mobile, province, city, district, address, isdefault, type) {
  return http.post(mall + '/users/address-post', {username, mobile, province, city, district, address, isdefault, type})
}
// 地址修改
export const updateAdress = function (username, mobile, province, city, district, address, isdefault, type, id) {
  return http.post(mall + '/users/address-post', {username, mobile, province, city, district, address, isdefault, type, id})
}
// 商家中心
export const shopInfo = function (spid) {
  return http.post(mall + '/shops/shop-info', {spid}, true)
}
// 商家商品
export const shopList = function (spid) {
  return http.post(mall + '/index/goods-list', {spid})
  // this.$http.post('/index/goods-list', {spid: this.shopId,  isRecommend: 1}).then(res => {
  //   if (res.code === 0) {
  //     this.list = res.data.list
  //     console.log(this.list)
  //   }
  // })
}
// 商家搜索
// 删除收藏
export const goodsLikeDelete = function (likeIds) {
  return http.post(mall + '/users/goods-like-delete', {likeIds})
}
// 商品足记类表
export const goodsClick = function (page) {
  return http.post(mall + '/users/goods-click', {page}, true)
}
// 商品足记类表
export const goodsClickDelete = function (clickId) {
  return http.post(mall + '/users/goods-click-delete', {clickId})
}

// 文章列表
export const articleList = function (page) {
  return http.post(mall + '/index/article-list', {page}, true)
}
// 文章详情
export const articleDetail = function (id) {
  return http.post(mall + '/index/article-detail', {id})
}
// 生成订单
export const cardInterim = function (goodsId, goodsNum, attrId, color, size) {
  return http.post(mall + '/cart/interim', {goodsId, goodsNum, attrId, color, size}, true)
}
// 查询订单
export const cardCheckout = function (type, goodsInfo) {
  return http.post(mall + '/cart/checkout', {type, goodsInfo}, true)
}
// 添加购物车
export const addCard = function (type, goodsId, goodsNum, attrId, color, size) {
  return http.post(mall + '/cart/add', {type, goodsId, goodsNum, attrId, color, size})
}
// 创建订单
export const orderCreate = function (goodsInfo, note) {
  return http.post(mall + '/order/create', {goodsInfo: goodsInfo, note: note}, true)
}
// 订单记录
export const orderList = function (page, status) {
  return http.post(mall + '/order/list', {page, status})
}

// 删除订单
export const orderDelete = function (orderSn) {
  return http.post(mall + '/order/delete', {orderSn}, true)
}
// 取消订单
export const orderRemove = function (orderSn) {
  return http.post(mall + '/order/remove', {orderSn}, true)
}
// 商品分类
export const indexCategory = function (spid) {
  return http.post(mall + '/index/category', {spid}, true)
}
// 商品切换
export const categoryList = function (pid) {
  return http.post(mall + '/index/category-list', {pid}, true)
}
// 商品切换
export const categoryListS = function (spid) {
  return http.post(mall + '/index/category-list', {spid}, true)
}
// 订单详情
export const orderDetaiil = function (orderSn) {
  return http.post(mall + '/order/detail', {orderSn}, true)
}

// 支付信息
export const paymentDisplay = function (orderId) {
  return http.post(mall + '/payment/display', {orderId}, true)
}
// 支付信息
export const paymentPayType = function (orderId, payType) {
  return http.post(mall + '/payment/display', {orderId, payType}, true)
}
// 退货
export const returnInfo = function (orderSn, model) {
  return http.post(mall + '/order/return-info', {orderSn, model}, true)
}
// 物流信息
export const logisticsInfo = function (orderSn) {
  return http.post(mall + '/order/express-info', {orderSn})
}
// 提交退货申请
export const submitInfo = function (type, model, orderSn, goodsInfo, price, priceStatus, goodsList, thumbs, express, expressNo) {
  return http.post(mall + '/order/return-info', { type, model, orderSn, goodsInfo, price, priceStatus, goodsList, thumbs, express, expressNo }, true)
}
// 商家申请获取信息
export const applyShop = function () {
  return http.post(mall + '/users/shops-applyfor', {}, true)
}
// 商家申请获取商家分类
export const applyShopFei = function (model) {
  return http.post(mall + '/users/shops-applyfor', {model}, true)
}
// 商家申请提交信息
export const applyConfirm = function (type, title, cid, model, username, idNumber, mobile, province, city, district, address, logo, map) {
  return http.post(mall + '/users/shops-applyfor', {type, title, cid, model, username, idNumber, mobile, province, city, district, address, logo, map}, true)
}
// 个人中心信息返回
export const personInfo = function () {
  return http.post(mall + '/users/display', {}, true)
}
// 个人中心信息返回
export const attrList = function (attrId) {
  return http.post(mall + '/index/attr-list', {attrId}, true)
}
// 上传图片
export const usersUpload = function (thumb) {
  return http.post(mall + '/users/upload', {thumb})
}
// 商家中心信息返回
export const shopCenterInfo = function () {
  return http.post(mall + '/sadmin/display', {}, true)
}
// 线上订单记录
export const onOrderList = function (page) {
  return http.post(mall + '/sadmin/bbc-order', {page: page})
}
// 线上订单详情
export const onOrderDetails = function (orderId) {
  return http.post(mall + '/sadmin/bbc-order-detail', {orderId: orderId})
}
// 线上订单详情
export const onOrderDetailsTy = function (orderId, type, bdelete) {
  return http.post(mall + '/sadmin/bbc-order-detail', {orderId: orderId, type: type, bdelete: bdelete})
}
// 线上订单详情--发货
export const onOrderDetails1 = function (type, orderId, data) {
  return http.post(mall + '/sadmin/bbc-order-detail', {type: type, orderId: orderId, expressName: data.expressName, expressNo: data.expressNo})
}
// 资金信息返回
export const fund = function () {
  return http.post(mall + '/sadmin/price', {}, true)
}
// 商家提现
export const withdraw = function () {
  return http.post(mall + '/sadmin/withdraw', {}, true)
}
// 商家提现提交
export const withdrawSub = function (type, data) {
  return http.post(mall + '/sadmin/withdraw', {type: type, username: data.username, mobile: data.mobile, withdrawType: data.withdrawType, alipay: data.alipay, bankName: data.bankName, bankCard: data.bankCard, bankNameNo: data.bankNameNo, price: data.price})
}
// 商家提现记录
export const withdrawList = function (page) {
  return http.post(mall + '/sadmin/withdraw-list', {page: page})
}
// 返回物流信息
export const messageList = function (page) {
  return http.post(mall + '/index/message-list', {page: page})
}
// 余额信息
export const yueInfo = function () {
  return http.post(mall + '/credit/credit2-info', {}, true)
}
// 余额记录
export const yueList = function (page) {
  return http.post(mall + '/credit/credit2', {page: page})
}
// 余额充值信息
export const rechargeInfo = function () {
  return http.post(mall + '/credit/credit-recharge', {}, true)
}
// 余额充值提交
export const rechargeSub = function (type, price) {
  return http.post(mall + '/credit/credit-recharge', {type: type, price: price})
}
// 积分信息
export const jifenInfo = function () {
  return http.post(mall + '/credit/credit1-info', {}, true)
}
// 积分记录
export const jifenList = function (page) {
  return http.post(mall + '/credit/credit1', {page: page})
}
// 积分转余额
export const jifenYue = function () {
  return http.post(mall + '/credit/credit-change', {credittype: 'credit1'}, true)
}
// 积分转余额 -- 记录
export const jifenYueList = function (page) {
  return http.post(mall + '/credit/credit-change-list', {page: page, credittype: 'credit1'})
}
// 积分转余额--提交
export const jifenYueSub = function (type, price) {
  return http.post(mall + '/credit/credit-change', {type: type, price: price, credittype: 'credit1'}, true)
}
// 佣金信息
export const commissionInfo = function () {
  return http.post(mall + '/credit/credit3-info', {},  true)
}
// 佣金记录
export const commissionList = function (page) {
  return http.post(mall + '/credit/credit3', {page: page})
}
// 转赠--默认信息
export const donationInfo = function (credittype) {
  return http.post(mall + '/credit/credit-attorn', {credittype: credittype}, true)
}
// 转赠--搜索
export const donationSearch = function (credittype, type, uid) {
  return http.post(mall + '/credit/credit-attorn', {credittype: credittype, type: type, uid: uid})
}
// 转赠--提交
export const donationSub = function (credittype, type, uid, price) {
  return http.post(mall + '/credit/credit-attorn', {credittype: credittype, type: type, uid: uid, price: price}, true)
}
// 转赠--记录
export const donationList = function (credittype, page) {
  return http.post(mall + '/credit/credit-attorn-list', {credittype: credittype, page: page})
}
// 余额--提现记录
export const yuewithdraw = function (page) {
  return http.post(mall + '/credit/credit-withdraw-list', {page: page})
}
// 余额充值--记录
export const yuerecharge = function (page) {
  return http.post(mall + '/credit/credit-recharge-list', {page: page})
}
// 支付宝提现
export const creditWithdraw = function (type, price, username, mobile, alipay, withdrawType) {
  return http.post(mall + '/credit/credit-withdraw', {type, price, username, mobile, alipay, withdrawType})
}
// 银行卡提现
export const creditCard = function (type, price, username, mobile, bankCard, bankName, bankNameNo, withdrawType) {
  return http.post(mall + '/credit/credit-withdraw', {type, price, username, mobile, bankCard, bankName, bankNameNo, withdrawType})
}
// 银行卡提现
export const creditNew = function () {
  return http.post(mall + '/credit/credit-withdraw', {}, true)
}
// 提交退款资料
export const returnInfoTu = function (type, express, expressNo, orderSn) {
  return http.post(mall + '/order/return-info', {type, express, expressNo, orderSn})
}
// 申请分销商
export const applyDistri = function (type, username, mobile) {
  return http.post(mall + '/agent/applyfor', {type, username, mobile})
}
// 代理中心
export const agentCenter = function () {
  return http.post(mall + '/agent/display', {}, true)
}
// 我的团队
export const myTeam = function (level) {
  return http.post(mall + '/agent/team', {level: level}, true)
}
// 我的团队--下级
export const myTeamLe = function (uid) {
  return http.post(mall + '/agent/team', {uid: uid}, true)
}
// 线下商城--首页
export const underIndex = function () {
  return http.post(mall + '/oto/display', {}, true)
}
// 线下商城--商家详情
export const underShopInfo = function (spid) {
  return http.post(mall + '/oto/shop-info', {spid: spid}, true)
}
// 线下商城--领取会员卡
export const underHyCard = function (spid) {
  return http.post(mall + '/oto/get-card', {spid: spid}, true)
}
// 线下商城--付款订单
export const underPayInfo = function (type, spid, price) {
  return http.post(mall + '/oto/pay', {type: type, spid: spid, price: price}, true)
}
// 线下商城-- 支付
export const underPaymentBe = function (spid) {
  return http.post(mall + '/oto/pay', {spid: spid})
}
// 线下商城--会员卡中心
export const undexCardCenter = function (spid) {
  return http.post(mall + '/oto/card-info' ,{spid: spid}, true)
}
// 线下商城--会员卡充值
export const undexCardFund = function (spid) {
  return http.post(mall + '/oto/card-pay' ,{spid: spid}, true)
}
export const underCardPay = function (spid, type, cardId) {
  return http.post(mall + '/oto/card-pay' ,{spid: spid, type: type, cardId: cardId}, true)
}
export const underCardPayList = function (spid, page) {
  return http.post(mall + '/oto/card-pay-list' ,{spid: spid, page: page}, true)
}
// 线下商城--会员卡交易记录
export const underexpenseList = function (spid, card, type, page) {
  return http.post(mall + '/oto/card-rebate-list', {spid: spid, card: card, types: type, page: page}, true)
}
// 线下商城--会员卡列表
export const underCardList = function (page) {
  return http.post(mall + '/oto/card-list', {page: page}, true)
}
// 线下商城--优惠券列表
export const underCouponList = function (types, page, spid, shopName) {
  return http.post(mall + '/oto/coupon-list', {types: types, page: page, spid: spid, shopName: shopName}, true)
}
// 线下商城-- 支付信息
export const underPaymentPayType = function (orderId, couponTypes, couponId, couponNum, payType) {
  return http.post(mall + '/payment/display', {orderId: orderId, couponTypes: couponTypes, couponId: couponId, couponNum: couponNum, payType: payType}, true)
}
// 线下商城-- 领取优惠券
export const underDrawYhj = function (spid, couponId) {
  return http.post(mall + '/oto/get-coupon', {spid: spid, couponId: couponId}, true)
}
// 线下商城-- 我的区域
export const underMyCity = function (page) {
  return http.post(mall + '/city/list', {page: page}, true)
}
// 线下商城-- 店面交易额
export const underTransact = function (page) {
  return http.post(mall + '/agent/user-type-shop-list', {page: page}, true)
}
// 线下商城-- 直属会员订单
export const underVipOrder = function (page, model) {
  return http.post(mall + '/agent/user-type-order', {page: page, model: model}, true)
}
// 线下商城-- 线下订单
export const underOffOrder = function (page) {
  return http.post(mall + '/sadmin/oto-order', {page: page}, true)
}
// 线下商城-- 线下订单详情
export const underOffOrderDetails = function (orderId) {
  return http.post(mall + '/sadmin/oto-order-detail', {orderId: orderId}, true)
}
// 线下商城-- 会员卡充值订单
export const underCardFund = function (page) {
  return http.post(mall + '/sadmin/card-recharge', {page: page}, true)
}
// 线下商城-- 会员线下订单 商家查看
export const underShopOrder = function (spid, page) {
  return http.post(mall + '/order/oto-order', {spid: spid, page: page}, true)
}
// 线下商城-- 会员线下订单详情 商家查看
export const underShopOrderDetails = function (orderId) {
  return http.post(mall + '/order/oto-order-detail', {orderId: orderId}, true)
}
// 线下商城-- 线下商家二维码
export const underQrcode = function (price) {
  return http.post(mall + '/qrcode/sadmin', {price: price} , true)
}

// 线下商城-- 线下商家二维码扫描成功之后
export const underQrcodeSecc = function (code) {
  return http.post(mall + '/qrcode/qrcode', {code: code} , true)
}
// 线下商城-- 二维码信息
export const underYhjQrcode = function (id) {
  return http.post(mall + '/qrcode/coupon', {id: id} , true)
}

// 线下商城-- 二维码信息扫描成功之后
export const underYhjQrcodeSecc = function (spid, id) {
  return http.post(mall + '/sadmin/coupon-qrcode', {spid: spid, id: id} , true)
}
// 线下商城-- 二维码信息扫描成功之后
export const underYhjQrcodeCon = function (spid, id, type) {
  return http.post(mall + '/sadmin/coupon-qrcode', {spid: spid, id: id, type: type} , true)
}


// 线上商城-- 商品二维码
export const underGoodsQrcodeCon = function (goodsId) {
  return http.post(mall + '/qrcode/goods', {goodsId: goodsId} , true)
}
// 线下商城-- 商家页面二维码
export const underShopQrcodeCon = function (spid) {
  return http.post(mall + '/qrcode/shops', {spid: spid} , true)
}
// 线下商城-- 订单核销码二维码
export const underOrderQrcodeCon = function (orderSn) {
  return http.post(mall + '/qrcode/order', {orderSn: orderSn} , true)
}


// 线下商城-- 商家信息
export const underShopsDetails = function (spid) {
  return http.post(mall + '/oto/info', {spid: spid} , true)
}
// 线下商城-- 商品列表
export const underShopGoodsList = function (spid) {
  return http.post(mall + '/oto/goods-list', {spid: spid} , true)
}
// 线下商城-- 商品详情
export const underShopGoodsDetails = function (goodsId, goodsNum) {
  return http.post(mall + '/oto/goods-detail', {goodsId: goodsId, goodsNum: goodsNum})
}
// 线下商城-- 商品下单
export const underShopGoodBuy = function (model, goodsInfo, note) {
  return http.post(mall + '/order/create', {model: model, goodsInfo: goodsInfo, note: note} , true)
}
// 线下商城-- 商品订单
export const underOrderList = function (page, status) {
  return http.post(mall + '/order/oto-list', {page: page, status: status}, true)
}
// 线下商城-- 商品订单
export const offOrderList = function (page, status) {
  return http.post(mall + '/sadmin/oto-list', {page: page, status: status}, true)
}
