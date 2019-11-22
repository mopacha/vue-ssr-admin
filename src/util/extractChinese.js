// 将目录中所有文件中的汉字，可以内嵌数字，扫描提取出来

let fs = require('fs')
let join = require('path').join

function getJsonFiles(jsonPath) {
	let jsonFiles = []
	function findJsonFile(path) {
		let files = fs.readdirSync(path)
		files.forEach(function(item, index) {
			let fPath = join(path, item)
			let stat = fs.statSync(fPath)
			if (stat.isDirectory() === true) {
				findJsonFile(fPath)
			}
			if (stat.isFile() === true) {
				jsonFiles.push(fPath)
			}
		})
	}
	findJsonFile(jsonPath)
	return jsonFiles
}

function stripscript(s) {
	let pattern = new RegExp(
		"[`__~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}\"【】‘；：”“'。，、？]"
	)
	let rs = ''
	for (let i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '')
	}
	return rs
}

function GetChinese(strValue) {
	if (strValue != null && strValue != '') {
		let reg = /([\u4E00-\u9FA5]+)|(.*[\u4E00-\u9FA5].*)/g
		let reg2 = /[a-zA-Z]/g
		let str = strValue.replace(reg2, '')
		let str2 = stripscript(str)
		return str2.match(reg).join('</br>')
	} else{
		return ''
	}
}
function readFiles(source) {
	let Files = getJsonFiles(source)
	let data = []
	Files.forEach(function(item) {
		if (item.split('.').pop() == 'js' || item.split('.').pop() == 'vue') {
			let idata = fs.readFileSync(item, 'utf-8')
			data = data.concat(idata)
		}
	})
	return data
}

function copySync(source, target) {
	let data = readFiles(source)
	let result = GetChinese(data.toString())
	fs.writeFileSync(target, result)
}

copySync('./src', './out.html')
