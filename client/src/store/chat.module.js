const chat = {
  namespaced: true,
  state: {
    messages: [],
    current: null,
  },
  mutations: {
    changeCurrent(state, id) {
      state.current = id;
    },
    SOCKET_MESSAGE(state, message) {
      state.messages.push(message);
    },
  },
};

export default chat;
