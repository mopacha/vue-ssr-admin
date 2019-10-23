<template>
  <div :class="classObj"
       class="app-wrapper">
    <sidebar />
    <outside />
  </div>
</template>

<script>
import Sidebar from "@/layout/sidebar/index"
import Outside from "@/layout/outside/index"
import ResizeMixin from '@/util/ResizeHandler'

export default {
  name: "Layout",
  components: { Outside, Sidebar },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
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

