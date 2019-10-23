<template>
  <div :class="classObj"
       class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside" />
    <sidebar />
    <outside />
  </div>
</template>

<script>
import Sidebar from "@/layout/sidebar"
import Outside from "@/layout/outside/index"
import ResizeMixin from './ResizeHandler'

export default {
  name: "Layout",
  components: { Outside, Sidebar },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>

