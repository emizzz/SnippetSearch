import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
      notify_msg: '',
      notify_time: 5,
    },
    mutations: {
      set_notification (state, payload) {
        state.notify_msg = payload
      }
    },
    actions: {
      notify ({ commit, state }, msg) {
        commit('set_notification', msg)
        setTimeout(() => {
          commit('set_notification', '')
        }, state.notify_time*1000)
      }
    },
    getters: {
      getNotify(state){
        return state.notify_msg
      },
      getNotifyTime(state){
        return state.notify_time
      }
    },
  })

export default store