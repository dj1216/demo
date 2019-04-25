// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

// 分类
const getSortLinst = function () {
  let code = []
  let data = []
  let msg = []
  code = 0
  data = {
    'sortLeft': [
      '食品',
      '饰品'
    ],
    'sortRight': [{
      title: '食品',
      list: [{
        url: Random.dataImage('300x250', 'mock的图片'),
        content: '休闲零食'
      }]
    },
    {
      title: '饰品',
      list: [{
        url: Random.dataImage('300x250', 'mock的图片'),
        content: '休闲零食'
      }]
    }]
  }
  msg = '信息返回成功'
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// Mock.mock( url, post/get , 返回的数据)
Mock.mock('/api/m1/index', 'post', produceNewsData)
Mock.mock('/api/m1/sortLinst', 'get', getSortLinst)
