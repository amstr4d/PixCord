<template>
  <div>
    <h1>Choose your name</h1>
    <form @submit.prevent="handleUsernameSelection">
      <input type="text" v-model="username">
      <button type="submit">GO</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: '',
    };
  },
  methods: {
    handleUsernameSelection() {
      this.$store.commit('setUsername', this.username);
      this.$router.push('Chat');
    },
  },
};
</script>
