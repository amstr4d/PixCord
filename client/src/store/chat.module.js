const chat = {
  namespaced: true,
  state: {
    messages: [],
    currentRoom: null,
  },
  mutations: {
    changeCurrent(state, room) {
      state.currentRoom = room;
    },
    SOCKET_MESSAGE(state, message) {
      state.messages.push(message);
    },
  },
};

export default chat;
