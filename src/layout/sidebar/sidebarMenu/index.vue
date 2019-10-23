<template>
  <el-menu :default-active="activeMenu"
           :collapse="isCollapse"
           :background-color="variables.menuBg"
           :text-color="variables.menuText"
           :unique-opened="false"
           :active-text-color="variables.menuActiveText"
           :collapse-transition="false"
           mode="vertical">
    <sidebar-item v-for="route in routes"
                  :key="route.path"
                  :item="route"
                  :base-path="route.path" />
  </el-menu>
</template>

<script>
import SidebarItem from "./SidebarItem"
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  name: "sidebarMenu",
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

