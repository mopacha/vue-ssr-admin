<template>
  <el-dropdown trigger="click"
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
        Bahasa
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
