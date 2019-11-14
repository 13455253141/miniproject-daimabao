// pages/advise/advise.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: "",
    min: 5,//最少字数
    max: 300, //最多字数 (根据自己需求改变)
    textContext: "",//意见的内容
    inputValue: "",//联系方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "最低五个字"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数
      textContext: value,//给意见的内容赋值
    });
  },
  /**
   * 联系方式数据绑定
   */
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 提交建议
   */
  commitAdvice: function () {
    console.log(this.data.inputValue);
    db.collection('advice').add({
      data: {
        context: this.data.textContext,
        contact: this.data.inputValue,
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
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