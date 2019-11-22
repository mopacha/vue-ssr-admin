/*
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 10:29:38
 */
import API from '@/api'
import { setToken, removeToken } from '@/util/auth'
import Cookies from 'js-cookie'
const state = {
	token: '',
	name: '',
	userInfo: {}
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
	// bahasa Login
	bahasaLogin({ commit, rootState: { $http } }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			API($http).bahasaLogin({ username: username.trim(), password: password }).then(data => {
				commit('SET_TOKEN', data.token)
				commit('SET_NAME', username.trim())
				Cookies.set('name', username.trim())
				setToken(data.token)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({ commit, state, rootState: { $http } }) {
		return new Promise((resolve, reject) => {
			API($http).logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	getInfo({ commit, state, rootState: { $http } }) {
		return new Promise((resolve, reject) => {
			API($http).getInfo(state.token).then(data => {
				commit('SET_USERINFO', data)
				resolve(data)
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

