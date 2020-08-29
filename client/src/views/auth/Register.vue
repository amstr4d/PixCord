<template>
  <div class="h-screen flex items-center justify-center bg-gray-200">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm';

export default {
  name: 'Register',
  components: { RegisterForm },
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
