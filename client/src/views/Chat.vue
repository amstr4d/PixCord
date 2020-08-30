<template>
  <div class="h-screen flex">
    <Sidebar></Sidebar>
    <Messages v-if="displayMessages"></Messages>
  </div>
</template>

<script>
// @ is an alias to /src

import Sidebar from '@/components/Sidebar';
import Messages from '@/components/Messages';

export default {
  name: 'Chat',
  components: { Messages, Sidebar },
  computed: {
    displayMessages() {
      return this.$store.state.chat.current !== null;
    },
  },
  created () {
    this.$socket.client.open();
  }
};
</script>
