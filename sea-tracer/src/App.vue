<template>
  <v-app>
    <v-main>
      <Header />
      <Main />
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';
import Header from './components/Header'
export default {
  name: 'App',

  components: {
    Main,
    Header
  },

  data: () => ({
    //
  }),
};
</script>