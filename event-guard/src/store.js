import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: false,
        typeUser: 'default'
    },
    mutations: {
        change_user_state (state, payload) {
          this.user = payload.userToken;
          this.typeUser = payload.userType;
        }
      }
})