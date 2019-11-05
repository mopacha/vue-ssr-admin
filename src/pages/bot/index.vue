<template>
  <div class="bot-container">
    <div class="title">机器人管理</div>
    <div class="bahasa-table">
      <el-table :data="tableData">
        <el-table-column prop="l1"
                         label="机器人名">
        </el-table-column>
        <el-table-column prop="l2"
                         label="针对对象">
        </el-table-column>
        <el-table-column prop="l3"
                         label="语气">
        </el-table-column>
        <el-table-column prop="l4"
                         label="适用范围">
        </el-table-column>
      </el-table>
    </div>

    <div class='bahasa-pagination'>
      <el-pagination :page-sizes='paginations.page_sizes'
                     :page-size='paginations.page_size'
                     :pager-count='paginations.pager_count'
                     :layout='paginations.layout'
                     :total='paginations.total'
                     :current-page='paginations.page_index'
                     @current-change='handleCurrentChange'
                     @size-change='handleSizeChange'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  asyncData({ store }) {
    const params = {
      page_index: 1,
      page_size: 20
    }
    return store.dispatch('bot/getList', params)
  },
  data() {
    return {
      tableData: [],
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
  },

  methods: {
    getData() {

    },
    handleCurrentChange(val) {
      this.paginations.page_index = val
      this.getData()
    },
    handleSizeChange(val) {
      this.paginations.page_size = val
      this.getData()
    }
  },

}
</script>


<style lang="scss" scoped>
@import "./style/index.scss";
</style>
