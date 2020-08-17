<template lang="pug">
.nodata
  img(src="../../static/images/nodata.png")
  span.text {{ text }}
</template>

<script>
export default {
  name: 'Nodata',
  props: {
    text: {
      type: String,
      default: '暂时没有更多内容'
    }
  }
}
</script>

<style lang="stylus">
.nodata
  width 100vw
  min-height 240px;
  display flex
  flex-direction column
  justify-content center
  align-items center
  img
    width 151px
    height 158px
  span.text
    font-size 16px
    color #666
    margin-top 12px
</style>
