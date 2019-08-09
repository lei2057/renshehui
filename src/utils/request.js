import conver from './conver.js'
// const host = 'http://192.168.10.69/'
const host = 'https://wmqhouse.top/'

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: conver(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

// get方法
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

// post方法
function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post,
  host
}
