import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export  default new Vuex.Store({
  state: {
    appId: '',
    taskId: ''
  },
  getters:{
    appId(state){
      return state.appId;
    },
    taskId(state){
      return state.taskId
    }
  },
  mutations:{
    changeAppId(state,data){
      state.appId = data;
    },
    changeTaskId(state,data){
      state.taskId = data;
    }
  },
  actions:{

  }
})
