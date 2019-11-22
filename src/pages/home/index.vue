<!--
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 12:24:15
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
		// 触发 action 后，会返回 Promise
		return store.dispatch('user/getInfo')
	},
	computed: {
		...mapGetters(['userInfo'])
	}
}
</script>

<style lang="scss" scoped>
.home {
	&-container {
		padding: 20px;
		background-color: #fff;
	}

	&-text {
		font-size: 30px;
		color: #97a8be;
		.name {
			color: #396aff;
		}
	}
}
</style>
