<!--
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-22 10:49:56
 * @LastEditTime: 2019-11-22 12:43:26
 -->
<template>
	<div class="home-container">
		<div class="home-text ">
				Welcome to
			<span class="name">
				{{ userInfo.username }}
			</span>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	asyncData({ store, router }) {
		return store.dispatch('user/getInfo')
	},
	computed: {
		...mapGetters(['userInfo'])
	}
}
</script>


<style lang="scss" scoped>
@import './style/index.scss';
</style>
