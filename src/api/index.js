import http from '@/util/http'

export function login(data) {
	return http.post('/fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/login', data)
}

export function getInfo(token) {
	return http.get('/fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/userInfo')
}

export function logout() {
	return http.post('/fastApp/mock/55ba966902a625c38ff5f6b565e4f0aa/ssr/logout')
}

export function getList(params) {
	return http.post('/waterApp/dhv1/users/list', params)
}

