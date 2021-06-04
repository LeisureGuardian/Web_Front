<template>
  <v-container>
    <v-btn class="error mt-5" @click="addDevice">addDevice</v-btn>
    <div id="title">Leisure Guardian</div>
    <div id="time">{{now}}</div>
    <v-btn
      v-if="($route.name !== 'Login')&&($route.name !== 'SignUp')"
      class="error mt-5"
      @click="logout"
    >LogOut</v-btn>
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
      this.$router.push("/login");
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
}
#title {
  font-size: 50px;
}
#time {
  font-size: 30px;
}
</style>