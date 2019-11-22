/*
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-20 14:05:15
 * @LastEditTime: 2019-11-20 15:04:59
 */
//['状态', '开始','取消', '查看'],
const taskStatus = {
	'INIT': ['创建中', 0, 0, 0],
	'PROCESSING': ['创建中', 0, 0, 0],
	'NORMAL': ['创建中', 0, 0, 0],
	'SCHEDULED': ['已创建', 1, 1, 1],
	'RUNNING': ['拨打中', 0, 1, 1],
	'PAUSED': ['拨打暂停', 0, 1, 1],
	'FINISHED': ['已完成', 0, 0, 1],
	'ERROR': ['创建失败', 0, 0, 0],
	'default': ['--', 0, 0, 0],
}
//状态 开始 取消 概述 详情
const batchStatus = {
	'0': ['创建中', 0, 0, 0, 0],
	'-1': ['创建中', 0, 0, 0, 0],
	'1': ['创建中', 0, 0, 0, 0],
	'2': ['已创建', 1, 1, 1, 0],
	'4': ['拨打中', 0, 1, 1, 0],
	'5': ['拨打暂停', 0, 1, 1, 0],
	'8': ['已完成', 0, 0, 1, 1],
	'-3': ['任务取消', 0, 0, 1, 1],
	'-2': ['创建失败', 0, 0, 0, 0],
	'default': ['--', 0, 0, 0, 0],
}

// 结论  意图
const resultStatus = {
	'0': ['--', 0],
	'1': ['拨打中', 0],
	'-2': ['未接通', 0],
	'2': ['已完成', 1],
	'-1': ['未接通', 0],
	'-3': ['未接通', 0],
	'default': ['--', 0],
}

export function getTaskStatus(status) {
	let itemStatus = taskStatus[status] || taskStatus['default']
	return {
		msg: itemStatus[0],
		start: itemStatus[1],
		cancel: itemStatus[2],
		look: itemStatus[3]
	}
}

export function getBatchStatus(status) {
	let itemStatus = batchStatus[status] || batchStatus['default']
	return {
		msg: itemStatus[0],
		start: itemStatus[1],
		cancel: itemStatus[2],
		summary: itemStatus[3],
		detail: itemStatus[4]
	}
}

export function getResultStatus(status) {
	let itemStatus = resultStatus[status] || resultStatus['default']
	return {
		msg: itemStatus[0],
		order: itemStatus[1]
	}
}




