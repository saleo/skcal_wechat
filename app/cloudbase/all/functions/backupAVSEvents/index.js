// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var res;
  const db = cloud.database()
  const avsTable=db.collection('anniversary')
  const _ = db.command
  

  try {
    res=await avsTable.where({
      _id: _.exists(true)
    }).remove()

    res=await avsTable.add({
      data: {
        avsEvents: event.avsEvents
      }
    })
  } catch(e) {
    console.error('backupAVSEvents failed,error=',e)
  }

  return {
    res,

  }
}