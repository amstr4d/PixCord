<template>
  <div class="container w-full max-w-md xl:max-w-3xl">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="text-center mb-4">
        <h1 class="text-2xl font-bold">Create an account</h1>
        <div>
        <span class="text-gray-600 text-sm">
          Already have an account?
        </span>
          <router-link :to="{name: 'Login'}" class="text-gray-700 text-sm font-semibold">Login</router-link>
        </div>
      </div>
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
          <validation-provider v-slot="{ errors }" rules="required">
            <div class="form-control">
              <label for="username">Username</label>
              <input type="text" name="username" id="username" placeholder="Username" v-model="user.username">
              <p class="ml-4 text-red-500 text-xs italic">{{ errors[0] }}</p>
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }" rules="required|email">
            <div class="form-control">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" v-model="user.email">
              <p class="ml-4 text-red-500 text-xs italic">{{ errors[0] }}</p>
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }" rules="required">
            <div class="form-control">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" v-model="user.password">
              <p class="ml-4 text-red-500 text-xs italic">{{ errors[0] }}</p>
            </div>
          </validation-provider>
          <div class="flex">
            <button type="submit"
                    class="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
                    :disabled="loading">Register
            </button>
          </div>
        </form>
      </validation-observer>
    </div>

  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import User from '@/models/User';

export default {
  name: 'RegisterForm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: new User('', '', ''),
      loading: false,
    };
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.$store.dispatch('auth/register', this.user).then(
        () => {
          this.$router.push('/chat');
        },
      );
    },
  },
};
</script>

<style scoped>
.form-control {
  @apply mb-4;
}

.form-control > label {
  @apply block mb-2 ml-4 text-gray-700;
}

.form-control > input {
  @apply w-full border rounded-full appearance-none px-4 py-2 transition-all duration-300 ease-in-out;
}

.form-control > input:focus {
  @apply outline-none border-blue-500;
}
</style>
