import Vue from 'vue'
import Vuex from 'vuex'
import weatherStore from './store/weatherStore'

Vue.use(Vuex)

export default new Vuex.Store({
modules: {
  weatherStore: weatherStore
}
})
