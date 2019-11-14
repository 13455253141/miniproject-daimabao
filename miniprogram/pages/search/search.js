// pages/search/search.js
let timeId = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showKeywords: false,
    showResult: false,
    value: '',
    projectList: [],

  },
  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },
  searchInput(e) {
    if (!e.detail.value) {
      this.setData({
        showKeywords: false
      })
    } else {
      if (!this.data.showKeywords) {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
          //开始模糊查询项目
          wx.cloud.callFunction({
            name: 'fuzzysearch',
            data: {
              projectname: e.detail.value
            }
          }).then(res => {
            console.log(res);
            this.setData({
              projectList: res.result.data,
              showResult: true,
              showKeywords: true
            });
          }).catch(err => {
            console.error(err);
          });
        }, 1000)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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