<template>
    <div class="Refund_main">
      <div class="header">
        <x-header
          slot="header"
          :left-options="{showBack: false}"
        >
          <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
          退款详情
        </x-header>
      </div>
      <div class="content">
        <div class="content_status">
            <div class="Refund_time">
              <p>请等待商家处理</p>
              <p>还剩1天22时19分</p>
            </div>
        </div>
        <div class="Refund_new">
          <div class="header">您已成功发起退款申请，请耐心等待商家处理</div>
          <div class="content_new">
            <div class="list">
              <div class="icon">
                <span></span>
              </div>
              <div class="text">
                商家同意或者超时未处理，系统将退款给您 拷贝
              </div>
            </div>
            <div class="list">
              <div class="icon">
                <span></span>
              </div>
              <div class="text">
                如果商家拒绝，您可以修改退款申请后再次发起，商家会 重新处理
              </div>
            </div>
            <div class="btns" @click="jumpTo('/exchange')">
              <div class="btn">
                修改申请
              </div>
            </div>
          </div>
        </div>
        <div class="Refund_shop">
            <div class="shop_title">退款信息</div>
            <div class="mail">
              <div class="left">
                <img src="../../../assets/mall/img/home/detail/detail3.png" alt="">
              </div>
              <div class="right">
                <div class="div1">
                  秋季新款收腰夹克风衣外套秋季新款收腰夹 克风衣外套
                </div>
                <div class="div2">
                  <div>
                    <span>白的</span>
                    <span>均码</span>
                  </div>
                  <div>
                    ×1
                  </div>
                </div>
                <div class="div3">
                  <div class="price_main"><span>¥</span>109.00</div>
                </div>
              </div>
            </div>
            <div class="order_new">
              <div class="li_list">退款原因: 其他</div>
              <div class="li_list">退款金额: ¥109.00</div>
              <div class="li_list">申请时间: 2018-09-09 18:06:06</div>
              <div class="li_list">退款编号：21548756596898569</div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Refund_detail'
}
</script>

<style scoped>

</style>
