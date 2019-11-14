// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 3000,
    duration: 800,
    curIndex: 0,
    project: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //调用云函数，根据项目id获取项目明细
    wx.cloud.callFunction({
      name: 'project',
      data: {
        projectid: options.projectid
      }
    }).then(res => {
      console.log(res);
      if (res.result.data.length > 0) {
        this.setData({
          project: res.result.data[0]
        });
      }
      // wx.hideLoading();
    }).catch(err => {
      console.error(err);
      // wx.hideLoading();
    });
  },
  previewImg: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})