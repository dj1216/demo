import {formatDate} from './data'
export default {
  install (Vue, options) {
    Vue.prototype.jumpLink = function (link) {
      if (link) {
        if (link.type === 0 || link.type === '0') {
          options.router.push(link.url)
        } else if (link.type === 1 || link.type === '1') {
          let browser = api.require('webBrowser')
          browser.open({
            url: link.url,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
        } else if (link.type === 2 || link.type === '2') {
          api.openWin({
            name: 'aliWin',
            url: '../html/main.html',
            reload: true,
            pageParam: {
              url: link.url,
              back: 'home'
            },
            animation: {
              type: 'push',
              subType: 'from_right',
              duration: 300
            },
            bounces: false,
            slidBackEnabled: false,
            allowEdit: true
          })
        }
      }
    }
    Vue.prototype.jumpTo = function (path) {
      options.router.push(path)
    }
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({type: 'cancel', text: '功能即将开放，敬请期待'})
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
    Vue.prototype.jumpTos = function (item) {
      switch (item.types) {
        case 'mallHomeDetail':
          if (item.goodsId !== '0' && item.goodsId) {
            options.router.push({'name': item.types, 'query': {'title': item.goodsId}})
          }
          break
        case 'mallSeller':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallProductList':
          if (item.goodsCid !== '0' && item.goodsCid) {
            options.router.push({'name': item.types, 'query': {'id': item.goodsCid}})
          }
          break
        case 'mallCategory':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'type': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallSecthList':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'shopCid': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallUnderdetail':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallCart':
          options.router.push({name: item.types})
          break
        case 'mallShopProductList':
          options.router.push({name: item.types})
          break
        case 'httpUrl':
          let browser = api.require('webBrowser')
          browser.open({
            url: item.link,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
          break
        default:
          options.router.push(item.types)
      }
    }
  }
}
