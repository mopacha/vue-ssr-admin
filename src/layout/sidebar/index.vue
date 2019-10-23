<template>
	<div class="sidebar-container">
		<sidebar-logo/>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<sidebar-menu/>
		</el-scrollbar>
	</div>
</template>

<script>
	import SidebarLogo from "@/layout/sidebar/sidebarLogo/index";
	import SidebarMenu from "@/layout/sidebar/sidebarMenu/index";

	export default {
		name: "sidebar",
		components: {SidebarMenu, SidebarLogo},
	}
</script>

<style lang="scss" scoped>

</style>
