<template>
  <v-container id="loginPage">
    <LoginForm></LoginForm>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
</style>