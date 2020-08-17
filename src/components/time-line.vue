<template lang="pug">
  .time-line
    .item(
      v-for="(item, index) in items"
      :key="index"
      @tap="goDetailPage(item)"
    )
      .item-index {{ item.time }}
      .item-title {{ item.title }}
      .item-desc {{ item.desc }}
    .item
      .item-index 到底了~
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goDetailPage (obj) {
      wx.navigateTo({
        url: '/pages/detail/main?name=' + obj.name + '&url=' + obj.url + '&title=' + obj.title + '&desc=' + obj.desc + '&address=' + obj.address + '&star=' + obj.star + '&id=' + obj._id
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .time-line
    .item
      margin-left 50px
      width calc(100% - 50px)
      height auto
      position relative
      margin-bottom 40px
      &:before
        content ''
        width 12px
        height 12px
        border-radius 100%
        background-color #91c2fc
        position absolute
        left -17px
      &:after
        content ''
        width 3px
        height calc(100% + 40px)
        background-color #91c2fc
        position absolute
        top 0
        left -12px
      &-index
        line-height 12px
        font-size 12px
        position relative
        color #656565
      &-title
        line-height 60rpx
        height 60rpx
        color #333
        width 100%
        word-wrap break-word
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 30rpx
      &-desc
        color #666
        width 100%
        word-wrap break-word
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 26rpx
      &:last-of-type:after
        display none
</style>