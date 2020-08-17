<template lang="pug">
  .index
    .bg-music(@tap="audioPlay")
      image.musicImg(
        src="../../static/images/music_icon.png"
        :class="isPlay ? 'music_icon' : ''"
      )
      image.music_play(
        src="../../static/images/music_play.png"
        :class="isPlay ? 'puaseImg' : 'playImg'"
      )
    audio(
      id="myAudio"
      :src="audioUrl"
      autoplay
      loop
    )
    .calendar-box
      .left
        .circle
          span.month {{ month }}月
          span.day {{ day }}
        .addressWeather
          p.address {{ address }}
          p.weather {{ weather }}
            span {{ temperature }}
          p.winddirection {{ winddirection }}
      calendar(
        class="right"
        weeks-type="en"
        cell-size="20"
        :header="showHeader"
        show-more-days=true
        calendar-style="demo4-calendar"
        board-style="demo4-board"
        :days-color="daysColor"
        @nextMonth="nextMonth"
        @prevMonth="prevMonth"
        @dateChange="dateChange"
        @dayClick="dayClick"
      )
    image.post-btn(
      v-if="isShowPost"
      src="../../static/images/post_mood.png"
      @tap="goPostPage"
    )
    loading(v-if="loading")
    Nodata(v-else-if="nodata" text="超爸云妈真懒，一句话也不说")
    .list(v-else)
      diary-card(
        v-for="(item, index) in dayList"
        :key="index"
        :item="item"
        @detail="goDetailPage"
        @star="toggleStar"
      )
</template>

<script>
import Loading from 'components/loading'
import Nodata from 'components/nodata'
import DiaryCard from 'components/diary-card'
import amapFile from 'common/js/amap-wx.js'
import tools from 'common/js/tools'
export default {
  name: 'Index',
  components: {
    Loading,
    DiaryCard,
    Nodata
  },
  data () {
    return {
      isPlay: true,
      audioCtx: '',
      audioUrl: '',
      openId: '',
      days_count: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
      daysColor: [],
      showHeader: true,
      year: new Date().getFullYear(),
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      address: '',
      weather: '',
      temperature: '',
      winddirection: '',
      monthList: [],
      dayList: [],
      haveDiaryList: [],
      isShowPost: false,
      loading: true,
      userInfo: null,
      tempObj: null
    }
  },
  computed: {
    nodata () {
      return this.dayList.length === 0
    }
  },
  onLoad () {
    wx.showNavigationBarLoading()
    // this.setCalendarStyle()
    this.audioCtx = wx.createAudioContext('myAudio')
    this.getOpenId()
    this.getDiaryList()
    this.getWeather()
  },
  onShow () {
    // const that = this
    this.isPlay = true
    this.getMusicUrl()
  },
  methods: {
    audioPlay () {
      const that = this
      if (that.isPlay) {
        that.audioCtx.pause()
        that.isPlay = !that.isPlay
        tools.showToast('您已暂停音乐播放~')
      } else {
        that.audioCtx.play()
        that.isPlay = !that.isPlay
        tools.showToast('背景音乐已开启~')
      }
    },

    getMusicUrl () {
      const that = this
      wx.cloud.callFunction({
        name: 'music',
        data: {}
      }).then(res => {
        that.audioUrl = (res.result.data[0] || {}).musicUrl
        that.audioCtx.loop = true
        that.audioCtx.play()
      })
    },
    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
        // 她的id和我的id
        if (that.openId === 'oAihM5PabAaZdAHOd2eBFuZdL73s' || that.openId === 'oAihM5MILq8bNCYSKe22PTTgaXl4') {
          that.isShowPost = true
        }
      })
    },
    setCalendarStyle () {
      for (let i = 1; i <= this.days_count; i++) {
        if (i === this.day) {
          this.daysColor.push({
            month: 'current', day: i, color: 'white', background: '#C44F95'
          })
        } else if (this.haveDiaryList.indexOf(i) > -1) {
          this.daysColor.push({
            month: 'current', day: i, color: 'white', background: '#90DADA'
          })
        } else {
          this.daysColor.push({
            month: 'current', day: i, color: '#333', background: 'transparent'
          })
        }
      }
    },
    nextMonth (e) {
      this.loading = true
      let temp = e.mp.detail
      this.year = temp.currentYear
      this.month = temp.currentMonth
      this.getDiaryList()
    },
    prevMonth (e) {
      this.loading = true
      let temp = e.mp.detail
      this.year = temp.currentYear
      this.month = temp.currentMonth
      this.getDiaryList()
    },
    dateChange (e) {
      this.loading = true
      let temp = e.mp.detail
      this.year = temp.currentYear
      this.month = temp.currentMonth
      this.getDiaryList()
    },
    dayClick (e) {
      this.loading = true
      let temp = e.mp.detail
      this.day = temp.day
      this.setCalendarStyle()
      this.getDayList()
    },
    getWeather () {
      const that = this
      let myAmapFun = new amapFile.AMapWX({key: tools.key})
      myAmapFun.getWeather({
        success (res) {
          // 成功回调
          that.address = res.liveData.city
          that.weather = res.liveData.weather + ' '
          that.temperature = res.liveData.temperature + '℃'
          that.winddirection = res.liveData.winddirection + '风' + res.liveData.windpower + '级'
        },
        fail (info) {
          // 失败回调
          console.log(info)
        }
      })
    },
    getDiaryList () {
      const that = this
      that.haveDiaryList = []
      wx.cloud.callFunction({
        name: 'diaryList',
        data: {
          type: 'oneMonth',
          year: that.year,
          month: that.month
        }
      }).then(res => {
        // that.getSrcFlag = false
        that.monthList = res.result.data
        that.monthList.map(item => {
          let day = new Date(item.date).getDate()
          if (that.haveDiaryList.indexOf(day) === -1) {
            that.haveDiaryList.push(day)
          }
        })
        that.setCalendarStyle()
        that.getDayList()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
    },
    getDayList () {
      this.dayList = this.monthList.filter(item => {
        return this.day === new Date(item.date).getDate()
      })
      this.loading = false
    },
    toggleStar (params) {
      const that = this
      // 她的id和我的id
      if (that.openId === 'oAihM5PabAaZdAHOd2eBFuZdL73s' || that.openId === 'oAihM5MILq8bNCYSKe22PTTgaXl4') {
        that.loading = true
        wx.cloud.callFunction({
          name: 'star',
          data: params
        }).then(res => {
          this.getDiaryList()
        })
      }
    },
    goDetailPage (obj) {
      wx.navigateTo({
        url: '/pages/detail/main?name=' + obj.name + '&url=' + obj.url + '&title=' + obj.title + '&desc=' + obj.desc + '&address=' + obj.address + '&star=' + obj.star + '&id=' + obj._id
      })
    },
    goPostPage () {
      const that = this
      wx.navigateTo({
        url: '/pages/post/main?address=' + that.address + '&openId=' + that.openId + '&weather=' + that.weather
      })
    },
    getTime (date) {
      return tools.formatTime(date)
    }
  },

  created () {
    // let app = getApp()
  },
  onPullDownRefresh () {
    const that = this
    that.loading = true
    wx.showNavigationBarLoading()
    // that.getOpenId()
    that.getDiaryList()
  },

  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/main'
    }
  }
}
</script>

