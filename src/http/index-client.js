/*
 * @Description: 客户端请求
 * @Autor: ZFY
 * @Date: 2019-11-15 16:43:38
 * @LastEditTime: 2019-11-20 13:28:06
 */

import axios from 'axios'
import { statusToMsg, codeToMsg } from './getErrMsg'
import { removeToken, getToken } from '@/util/auth'
import { Message, Loading } from 'element-ui'

let loading
let count = 0

function startLoading() {
	if (count > 0) {
		loading.close()
	}
	count++
	loading = Loading.service({
		lock: true,
		text: '数据加载中...',
		background: 'rgba(0, 0, 0, 0)',
		target: '.app-container' // 设置加载动画区域
	})
}
function endLoading() {
	loading.close()
	count = 0
}

const showError = msg => {
	Message({
		showClose: true,
		message: msg,
		type: 'error',
		duration: 3.5 * 1000
	})
}

export default () => {
	const service = axios.create({
		baseURL: '',
		timeout: 60 * 1000, // 请求超时时间 60s
		withCredentials: true
	})

	//请求拦截器
	service.interceptors.request.use(
		config => {
			startLoading()
			config.headers['Authorization'] = 'Bearer ' + getToken()
			return config
		},
		error => {
			return Promise.error(error)
		})

	service.interceptors.response.use(
		response => {
			endLoading()
			const res = response.data
			const { code, data } = res
			if (code === 2000) {
				return Promise.resolve(data)
			} else {
				let errMsg = codeToMsg(code)
				showError(errMsg)
				return Promise.reject({
					status: 200,
					code,
					message: errMsg
				})
			}
		},
		error => {
			endLoading()
			const { response, request } = error
			const {
				status,
				data
			} = response
			const {
				method,
				path
			} = request

			let errMsg = ''

			if (status === 401) {
				removeToken()
				window.location.href = '/login'
			} else {
				errMsg = statusToMsg(status)
				if (errMsg) {
					showError(errMsg)
				}
			}
			return Promise.reject({ status, message: errMsg, data, method, path })
		}
	)

	return service
}
