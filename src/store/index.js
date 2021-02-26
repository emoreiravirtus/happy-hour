import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userModule from './modules/user'
import dayWorkedModule from './modules/day_worked'

export const store = new Vuex.Store({
    modules: {
        user: userModule,
        day_worked: dayWorkedModule
    }
})