import AuthService from '../services/auth.service';

const currentUser = JSON.parse(sessionStorage.getItem('user'));
const initialState = currentUser
  ? { status: { loggedIn: true }, user: currentUser }
  : { status: { loggedIn: false }, user: null };

const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (loggedUser) => {
          commit('loginSuccess', loggedUser);
          return Promise.resolve(loggedUser);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (loggedUser) => {
          commit('loginSuccess', loggedUser);
          return Promise.resolve(loggedUser);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};

export default auth;
