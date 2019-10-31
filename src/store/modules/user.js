import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/util/auth'

const state = {
	token: getToken(),
	name: '',
	userInfo: null
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_USERINFO: (state, data) => {
		state.userInfo = data
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		login({ username: username.trim(), password: password }).then(res => {
			const { data } = res
			commit('SET_TOKEN', data.token)
			setToken(data.token)
		})
	},

	// get user info
	getInfo({ commit, state }) {
		return getInfo(state.token).then(res => {
			const { data } = res
			commit('SET_USERINFO', data)
		})
	},

	// user logout
	logout({ commit, state }) {
		logout(state.token).then(() => {
			commit('SET_TOKEN', '')
			removeToken()
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			removeToken()
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

