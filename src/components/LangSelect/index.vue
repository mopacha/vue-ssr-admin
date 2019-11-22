<!--
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-22 10:49:55
 * @LastEditTime: 2019-11-22 12:29:10
 -->
<template>
  <el-dropdown trigger="hover"
               class="international"
               @command="handleSetLanguage">
    <div class="international-i">
      <svg-icon style="width: 40px;height: 32px;"
                class-name="international-icon"
                icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'"
                        command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'"
                        command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='id'"
                        command="id">
        Indonesia
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.international {
  &-i {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
