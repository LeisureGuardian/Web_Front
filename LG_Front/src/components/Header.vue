<template>
  <v-container>
    <div id="title"><router-link to ="/" class = "homeLink">Leisure Guardian</router-link></div>
    <div id="time">{{now}}</div>
    <div v-if="($route.name !== 'Login')&&($route.name !== 'SignUp')" class = "buttonWrapper">
      <v-btn class="primary mt-5 mr-5 addDev" @click="addDevice">addDevice</v-btn>
      <v-btn
        v-if="($route.name !== 'Login')&&($route.name !== 'SignUp')"
        class="error mt-5 logOut"
        @click="logout"
      >LogOut</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      now: null,

    };
  },
  created () {
    setInterval(() => { this.time() }, 1000);
  },
  methods: {
    logout () {
      sessionStorage.setItem("isLogin", false);
      sessionStorage.setItem("token", "");
      this.intervalClear()
      this.$router.push("/login");
    },
    intervalClear() {
      this.$store.commit('clearinter')
    },
    time () {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const hour = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
      const time = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
      const dateTime = date + ' ' + time;
      this.now = dateTime;
    },
    addDevice () {
      this.$router.push("/addDevice");
    }
  }
};

</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.buttonWrapper {
  transform: translate(40vw,-16vh)
}
#title {
  font-size: 50px;
}
.homeLink {
  color:black;
  text-decoration: none;
}
#time {
  font-size: 30px;
}
</style>