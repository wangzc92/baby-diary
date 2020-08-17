const cloud = require('wx-server-sdk')
cloud.init({
  env: 'release-7aspz'
})
const db = cloud.database()
const MAX_LIMIT = 100
const _ = db.command
exports.main = async (event, context) => {
  let params = {}
  if (event.type === 'oneMonth') {
    let min = new Date(`${event.year}-${event.month}`).getTime()
    let max
    if (event.month == 12) {
      max = new Date(`${event.year + 1}-01`).getTime()
    } else {
      max = new Date(`${event.year}-${event.month + 1}`).getTime()
    }
    params = {
      date: _.and(_.gt(min), _.lt(max))
    }
  } else {
    params = {
      star: _.eq(event.star)
    }
  }
  // 先取出集合记录总数
  const countResult = await db.collection('diary').where(params).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('diary').where(params).skip(i * MAX_LIMIT).limit(MAX_LIMIT).orderBy('date', 'desc').get()
    tasks.push(promise)
  }
  // 等待所有
  if (tasks.length == 0) {
    return {
      data: [],
      errMsg: '暂无数据'
    }
  } else {
    return (await Promise.all(tasks)).reduce((acc, cur) => ({
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg
    }))
  }
}
