<template>
  <aside class="w-1/3 sm:w-1/4 bg-gray-200 flex flex-col">
    <div class="flex items-center px-8 py-4">
      <h1 class="text-lg font-semibold">PIXCORD</h1>
    </div>
    <nav class="flex flex-col justify-between px-4">
      <template v-for="room in rooms">
        <a @click.prevent="handleRoom(room)" :key="room._id" href="#" class="block w-full bg-white mb-4 px-4 py-2 border-transparent border-2 rounded hover:border-blue-500 focus:outline-none">{{ room.username }}</a>
      </template>
    </nav>

  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    handleRoom(room) {
      this.$store.commit('chat/changeCurrent', room);
    },
  },
  created() {
    fetch(`${process.env.VUE_APP_SERVER_HOST}/api/users/all`, {
      headers: {
        Authorization: `Bearer ${this.$store.state.auth.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((results) => {
        this.rooms = results;
        for (const room of this.rooms) {
          this.$socket.client.emit('SUBSCRIBE', room._id + '#' + this.$store.state.auth.user._id);
        }
      });
  },
};
</script>
