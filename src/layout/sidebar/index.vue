<template>
  <div class="sidebar-container">
    <div :class="{'has-logo':showLogo}">
      <sidebar-logo v-if="showLogo" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <sidebar-menu />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SidebarLogo from "@/layout/sidebar/sidebarLogo/index";
import SidebarMenu from "@/layout/sidebar/sidebarMenu/index";
import { mapGetters } from 'vuex'
export default {
  name: "sidebar",
	components: { SidebarMenu, SidebarLogo },
	 computed: {
    ...mapGetters([
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
