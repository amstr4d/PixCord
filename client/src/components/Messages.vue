<template>
  <div class="w-2/3 sm:w-3/4 flex flex-col p-4">
    <div class="flex flex-col space-y-2 flex-1">
      <div v-for="(message, index) in messages" :key="index">
        <div class="inline-block bg-blue-500 p-4 rounded-lg text-white" :class="messageClass(message)">
          <p>{{ message.content }}</p>
          <time class="text-xs text-gray-200" :datetime="message.datetime">{{ message.datetime | relativeDatetime }}</time>
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
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default {
  name: 'Chat',
  data() {
    return {
      messages: [{ content: 'test', datetime: '2020-08-28T20:45:19.541Z', user: { id: 2, name: 'Test' } }],
      inputMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (!this.$store.state.user) {
        this.$router.push({ name: 'Home' });
      }
      if (this.inputMessage !== '') {
        this.$socket.emit('SEND_MESSAGE', {
          content: this.inputMessage,
          datetime: new Date(),
          user: {
            id: 1,
            name: this.$store.state.user,
          },
        });
        this.inputMessage = '';
      }
    },
    messageClass(message) {
      return {
        'own-msg': message.user.name === this.$store.state.user,
      };
    },
  },
  sockets: {
    MESSAGE(data) {
      this.messages = [...this.messages, data];
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
