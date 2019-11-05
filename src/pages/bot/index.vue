<template>
  <div class="bot-container">
    <div class="title">机器人管理</div>
    <div class="bahasa-table">
      <el-table :data="botRes.list">
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
                     :total='botRes.total'
                     :current-page='paginations.page_index'
                     @current-change='handleCurrentChange'
                     @size-change='handleSizeChange'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

function fetchData(store, params) {
  return store.dispatch('bot/getList', params)
}

export default {
  name: 'Home',
  asyncData({ store, route }) {
    const params = {
      page_index: 1,
      page_size: 15
    }
    return fetchData(store, params)
  },
  data() {
    return {
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 15, // 1页显示多少条
        page_sizes: [15, 20, 40], // 每页显示多少条
        pager_count: 5,
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      }
    }
  },

  computed: {
    botRes: function () {
      const botRes = this.$store.getters.botRes
      return {
        list: this.dataFormate(botRes.users),
        total: botRes.count
      }
    }
  },

  methods: {
    dataFormate(list) {
      let table = []
      if (list && list.length > 0) {
        table = list.map((item, index) => {
          return {
            index,
            l1: item.id,
            l2: item.user_email,
            l3: item.character,
            l4: item.domain_name,
          }
        })
      }
      return table
    },

    getData() {
      const params = {
        page_index: this.paginations.page_index,
        page_size: this.paginations.page_size,
      }

      fetchData(this.$store, params)
    },
    handleCurrentChange(val) {
      this.paginations.page_index = val
      this.getData()
    },
    handleSizeChange(val) {
      this.paginations.page_size = val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
