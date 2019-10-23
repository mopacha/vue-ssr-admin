import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        modules:{
					app,
					settings,
					user
        },
        getters,
        strict: process.env.NODE_ENV !== 'production'
    })
}