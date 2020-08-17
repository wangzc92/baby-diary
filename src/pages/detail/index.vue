<template lang="pug">
  .detail
    image(
      mode="widthFix"
      class="img"
      :src="url"
      @tap="lookImage(url)"
    )
    .cityName
      .city
        image(class="icon" src="../../static/images/position.png")
        span.address {{ address }}
      .like
        image(
          v-if="star"
          src="../../static/images/like_active.png"
          @tap.stop="toggleStar(false)"
        )
        image(
          v-else
          src="../../static/images/like.png"
          @tap.stop="toggleStar(true)"
        )
    p.title {{ title }}
    p.desc {{ desc }}
    p.name 爱你的{{ name }}
    .loading-container(v-if="getSrcFlag")
      loading
</template>

<script>
import Loading from 'components/loading'
import tools from 'common/js/tools'
export default {
  name: 'Detail',
  data () {
    return {
      openId: '',
      id: '',
      url: '',
      address: '',
      name: '',
      getSrcFlag: true,
      title: '',
      desc: '',
      weather: '',
      star: false
    }
  },
  components: {
    Loading
  },
  onLoad (e) {
    const that = this
    that.getOpenId()
    that.id = e.id
    that.name = e.name
    wx.setNavigationBarTitle({
      title: that.name + '的话'
    })
    that.url = e.url
    that.title = e.title
    that.desc = e.desc
    that.address = e.address
    that.star = e.star === 'true'
    that.timer = setTimeout(() => {
      that.getSrcFlag = false
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
        backgroundColor: that.getRandomColor(),
        animation: {
          duration: 3000,
          timingFunc: 'easeInOut'
        }
      })
    }, 1000)
  },
  onUnload () {
    const that = this
    clearTimeout(that.timer)
    that.id = ''
    that.name = ''
    that.url = ''
    that.title = ''
    that.desc = ''
    that.getSrcFlag = true
    that.timer = null
    that.address = ''
    that.star = ''
  },
  methods: {
    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
      })
    },
    toggleStar (value) {
      const that = this
      // 她的id和我的id
      if (that.openId === 'oAihM5PabAaZdAHOd2eBFuZdL73s' || that.openId === 'oAihM5MILq8bNCYSKe22PTTgaXl4') {
        wx.cloud.callFunction({
          name: 'star',
          data: {
            id: that.id,
            star: value
          }
        }).then(res => {
          if (value) {
            tools.showToast('收藏成功~')
          } else {
            tools.showToast('取消收藏成功')
          }
          this.star = value
        })
      }
    },
    lookImage (img) {
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },
    getRandomColor () {
      let rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length === 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading-container
  position fixed
  width 100%
  height 100%
  top 0
  bottom 0
  left 0
  right 0
  background #fff
  margin auto
  display flex
  justify-content center
  align-items center
.detail
  height 100%
  .img
    width 100%
  .cityName
    height 80rpx
    padding 0 30rpx
    width 690rpx
    display flex
    justify-content space-between
    align-items center
    .city
      flex 1
      display flex
      justify-content flex-start
      align-items center
      .icon
        width 36rpx
        height 36rpx
        margin-right 6rpx
      .address
        font-size 24rpx
        color #666
    .like
      flex 2
      text-align right
      image
        height 36rpx
        width 36rpx
        margin-right 10rpx
  .title
    padding 20rpx 60rpx
    font-size 30rpx
    color #333
    line-height 60rpx
    word-wrap break-word
    white-space pre-wrap
  .desc
    padding 20rpx 60rpx
    font-size 30rpx
    color #666
    line-height 60rpx
    word-wrap break-word
    white-space pre-wrap
    margin-bottom 200rpx
  .name
    text-align center
    color #999
    margin-bottom 100rpx
    font-size 24rpx
</style>
