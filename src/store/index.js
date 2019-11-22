import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import bot from './modules/bot'

Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        modules:{
					app,
					settings,
					user,
					bot
        },
        getters
    })
}
