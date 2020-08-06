import Vue from 'vue'
import Vuex from 'vuex'

import * as file from '@/store/modules/file.js'
import * as app from '@/store/modules/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    file,
    app
  }
})
