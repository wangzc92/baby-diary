<template lang="pug">
  .count
    .count-text
      img(
        src="http://wangzc.cc/baby-diary/images/text.png"
      )
    .count-box
      .tiles
        .number {{ days }}
        .label Days
      .tiles
        .number {{ hours }}
        .label Hours
      .tiles
        .number {{ mins }}
        .label Mins
      .tiles
        .number {{ secs }}
        .label Secs
</template>

<script>
import tools from 'common/js/tools'
export default {
  name: 'Time',
  components: {
  },
  data () {
    return {
      birthday: '2020-01-01 8:00',
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      timer: null
    }
  },
  computed: {
  },
  onLoad (e) {
  },
  onShow () {
    const that = this
    let newList = tools.getTimer(that.birthday)
    that.change('days', newList[0], 12)
    setTimeout(() => {
      that.change('hours', newList[1], 4)
    }, 400)
    setTimeout(() => {
      that.change('mins', newList[2], 4)
    }, 600)
    setTimeout(() => {
      that.change('secs', newList[3], 4)
    }, 800)
    setTimeout(() => {
      that.loop()
    }, 1000)
  },
  onHide () {
    const that = this
    clearInterval(that.timer)
  },
  onUnload () {
  },
  methods: {
    change (key, newNumber, setTime) {
      const that = this
      var baseNumber = 0 // 原数字
      var difference = newNumber // 与原数字的差
      var time = setTime || 6
      var absDifferent = Math.abs(difference) // 差取绝对值
      var changeTimes = absDifferent < time ? absDifferent : time // 最多变化6次
      var changeUnit = absDifferent < time ? 1 : Math.floor(difference / time) // 绝对差除以变化次数
      // 依次变化
      for (var i = 0; i < changeTimes; i += 1) {
        // 使用闭包传入i值，用来判断是不是最后一次变化
        (function (i) {
          setTimeout(() => {
            that[key] += changeUnit
            // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
            if (i === changeTimes - 1) {
              that[key] = baseNumber + difference
            }
          }, 100 * (i + 1))
        })(i)
      }
    },
    loop () {
      const that = this
      that.timer = setInterval(() => {
        let timeList = tools.getTimer(that.birthday)
        that.days = timeList[0]
        that.hours = timeList[1]
        that.mins = timeList[2]
        that.secs = timeList[3]
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
.count
  width 100%
  height 100vh
  background url('http://wangzc.cc/baby-diary/images/bg.jpg') center
  background-size cover
  position relative
  &-text
    width 60px
    position absolute
    right 20px
    top 90px
    background rgba(255, 255, 255, 0.4)
    img
      width 100%
  &-box
    width 92%
    padding 20px 0 10px
    position absolute
    left 4%
    bottom 12%
    display flex
    justify-content space-around
    align-items center
    background #222
    background-image linear-gradient(top, #222, #333, #333, #222)
    border 1px solid #111
    border-radius 5px
    box-shadow 0px 0px 8px rgba(0, 0, 0, 0.6)
    &:before
      content ""
      width 4px
      height 30px
      background #444
      background-image linear-gradient(top, #555, #444, #444, #555)
      border 1px solid #111
      border-top-left-radius 2px
      border-bottom-left-radius 2px
      display block
      position absolute
      top 50%
      left -4px
      margin-top -15px
    &:after
      content ""
      width 4px
      height 30px
      background #444
      background-image linear-gradient(top, #555, #444, #444, #555);
      border 1px solid #111
      border-top-right-radius 2px
      border-bottom-right-radius 2px
      display block
      position absolute
      top 50%
      right -4px
      margin-top -15px
    .tiles
      min-width 18%
      text-align center
      .number
        height 60px
        line-height 60px
        font-size 28px
        font-weight bold
        padding 0 10px
        color #111
        background-color #ddd
        background-image linear-gradient(top, #bbb, #eee)
        border-top 1px solid #fff
        border-radius 3px
        box-shadow 0px 0px 12px rgba(0, 0, 0, 0.7)
        position relative
        &:before
          content ""
          width 100%
          height 13px
          background #111
          display block
          padding 0 3px
          position absolute
          top 41%
          left -3px
          z-index -1
        &:after
          content ""
          width 100%
          height 1px
          background #eee
          border-top 1px solid #333
          display block
          position absolute
          top 48%
          left 0
      .label
        margin-top 8px
        font-size 12px
        color #f47321
        text-shadow 1px 1px 0px #000
</style>
