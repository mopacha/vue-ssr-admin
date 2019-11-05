const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
	name: state => state.user.name,
	userInfo: state => state.user.userInfo,
	botRes: state => state.bot.botRes
}
export default getters
