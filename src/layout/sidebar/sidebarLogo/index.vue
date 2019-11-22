<!--
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 10:52:09
 -->
<template>
  <div class="sidebar-logo-container"
       :class="{'collapse':isCollapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="isCollapse"
                   key="collapse"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logo"
             :src="logo"
             class="sidebar-logo">
        <h1 v-else
            class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else
                   key="expand"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logo"
             :src="logo"
             class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: 'Vue-SSR',
      logo: require('@/assets/logo/logo.png')
    }
  },

  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
	background: #fff;
	border-bottom: 1px solid #eef3f9;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 40px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #396AFF;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