<style scoped lang="stylus">
.index
  height 100%
  position relative
  .bg-music
    position fixed
    left 94rpx
    top 20rpx
    width 100rpx
    z-index 99
    display flex
    justify-content flex-start
    align-items flex-start
    .musicImg
      width 60rpx
      height 60rpx
    .music_icon
      animation musicRotate 3s linear infinite
    .music_play
      width 28rpx
      height 60rpx
      margin-left -10rpx
      transform-origin top
      -webkit-transform rotate(20deg)
    .playImg
      animation musicStop 1s linear forwards
    .pauseImg
      animation musicStart 1s linear forwards
  #myAudio
    display none
  .calendar-box
    display flex
    justify-content space-around
    align-items center
    position relative
    min-height 80rpx
    background -webkit-linear-gradient(#88CCD7 0%, #ffffff 100%)
    .left
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      padding-top 80rpx
      .circle
        height 160rpx
        width 160rpx
        border-radius 100rpx
        background #DBAC94
        margin 0 auto 30rpx
        display flex
        flex-direction column
        justify-content center
        align-items center
        .month
          color #fff
          font-size 30rpx
        .day
          color #e6e6e6
          font-size 50rpx
      .addressWeather
        height 200rpx
        width 100%
        display flex
        flex-direction column
        justify-content center
        align-items center
        .address
          text-align center
          font-size 40rpx
          margin-bottom 20rpx
          color #1296db
        .weather
          text-align center
          font-size 50rpx
          color #63A92C
          margin-bottom 20rpx
          span
            color #F86635
        .winddirection
          text-align center
          font-size 30rpx
          color #773917
    .right
      flex 2
      padding-top 40rpx
  .post-btn
    position fixed
    right 60rpx
    bottom 60rpx
    height 100rpx
    width 100rpx
    box-shadow 0 0 20rpx rgba(0, 0, 0, 0.1)
    border-radius 50%
    background #fff
    z-index 99
  .list
    width 690rpx
    padding 50rpx 30rpx
    display flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
@-webkit-keyframes musicRotate
  from
    -webkit-transformb rotate(0deg)
  to
    -webkit-transform rotate(360deg)
@-webkit-keyframes musicStop
  from
    -webkit-transform rotate(20deg)
  to
    -webkit-transform rotate(0deg)
@-webkit-keyframes musicStart
  from
    -webkit-transform rotate(0deg)
  to
    -webkit-transform rotate(20deg)
</style>
