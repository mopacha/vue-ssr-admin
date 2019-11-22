<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<lang-select class="right-menu-item hover-effect" />
			<el-dropdown class="avatar-container">
				<div class="avatar-wrapper">
					<img :src="headImg" class="user-avatar" />
					<i class="el-icon-caret-bottom" />
					<span class="user-name">{{name}}</span>
				</div>
				<el-dropdown-menu slot="dropdown" class="user-dropdown">
					<router-link to="/">
						<el-dropdown-item>
							{{ $t('navbar.home') }}
						</el-dropdown-item>
					</router-link>
					<a target="_blank" href="https://github.com/mopacha/vue-ssr-admin">
						<el-dropdown-item> {{ $t('navbar.github') }}</el-dropdown-item>
					</a>
					<el-dropdown-item divided>
						<span style="display:block;" @click="logout"> {{ $t('navbar.logOut') }}</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
export default {
	name: 'Navbar',
	data() {
		return {
			headImg: require('@/assets/logo/user.svg')
		}
	},
	components: {
		Breadcrumb,
		Hamburger,
		LangSelect
	},
	computed: {
		...mapGetters(['sidebar', 'name'])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		},
		logout() {
			this.$store.dispatch('user/logout')
			this.$router.push(`/login?redirect=${this.$route.fullPath}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 2px 2px 5px #eef3f9;
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			margin: 0 32px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;
			cursor: pointer;
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
					margin-right: 5px;
				}
				.user-name {
					display: inline-block;
					height: 40px;

					font-weight: 500;
					position: relative;
					top: -14px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 15px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
