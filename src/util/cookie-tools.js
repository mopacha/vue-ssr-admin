export function cookie2Str(obj) {
	let str = ''
	try {
		if (JSON.stringify(obj) !== '{}') {
			Object.keys(obj).forEach(key=>{
				str= str+key+'='+obj[key]+';'
			})
			str = str.substr(0, str.length - 1);
		}
	} catch (error) {
		str = ''
	}
	return str
}
