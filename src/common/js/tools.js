const key = '8712d3c976418dafcb78905e3a3ee53e'

function showToast (name) {
  wx.showToast({
    title: name,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

function showLongToast (name) {
  wx.showToast({
    title: name,
    icon: 'none',
    duration: 3000,
    mask: true
  })
}

function getTimer (target) {
  let nowDate = new Date().getTime()
  let targetDate = new Date(target).getTime()
  let diff = nowDate - targetDate
  let day = parseInt(diff / (1000 * 60 * 60 * 24))
  let hour = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minute = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60))
  let second = parseInt((diff % (1000 * 60)) / 1000)
  return [day, hour, minute, second]
}

function formatDate (date) {
  const now = new Date(date)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hh = now.getHours()
  const mm = now.getMinutes()
  const ss = now.getSeconds()
  let clock = year + '-'
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  clock += day + ' '
  if (hh < 10) {
    clock += '0'
  }
  clock += hh + ':'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + ':'
  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  return clock
}

function formatDay (date) {
  const now = new Date(date)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  let clock = year + '-'
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  clock += day
  return clock
}

function formatTime (date) {
  const now = new Date(date)
  const hh = now.getHours()
  const mm = now.getMinutes()
  const ss = now.getSeconds()
  let clock = hh + ':'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + ':'
  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  return clock
}

export default {
  key,
  showToast,
  showLongToast,
  getTimer,
  formatDate,
  formatDay,
  formatTime
}
