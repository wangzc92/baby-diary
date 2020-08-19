<template lang="pug">
  .time
    loading(v-if="loading")
    Nodata(v-else-if="nodata")
    .time-content(v-else)
      time-line(:items="diaryList")
</template>

<script>
import Loading from 'components/loading'
import Nodata from 'components/nodata'
import TimeLine from 'components/time-line'
import tools from 'common/js/tools'
export default {
  name: 'Time',
  components: {
    Loading,
    Nodata,
    TimeLine
  },
  data () {
    return {
      loading: true,
      diaryList: []
    }
  },
  computed: {
    nodata () {
      return this.diaryList.length === 0
    }
  },
  onLoad (e) {
    // this.getDiaryList()
  },
  onShow () {
    this.getDiaryList()
  },
  onUnload () {
  },
  methods: {
    getDiaryList () {
      const that = this
      wx.cloud.callFunction({
        name: 'diaryList',
        data: {
          star: true
        }
      }).then(res => {
        that.diaryList = res.result.data.map(item => {
          item.time = tools.formatDay(item.date)
          return item
        })
        that.loading = false
      })
    }
  }
}
</script>

<style lang="stylus">
.time
  .loading
    min-height 100vh
  .nodata
    min-height 100vh
  &-content
    padding 20px
</style>
