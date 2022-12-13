import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: false,
        typeUser: 'default'
    },
    getters: {
        getUser(state) {
          return state.user;
        }
    },
    mutations: {
        change_user_state (state, payload) {
          state.user = payload.userToken;
          state.typeUser = payload.userType;
        }
    }
})