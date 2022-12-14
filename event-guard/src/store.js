import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 'user' represents the JSON Web Token
// typeUser is either 'organizer' or 'provider'
// username is the username as String
// userObject is the user data
export const store = new Vuex.Store({
    state: {
        user: false,
        typeUser: 'default',
        username: false,
        userObject: false
    },
    getters: {
        getUser(state) {
          return state.user;
        },
        getTypeUser(state) {
          return state.typeUser;
        },
        getUsername(state) {
          return state.username;
        },
        getUserObject(state) {
          return state.userObject;
        }
    },
    mutations: {
        change_user_state (state, payload) {
          state.user = payload.userToken;
          state.typeUser = payload.userType;
          state.username = payload.username;
        },
        init_user_object(state, payload) {
          state.userObject = payload.object;
        }
    }
})