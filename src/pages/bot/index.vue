<template>
  <div>
    robotManage:
    {{botList}}

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  asyncData({ store, router }) {
    const params = {
      page_index: 1,
      page_size: 20
    }
    return store.dispatch('bot/getList', params)
  },
  data() {
    return {
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 20, // 1页显示多少条
        page_sizes: [20, 40, 60], // 每页显示多少条
        pager_count: 5,
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      }
    }
  },
  computed: {
    ...mapGetters([
      'botList'
    ])
  }

}
</script>

<style lang="scss" scoped>
</style>
