<template>
  <div class="w-2/3 sm:w-3/4 flex flex-col p-4">
    <div class="flex flex-col space-y-2 flex-1">
      <div v-for="(message, index) in messages" :key="index">
        <span class="bg-gray-200 p-4 rounded-full block"
          >{{ message.user.name }} : {{ message.content }}</span
        >
      </div>
    </div>

    <form
      @submit.prevent="sendMessage"
      class="flex space-x-4"
      autocomplete="off"
    >
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Send a message"
        v-model="inputMessage"
        class="flex-1 border rounded-full appearance-none px-4 focus:border-blue-500 transition-all duration-300 ease-in-out"
      />
      <div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Chat',
  data() {
    return {
      messages: [{ content: 'test', user: { id: 2, name: 'Test' } }],
      inputMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.inputMessage !== '') {
        this.$socket.emit('SEND_MESSAGE', {
          content: this.inputMessage,
          user: {
            id: 1,
            name: this.$store.state.user,
          },
        });
        this.inputMessage = '';
      }
    },
  },
  sockets: {
    MESSAGE(data) {
      this.messages = [...this.messages, data];
    },
  },
};
</script>
