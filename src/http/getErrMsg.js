/*
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-15 16:43:38
 * @LastEditTime: 2019-11-20 14:00:05
 */
export function statusToMsg(status) {
	let msg = ''
	switch (status) {
		case 400:
			msg = '服务端出错'
			break
		case 401:
			msg = '请重新登录'
			break
		case 403:
			msg = '拒绝访问'
			break
		case 404:
			msg = '请求错误,未找到该资源'
			break
		case 405:
			msg = '请求方法未允许'
			break
		case 408:
			msg = '请求超时'
			break
		case 500:
			msg = '服务器端出错'
			break
		case 501:
			msg = '网络未实现'
			break
		case 502:
			msg = '网络错误'
			break
		case 503:
			msg = '服务不可用'
			break
		case 504:
			msg = '网络超时'
			break
		case 505:
			msg = 'http版本不支持该请求'
			break
		default:
			msg = `网络连接错误`
	}

	return msg
}

/*
  CHECK_EXCEPTION(4000, "param error"),//参数校验失败
	TOKEN_INVALID(4001, "token invalid"),
	UNAUTHORIZED(4002, "unauthorized"),
	ACCESS_DENIED(4003, "access denied"),
	RESOURCE_NOTFOUND(4004, "no such resource"),
	BUSINESS_EXCEPTION(5000, "business exception"),
	COMMON_ERROR(5001, "error");*/

export function codeToMsg(code) {
	let msg = ''
	switch (code) {
		case 4000:
			msg = '参数缺少或有误'
			break
		case 4001:
			msg = '令牌无效'
			break
		case 4002:
			msg = '用户名或密码错误'
			break
		case 4003:
			msg = '拒绝访问'
			break
		case 4004:
			msg = '无资源'
			break
		case 5000:
			msg = '业务异常'
			break
		case 5001:
			msg = '系统错误'
			break
	}

	return msg
}
