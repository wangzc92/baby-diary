<template lang="pug">
  .post
    image(
      mode="widthFix"
      class="default"
      :src="imgUrl"
      @tap="upload"
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
    input(
      v-if="getSrcFlag"
      class="title"
      placeholder="标题"
      cursor-spacing="140"
      placeholder-style="color:#ccc;"
      v-model="title"
    )
    textarea(
      v-if="getSrcFlag"
      maxlength="520"
      class="desc"
      placeholder="想要跟我说什么，我都乖乖听着呢"
      name="textarea"
      placeholder-style="color:#ccc;"
      cursor-spacing="140"
      v-model="desc"
    )
    .save(@tap="save")
      image(class="save-t" src="../../static/images/save.png")
    .loading-container(v-if="!getSrcFlag")
      loading
</template>

<script>
import Loading from 'components/loading'
import tools from 'common/js/tools'
export default {
  name: 'Post',
  data () {
    return {
      imgUrl: '../../static/images/default-add.jpg',
      address: '',
      openId: '',
      name: '超爸',
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
    that.address = e.address
    that.openId = e.openId
    that.weather = e.weather
    if (that.openId === 'oAihM5MILq8bNCYSKe22PTTgaXl4') {
      that.name = '云妈'
    }
  },
  onUnload () {
    const that = this
    that.address = ''
    that.openId = ''
    that.name = '超爸'
    that.getSrcFlag = true
    that.title = ''
    that.desc = ''
    that.imgUrl = '../../static/images/default-add.jpg'
  },
  methods: {
    toggleStar (value) {
      this.star = value
    },
    upload () {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.showLoading({
            title: '上传中'
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let filePath = res.tempFilePaths[0]
          const name = Math.random() * 1000000
          const cloudPath = 'picture/' + name + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath, // 云存储图片名字
            filePath // 临时路径
          }).then(res => {
            wx.hideLoading()
            that.imgUrl = res.fileID
          }).catch(e => {
            wx.hideLoading()
            tools.showToast('上传失败~')
            console.log('[上传图片] 失败：', e)
          })
        }
      })
    },

    save () {
      const that = this
      if (that.desc) {
        that.getSrcFlag = false
        const db = wx.cloud.database()
        const diary = db.collection('diary')
        if (that.imgUrl === '../../static/images/default-add.jpg') {
          that.imgUrl = '../../static/images/default.jpg'
        }
        diary.add({
          data: {
            title: that.title,
            desc: that.desc,
            star: that.star,
            date: new Date().getTime(),
            url: that.imgUrl,
            name: that.name,
            weather: that.weather,
            address: that.address
          }
        }).then(res => {
          wx.reLaunch({
            url: '/pages/index/main'
          })
        }).catch(e => {
          console.log(e)
        })
      } else {
        tools.showToast('写点什么吧~')
      }
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
.post
  height 100%
  .default
    min-height 500rpx
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
  input
    position relative
    line-height 42rpx
    font-size 30rpx
    color #333
    resize none
    outline none
    padding 40rpx 40rpx 20rpx 40rpx
    width 690rpx
    &::-webkit-input-placeholder
      font-size 30rpx
      color #999
    &:after
      content ''
      position absolute
      bottom 0
      left 40rpx
      width 1400rpx
      height 1rpx
      background #cccccc
      transform scale(0.5)
      transform-origin 0 50%
  textarea
    min-height 200rpx
    line-height 42rpx
    font-size 30rpx
    color #333
    resize none
    outline none
    padding 20rpx 40rpx 40rpx 40rpx
    width 690rpx
    &::-webkit-input-placeholder
      font-size 30rpx
      color #999
  .save
    position fixed
    bottom 50rpx
    left 50%
    margin-left -50rpx
    height 120rpx
    width 120rpx
    border-radius 50%
    box-shadow 0 0 20rpx rgba(0, 0, 0, 0.1)
    display flex
    flex-direction column
    justify-content center
    align-items center
    z-index 9999
    .save-t
      height 60rpx
      width 60rpx
</style>
