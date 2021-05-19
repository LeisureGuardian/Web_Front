<template>
  <v-container id="signUpPage">
    <SignUpForm></SignUpForm>
  </v-container>
</template>

<script>
import SignUpForm from "../components/SignUpForm";
export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
};
</script>

<style scoped>
</style>