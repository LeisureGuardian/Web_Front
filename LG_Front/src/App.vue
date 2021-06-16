<template>
  <v-app>
    <v-main>
      <Header></Header>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import Main from './components/Main';
import Header from './components/Header'
export default {
  name: 'App',

  created () {
    this.$router.push({ name: 'Home' })
    // if (sessionStorage.getItem("isLogin") === "true") {
    //   this.$router.push({ name: 'Home' })
    // } else {
    //   this.$router.push({ name: 'Login' })
    // }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin;
    },
  },
  methods: {
  },
  components: {
    // Main,
    Header
  },

  data: () => ({
    //
  }),

};
</script>