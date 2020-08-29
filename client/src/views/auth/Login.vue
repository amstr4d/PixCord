<template>
  <div class="h-screen flex items-center justify-center bg-gray-200">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm';

export default {
  name: 'Login',
  components: { LoginForm },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/chat');
    }
  },
};
</script>
