/**
 * Get请求
 * loading:是否显示加载框
 * url:请求url
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function requestGet(loading, url, params, success, fail) {
  request(loading, url, "Get", params, success, fail);
}
/**
 * POST请求
 * loading:是否显示加载框
 * url:请求url
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function requestPost(loading, url, params, success, fail) {
  request(loading, url, "POST", params, success, fail);
}
/**
 * WebPOST请求
 * loading:是否显示加载框
 * url:请求url
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function requestWebPost(loading, url, params, success, fail) {
  console.log(url);
  requestApiToken(loading, url, "POST", params, success, fail);
}
/**
 * loading:是否显示加载框
 * url:请求url
 * method:请求方式
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function request(loading, url, method, params, success, fail) {
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: function (res) {
      if (res.statusCode == 200) {
        switch (res.data.ErrorType) {
          case 0://错误
            fail(res.data.MessageContent);
            break;
          case 1: //返回正确数据
            success(res.data);
            break;
        }
      } else {
        fail("数据加载失败");
      }
    },
    fail: function (res) {
      fail("数据加载失败");
    },
    complete: function (res) {
      if (loading) {
        wx.hideLoading();
      }
    },
  })
}


/**
 * loading:是否显示加载框
 * url:请求url
 * method:请求方式
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function requestApi(loading, url, method, params, success, fail) {
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }
  wx.request({
    url: url,
    data: {
      name: "shenyu",
      password: "e10adc3949ba59abbe56e057f20f883e"
    },
    header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + params.token
    },
    method: 'Get',
    success: function (res) {
      var st = res.data.result;
      console.log("请求状态：" + res.statusCode);
      console.log("请求状态：" + st[0].sn);
      if (res.statusCode == 200) {
        success(res.data);
      } else {
        fail("数据加载失败");
      }
    },
    fail: function (res) {
      fail("数据加载失败");
    },
    complete: function (res) {
      if (loading) {
        wx.hideLoading();
      }
    },
  })
}/**
 * loading:是否显示加载框
 * url:请求url
 * method:请求方式
 * params:请求参数
 * success:请求成功回调
 * fail:请求失败回调
 */
function requestApiToken(loading, url, method, params, success, fail) {
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }
  wx.request({
    url: url,
    data: {
      name: "hpqlngy001",
      password: "e10adc3949ba59abbe56e057f20f883e"
      },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      console.log("请求状态：" + res.statusCode);
      console.log("请求状态：" + res.data.token);
      if (res.statusCode == 200) {
        switch (res.data.ErrorType) {
          case 0://错误
            fail(res.data.MessageContent);
            break;
          case 1: //返回正确数据
            success(res.data);
            break;
        }
      } else {
        fail("数据加载失败");
      }
    },
    fail: function (res) {
      console.log("请求状态1");
      fail("数据加载失败");
    },
    complete: function (res) {
      if (loading) {
        wx.hideLoading();
      }
    },
  })
}


module.exports = {
  requestGet: requestGet,
  requestPost: requestPost,
  requestWebPost: requestWebPost
}