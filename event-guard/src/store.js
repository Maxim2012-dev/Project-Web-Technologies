import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storedUser = window.localStorage.getItem("user");

let state =  {
  user: false,
  typeUser: 'default',
  username: false,
  userObject: false
};

if (storedUser !== undefined)
  state = JSON.parse(storedUser);

// 'user' represents the JSON Web Token
// typeUser is either 'organizer' or 'provider'
// username is the username as String
// userObject is the user data (except for the password)
export const store = new Vuex.Store({
    state,
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
          window.localStorage.setItem("user", JSON.stringify(state))
        },
        init_user_object(state, payload) {
          state.userObject = payload.object;
        },
        update_user_object(state, payload) {
          state.userObject.name = payload.object_data[0]
          state.userObject.telnr = payload.object_data[1]
          state.userObject.email = payload.object_data[2]
          state.userObject.username = payload.object_data[3]
        }
    }
})