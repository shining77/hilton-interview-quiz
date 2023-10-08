import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    userId: "",
    isEmployee: false,
  },
  mutations: {
    setUserId(state, userId = "") {
      state.userId = userId;
    },
    setSsEmployee(state, isEmployee = false) {
      state.isEmployee = isEmployee;
    },
  },
  actions: {
  },
  getters: {
    userId: state => state.userId,
    isEmployee: state => state.isEmployee,
  }
})

export default store
