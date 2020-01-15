// pages/Login/index.js
var md5 = require('../../utils/md5.js');
var network = require('../../utils/network.js');
// var hot = require('../../hotapp/hotapp.js');

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  login: function(e) {
    
    var baseUrl = app.globalData.baseUrl + '/sessions';
    // var utl = 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp712367163&url=' + baseUrl;
    console.log(baseUrl);

    

//正常
    network.requestWebPost(
      true,
      baseUrl,
      { },
      function (res) {
        // var model = res.Entity;
        wx.setStorageSync('userInfo', res);
        wx.switchTab({
          url: '../details/content/index'
        })

      },
      function (msg) {
        console.log(msg);
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });




    // var name = e.detail.value.username;
    // var password = e.detail.value.password;

    // // console.log(app.globalData.baseUrl + '/YzMobile/Login');
    // if (name == "") {
    //   wx.showToast({
    //     title: '用户名不能为空',
    //     icon: "none"
    //   })
    //   return;
    // }
    // if (password == "") {
    //   wx.showToast({
    //     title: '密码不能为空',
    //     icon: "none"
    //   })
    //   return;
    // }


  //  var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7Imd1YXJkaWFuSWQiOiI1Y2E1NzIzMWRiMGEzZWQ3ZTE5MTViNmIifSwiZXhwIjoxNTczNjI4NDc2fQ.2bHupnJoPG7sBwTHpIl8BIUjjqZxYgzwzG-1ttn_cv4";

  //   network.requestWebPost(
  //     true,
  //     app.globalData.baseUrl + '/guardians/5ca57231db0a3ed7e1915b6b/users/5d118b7c47ca8e0001e7ebed/histories/2019-11-6',
  //     { token: token},
  //     function(res) {
  //       var model = res.Entity;
  //       wx.setStorageSync('userInfo', res);
  //       wx.switchTab({
  //         url: '../details/content/index'
  //       })

  //     },
  //     function (msg) {
  //       console.log(msg);
  //       wx.showToast({
  //         title: msg,
  //         icon: 'none',
  //       })
  //     });

// //正常
//     network.requestWebPost(
//       true,
//       app.globalData.baseUrl + '/sessions',
//       { },
//       function (res) {
//         // var model = res.Entity;
//         wx.setStorageSync('userInfo', res);
//         wx.switchTab({
//           url: '../details/content/index'
//         })

//       },
//       function (msg) {
//         console.log(msg);
//         wx.showToast({
//           title: msg,
//           icon: 'none',
//         })
//       });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})