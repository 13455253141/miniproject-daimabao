// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('project').where({
      '_openid': 'oRTgw5U8LMZ29_C7WuD4Cge6Vuvs'
    }).get()
  }catch (e) {
    console.error(e);
  }
  
}