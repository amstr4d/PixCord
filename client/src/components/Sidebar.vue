<template>
  <aside class="w-1/3 sm:w-1/4 bg-gray-200">
    <div v-for="room in rooms" :key="room._id">
      <span @click="handleRoom(room._id)">{{ room.username }}</span>
    </div>
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
    handleRoom(id) {
      this.$store.commit('chat/changeCurrent', id);
    },
  },
  created() {
    fetch(`${process.env.VUE_APP_SERVER_HOST}/api/users/all`)
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
