import { login, logout, getInfo } from '@/api'
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
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password }).then(res => {
				const { data } = res
				commit('SET_TOKEN', data.token)
				setToken(data.token)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			return getInfo(state.token).then(res => {
				const { data } = res
				commit('SET_USERINFO', data)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			}).catch(error => {
				reject(error)
			})
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

