/*
 * @Description:
 * @Autor: ZFY
 * @Date: 2019-11-11 14:47:36
 * @LastEditTime: 2019-11-22 12:22:05
 */
const getters = {
	sidebar: state => state.app.sidebar,
	language: state => state.app.language,
	device: state => state.app.device,
	token: state => state.user.token,
	name: state => state.user.name,
	userInfo: state => state.user.userInfo,
	taskData: state => state.bot.taskData,
	jobData: state => state.bot.jobData,

}
export default getters
