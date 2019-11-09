// pages/test/test.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectList: [{
      projectname: "二手房交易管理系统",
      indeximage: '',
      price: 200,
      updatetime: new Date(),
      projectrequirement: '1、系统分为买方、卖方和中介；2、支持选房，发布房源，签订合同。',
      development: 'eclipse+jdk1.7+mysql+ssm+jsp+tomcat7',
      saleservice: '有问题联系系统管理员+QQ：731628720；该商品不支持退货',
      categoryid: '',
      categoryname: ''

    }, {
        projectname: "选课管理系统",
        indeximage: '',
        price: 200,
        updatetime: new Date(),
        projectrequirement: '1、系统分为学生、老师和管理员；2、支持选课，导出数据，查看成绩。',
        development: 'eclipse+jdk1.7+mysql+ssm+jsp+tomcat7',
        saleservice: '有问题联系系统管理员+QQ：731628720；该商品不支持退货',
        categoryid: '',
        categoryname: ''

      }, {
        projectname: "五子棋游戏",
        indeximage: '',
        price: 200,
        updatetime: new Date(),
        projectrequirement: '1、游戏只支持人机游戏；2、支持悔棋，重新开始游戏等。',
        development: 'eclipse+jdk1.7+mysql+ssm+jsp+tomcat7',
        saleservice: '有问题联系系统管理员+QQ：731628720；该商品不支持退货',
        categoryid: '',
        categoryname: ''

      }],
    images: [],
    fileIds: [],
    
    
  },
  insert: function () {
    for (let i = 0; i < this.data.projectList.length; i++) {
      let project = this.data.projectList[i];
      db.collection('fabulous').add({
       
        data: {
          projectname: project.projectname,
          indeximage: project.indeximage,
          price: project.price,
          updatetime: project.updatetime,
          projectrequirement: project.projectrequirement,
          development: project.development,
          saleservice: project.saleservice,
          categoryid: project.categoryid,
          categoryname: project.categoryname
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
    }
    
  },
  select: function () {
    // db.collection('project').where({
    //   '_id': 'dc0430be5dadae5c01723eee3018abc2'
    // }).get().then(res => {
    //   console.log(res);
    //   this.setData({
    //     projectList: res.data
    //   });
    // }).catch (err => {
    //   console.error(err);
    // })

    // db.collection('project').where({
    //   '_openid': 'oRTgw5U8LMZ29_C7WuD4Cge6Vuvs'
    // }).get().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.error(err)
    // })

    wx.cloud.callFunction({
      name: 'projectlist',
      data: {
        // start: this.data.movieList.length,
        // count: 10
      }
    }).then(res => {
      console.log(res);
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      });
      // wx.hideLoading();
    }).catch(err => {
      console.error(err);
      // wx.hideLoading();
    });
  },
  upload: function () {
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'test1.jpg',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
        }).then (res => {
          console.log('上传成功', res)
        }).catch (err => {
          console.error(err)
        }) 
      },
    })
  },
  showImage: function () {
    db.collection('images').where({
      '_id': 'dd6b78cb-60c9-4d90-b798-9b3ab1f1cae6'
    }).get().then(res => {
      console.log(res)
      this.setData({
        images: res.data
      })
    }).catch(err => {
      console.error(err)
    }) 
  },
  uploadImg: function () {
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  batchUploadImg: function () {
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        });
        //循环多次上传图片
        this.batchShowImg();
      }
    })
    
  },
  batchShowImg: function () {
    // 上传图片到云存储
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; // 正则表达式，返回文件扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            });
            reslove();
          },
          fail: console.error
        })
      }));
    }

    Promise.all(promiseArr).then(res => {
      // 插入数据
      db.collection('project').add({
        data: {
          content: ' this.data.content',
          score: 'this.data.score',
          movieid: 'this.data.movieId',
          fileIds: this.data.fileIds
        }
      }).then(res => {

        wx.showToast({
          title: '评价成功',
        })
      }).catch(err => {

        wx.showToast({
          title: '评价失败',
        })
      })

    });
  },
  update: function () {
    db.collection('project').doc('dc0430be5dadae5c01723eee3018abc2').update({
      data: {
        imageUrl: '	cloud://daimabao-2wwwl.6461-daimabao-2wwwl-1300489374/test1.jpg'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
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