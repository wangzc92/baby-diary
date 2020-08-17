<template lang="pug">
  .diary-card(
    @tap="goDetailPage(item)"
  )
    image.like(
      v-if="item.star"
      src="../../static/images/like_active.png"
      @tap.stop="handleStar(false)"
    )
    image.like(
      v-else
      src="../../static/images/like.png"
      @tap.stop="handleStar(true)"
    )
    image.img(
      :src="item.url"
      mode="aspectFill"
    )
    p.title {{ item.title }}
    p.desc {{ item.desc }}
    p.info-line
      span.address {{ item.address }}
      span.name {{ item.name }}
    p.info-line
      span.weather {{ item.weather }}
      span.time {{ time }}
</template>

<script>
import tools from 'common/js/tools'
export default {
  name: 'DiaryCard',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    time () {
      return tools.formatTime(this.item.date)
    }
  },
  methods: {
    goDetailPage (obj) {
      this.$emit('detail', obj)
    },
    handleStar (val) {
      let params = {
        id: this.item._id,
        star: val
      }
      this.$emit('star', params)
    }
  }
}
</script>

<style scoped lang="stylus">
.diary-card
  width 330rpx
  margin-right 30rpx
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  box-shadow 0 0 20rpx rgba(0, 0, 0, 0.1)
  margin-bottom 40rpx
  padding-bottom 30rpx
  border-radius 0 0 16rpx 16rpx
  position relative
  &:nth-of-type(2n+0)
    margin-right 0
  .like
    position absolute
    right 10rpx
    top 10rpx
    z-index 9
    background #fff
    height 30rpx
    width 30rpx
    padding 0
    margin 0
    border-radius 50%
    padding 10rpx
  .img
    width 100%
    height 180rpx
    margin-bottom 20rpx
    border-radius 16rpx 16rpx 0 0
  .title
    line-height 60rpx
    height 60rpx
    color #333
    padding-left 20rpx
    width 290rpx
    word-wrap break-word
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    font-size 30rpx
  .desc
    line-height 60rpx
    height 60rpx
    color #666
    padding-left 20rpx
    width 290rpx
    word-wrap break-word
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    font-size 26rpx
  .info-line
    height 50rpx
    line-height 50rpx
    font-size 24rpx
    padding-left 20rpx
    display flex
    width 290rpx
    justify-content space-between
    align-items center
    .address
      color #63A92C
    .name
      color #66cdcc
    .weather
      color #999
    .time
      color #773917
</style>