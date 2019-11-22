/*
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 12:22:23
 */
import API from '@/api'

const state = {
	taskData: {},
	jobData: {}
}
const mutations = {
	SET_TASK: (state, data) => {
		state.taskData = data
	},
	SET_JOB: (state, data) => {
		state.jobData = data
	}
}

const actions = {
	//getTask List
	getTaskList({ commit, rootState: { $http } }, params) {
		return new Promise((resolve, reject) => {
			API($http).getTaskList(params).then(data => {
				commit('SET_TASK', data)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	//getJob List
	getJobList({ commit, rootState: { $http } }, params) {
		return new Promise((resolve, reject) => {
			API($http).getJobList(params).then(data => {
				commit('SET_JOB', data)
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

