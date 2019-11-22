export function cookie2Str(obj) {
	let str = ''
	try {
		if (JSON.stringify(obj) !== '{}') {
			Object.keys(obj).forEach(key => {
				str = str + key + '=' + obj[key] + ';'
			})
			str = str.substr(0, str.length - 1);
		}
	} catch (error) {
		str = ''
	}
	return str
}

export function cookie2Json(cookie) {
	let obj = {}
	if(cookie){
		let cookieArr = cookie.replace(/\s+/g,"").split(";")
		cookieArr.forEach((i) => {
			let arr = i.split("=")
			obj[arr[0]] = arr[1]
		})
	}

	return obj
}
