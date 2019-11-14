// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    isScroll: false,
    toView: 'java',
    toViewName: 'JAVA',
    categoryList: [],
    details: []

  },
  switchTab(e) {
    wx.cloud.callFunction({
      name: 'categorydetail',
      data: {
        categoryid: e.target.dataset.id
      }
    }).then(res => {
      this.setData({
        isScroll: true,
        toView: e.target.dataset.id,
        toViewName: e.target.dataset.name,
        curIndex: e.target.dataset.index,
        isScroll: false,
        details: res.result.data
      });
      // setTimeout(function () {
      //   this.setData({
      //     toView: e.target.dataset.id,
      //     toViewName: e.target.dataset.name,
      //     curIndex: e.target.dataset.index
      //   })
      // }, 0)
      // setTimeout(function () {
      //   this.setData({
      //     isScroll: false
      //   })
      // }, 1)

    }).catch(err => {
      console.error(err);
    });

    // const self = this;
    // this.setData({
    //   isScroll: true
    // })
    // setTimeout(function () {
    //   self.setData({
    //     toView: e.target.dataset.id,
    //     toViewName: e.target.dataset.name,
    //     curIndex: e.target.dataset.index
    //   })
    // }, 0)
    // setTimeout(function () {
    //   self.setData({
    //     isScroll: false
    //   })
    // }, 1)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据选中的分类目录，查询该分类下的所有的项目
    wx.cloud.callFunction({
      name: 'categorydetail',
      data: {
        categoryid: this.data.toView
      }
    }).then(res => {
      this.setData({
        details: res.result.data
      });
    }).catch(err => {
      console.error(err);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //页面加载之前，获取所有的分类目录
    wx.cloud.callFunction({
      name: 'categorylist',
      data: {
      }
    }).then(res => {

      this.setData({
        categoryList: res.result.data
      });
      // wx.hideLoading();
    }).catch(err => {
      console.error(err);
      // wx.hideLoading();
    });

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