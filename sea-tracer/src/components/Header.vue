<template>
  <div>
    <p>Leisure Guardian</p>

    <p id="time">{{now}}</p>
  </div>
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
    time () {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const hour = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
      const time = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
      const dateTime = date + ' ' + time;
      this.now = dateTime;
    }
  }
};

</script>
<style scoped>
p {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
#time {
  height: 10px;
  font-size: 30px;
}
</style>