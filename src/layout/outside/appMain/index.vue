<!--
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-20 17:01:18
 -->
<template>
	<section class="app-main">
			<transition name="fade-transform" mode="out-in">
				<router-view :key="key" />
			</transition>
	  <!--<div class="app-container">
		</div>-->
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		key() {
			return this.$route.path
		}
	}
}
</script>

<style lang="scss" scoped>
.app-main {
	/*50 = navbar  */
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
	padding: 20px;
	.app-container {
		background-color: #fff;
		box-shadow: 0px 0px 6px 0px rgba(30, 106, 255, 0.06);
		border-radius: 2px;
		min-height: calc(100vh - 90px);
	}
}
.fixed-header + .app-main {
	padding-top: 70px;
	min-height: 100vh;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 15px;
	}
}
</style>
