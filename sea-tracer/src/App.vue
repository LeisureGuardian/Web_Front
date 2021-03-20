<template>
  <div id="app">
    <div class="row">
      <div class="col-4">
        <sidebar></sidebar>
      </div>
      <div class="col-8">
        <google-map></google-map>
      </div>
    </div>
    <div class="row">
      <list-view></list-view>
    </div>
  </div>
</template>
<script>
// 참고 사이트
//http://daddynkidsmakers.blogspot.com/2020/01/google-map-vuejs.html

export default {
  name: "App",
  data () {
    return {

    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
