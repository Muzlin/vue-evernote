import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './modules/notebook'
import notes from './modules/notes'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    notebook,
    notes
  }
})
