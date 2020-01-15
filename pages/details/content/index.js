import * as echarts from '../../../ec-canvas/echarts';
var network = require('../../../utils/network.js');
const app = getApp();

function getOption(arrays) {
  var option = {
    backgroundColor: "#e6e4db",
    color: ['#7cb5ec', '#ce7bff', '#f7a35c', '#f15c80', '#8085e9', '#e2cb61', '#ccccff', '#b9e95a', '#68e4a3'],
    legend: {
      show: true,
      orient: 'vertical',
      textStyle: { //图例文字的样式
        color: '#838484',
        fontSize: 10
      },
      top: 'center',
      right: 0,
    },
    series: [{
      label: {
        normal: {
          fontSize: 10,
          formatter: '{c}' + '人'
        }
      },
      type: 'pie',
      center: ['40%', '55%'],
      radius: [0, '60%'],
      data: arrays,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  return option;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    welfareName: "",
    welfareCentreId: "",
    yzName: "",
    zbCount: 0,
    hgzz: "",
    kyTotal: 0,
    bedTotal: 0,
    customerTotal: 0,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.reLaunch({
      url: '../details/activity/index'
    });
    var userInfo = wx.getStorageSync("userInfo");
    // console.log(userInfo);
    if (userInfo == null || userInfo == "") {
      wx.reLaunch({
        url: '../login/index',
        success: function () {
          wx.removeStorage({
            key: 'userInfo'
          })
          app.globalData.welfareCentreId = "";
        }
      })
    } else {
      app.globalData.welfareCentreId = userInfo.dataList[0].welfareCentreId;
      this.setData({
        array: userInfo.dataList,
        index: 0,
        welfareName: userInfo.dataList[0].welfareCentreName,
        welfareCentreId: userInfo.dataList[0].welfareCentreId,
      })
      this.getPieData();
      this.getInfoData();
    }
  },

  getPieData: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getIndexJyrLxInfo', {
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        var responseList = res.Data == null ? new Array() : res.Data;
        //console.log(JSON.stringify(responseList))
        var arrays = [];
        for (var i = 0; i < responseList.length; i++) {
          var model = responseList[i];
          arrays.push({
            value: model.JyrLxNum,
            name: model.JyrLxName
          })
        }

        that.initCharts(arrays);

        // setTimeout(function() {
        //   chart.setOption({
        //     series: [{
        //       data: arrays,
        //     }]
        //   });
        // }, 10)

      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  //初始化图表
  initCharts: function (arrays) {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      //canvas.setChart(chart);
      chart.showLoading(); // 首次显示加载动画
      chart.setOption(getOption(arrays));
      chart.hideLoading(); // 隐藏加载动画

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  getInfoData: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getIndexYlyInfo', {
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        var model = res.Entity;
        that.setData({
          yzName: model.YlyYzName,
          zbCount: model.YlyZbHgNumber,
          hgzz: model.YlyZbHgZzName,
          kyTotal: model.YlyKyCwNumber,
          bedTotal: model.YlyCwZsNumber,
          customerTotal: model.YlyLrZsNumber,
        })

      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      wx.stopPullDownRefresh() //停止下拉刷新
      //验证登录是否过期
      //that.verifyLogined();
    }, 1500);
  },

  bindChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    app.globalData.welfareCentreId = this.data.array[e.detail.value].welfareCentreId;
    this.setData({
      index: e.detail.value,
      welfareCentreId: this.data.array[e.detail.value].welfareCentreId,
      welfareName: this.data.array[e.detail.value].welfareCentreName
    })

    this.getPieData();
    this.getInfoData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '测试',
      path: 'pages/index/index'
    }
  }

})