import { getList } from '@/api'

const state = {
	botRes: null
}

const mutations = {
	SET_BOTRES: (state, data) => {
		state.botRes = data
	}
}

const actions = {
	// get user info
	getList({ commit }, params) {
		return new Promise((resolve, reject) => {
			return getList(params).then(res => {
				commit('SET_BOTRES', res)
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

