import { getList } from '@/api'

const state = {
	botList: null
}

const mutations = {
	SET_BOTLIST: (state, data) => {
		state.botList = data
	}
}

const actions = {
	// get user info
	getList({ commit }, params) {
		return new Promise((resolve, reject) => {
			return getList(params).then(res => {
				const { data } = res
				commit('SET_BOTLIST', data)
				resolve(data)
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

