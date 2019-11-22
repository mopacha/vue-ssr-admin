/*
 * @Description: 服务端请求
 * @Autor: ZFY
 * @Date: 2019-11-15 16:43:38
 * @LastEditTime: 2019-11-15 17:17:18
 */

import axios from 'axios'
import { cookie2Str } from '@/util/cookie-tools'

const currentIP = require('ip').address()
const appConfig = require('../../app.config')

export default cookie => {
	const auth_toten = cookie && cookie['vue_ssr_token'] ? `Bearer ` + cookie['vue_ssr_token'] : ''

	let headers = {
		Accept: 'application/json, text/plain, */*; charset=utf-8',
		'Content-Type': 'application/json; charset=utf-8',
		Pragma: 'no-cache',
		'Cache-Control': 'no-cache',
		Authorization: auth_toten,
		'Cookie': cookie2Str(cookie)
	}

	const baseURL = `http://${currentIP}:${appConfig.appPort}`
	const service = axios.create({
		baseURL: baseURL,
		timeout: 60 * 1000, // 请求超时时间 60s
		withCredentials: true,
		headers: headers
	})

	service.interceptors.request.use(
		config => {
			//config.url = `/api${config.url}`	//统一加/api前缀*/
			return config;
		},
		error => {
			return Promise.error(error);
		})
	service.interceptors.response.use(
		response => {
			const res = response.data
			const { code, data, message } = res
			if (code === 2000) {
				return Promise.resolve(data)
			} else {
				return Promise.reject({
					status: 200,
					code,
					message
				})
			}
		},
		error => {
			//todo 统一处理500、400等错误状态,这里reject下，交给entry-server.js的处理
			const { response, request } = error
			return Promise.reject({ status: response.status, data: response.data, method: request.method, path: request.path })
		}
	)

	return service
}
