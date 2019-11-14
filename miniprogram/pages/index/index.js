var app = getApp()
var httpUrl = app.globalData.httpUrl;
Page({
  data: {
    imgUrls: [
      '/images/banner_01.png',
      '/images/banner_02.png',
      '/images/banner_03.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    fabulous: [],//用来存放精选项目
    projects: [],//用来存放最新的项目
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //初始化时，加载所有的项目
    wx.cloud.callFunction({
      name: 'projectlist',
      data: {
        // start: this.data.movieList.length,
        // count: 10
      }
    }).then(res => {
     
      this.setData({
        fabulous: res.result.data,
        projects: res.result.data
      });
      console.log(this.data.fabulous);
      // wx.hideLoading();
    }).catch(err => {
      console.error(err);
      // wx.hideLoading();
    });
  }
})