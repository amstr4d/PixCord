<template>
  <div>
    <p>Le chat</p>

    <div v-for="message in messages">
      <p>{{ message.content }}</p>
    </div>

    <div>
      <input type="text" name="message" id="message" v-model="inputMessage">
      <button @click.prevent="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Chat',
  data() {
    return {
      socket: io('localhost:3000'),
      messages: [],
      inputMessage: ''
    }
  },
  methods: {
    sendMessage() {
      this.socket.emit('SEND_MESSAGE', {
        content: this.inputMessage
      });
      this.inputMessage = ''
    }
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    });
  }
}
</script>

<style scoped>

</style>
