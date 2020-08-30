<template>
  <div class="w-2/3 sm:w-3/4 flex flex-col">
    <div class="p-4 bg-gray-200 text-center">
      <span>{{ this.$store.state.chat.currentRoom.username }}</span>
    </div>
    <div class="flex flex-col flex-1 p-4">
      <div class="flex flex-col space-y-2 flex-1">
        <div v-for="(message, index) in filterMessages" :key="index">
          <div class="inline-block bg-blue-500 p-4 rounded-lg text-white" :class="messageClass(message)">
            <p>{{ message.content }}</p>
            <time class="text-xs text-gray-200" :datetime="message.datetime">{{
                message.datetime | relativeDatetime
              }}
            </time>
          </div>

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
          class="flex-1 border rounded-full appearance-none px-4 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
        />
        <div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      inputMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (!this.$store.state.auth.user) {
        this.$router.push({ name: 'Login' });
      }
      if (this.inputMessage !== '') {
        const newMessage = {
          content: this.inputMessage,
          datetime: new Date(),
          from: this.$store.state.auth.user._id,
          to: this.$store.state.chat.currentRoom._id,
        };

        this.$store.commit('chat/SOCKET_MESSAGE', newMessage);
        this.$socket.client.emit('SEND_MESSAGE', newMessage);
        this.inputMessage = '';
      }
    },
    messageClass(message) {
      return {
        'own-msg': message.from === this.$store.state.auth.user._id,
      };
    },
  },
  computed: {
    filterMessages() {
      return this.$store.state.chat.messages.filter((element) => ((element.from === this.$store.state.auth.user._id) && (element.to === this.$store.state.chat.currentRoom._id)) || (element.to === this.$store.state.auth.user._id && element.from === this.$store.state.chat.currentRoom._id));
    },
  },
  filters: {
    relativeDatetime: (date) => {
      if (!date) {
        return null;
      }

      return dayjs(date).fromNow(true);
    },
  },
  created() {
    dayjs.extend(relativeTime);
  },
};
</script>
<style>
.own-msg {
  @apply bg-gray-200 text-current !important;
  @apply float-right max-w-xl;
}

.own-msg > time {
  @apply text-gray-700 !important;
}
</style>
