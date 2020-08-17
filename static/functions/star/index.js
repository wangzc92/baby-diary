const cloud = require('wx-server-sdk')
cloud.init({
  env: 'release-7aspz'
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('diary').doc(event.id).update({
      data: {
        star: event.star
      }
    })
  } catch (e) {
    console.error(e)
  }
}
