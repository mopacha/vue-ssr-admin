/*
 * @Description: all api
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:35
 * @LastEditTime: 2019-11-22 12:11:21
 */

export default http => {
	const apis = {
		// bahasa 登录
		bahasaLogin(data) {
			return http.post('fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/login', data)
		},
		//任务列表
		getTaskList(data) {
			return http.post(`fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/task/list`, data.vo)
		},
		//拨打批次列表
		getJobList(data) {
			return http.post(`fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/batch`, data.vo)
		},
		// 概述
		getJobSummary(id) {
			return http.get(`fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/summary?id=${id}`)
		},

		getInfo() {
			return http.get('/fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/userInfo')
		},
		logout() {
			return http.post('/fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/logout')
		}
	}

	return apis
}

















