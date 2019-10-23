<template>
  <div class="main-container">
    <div :class="{'fixed-header':fixedHeader}">
      <navbar />
    </div>
    <app-main />
  </div>
</template>

<script>
import Navbar from "./navbar/index"
import AppMain from "./appMain/index";
export default {
  name: "outside",
  components: { AppMain, Navbar },
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
