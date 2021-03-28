<template>
  <v-container>
    <User class="item" @addDev="addDev" @rmUser="rmUser" />
    <GmapMap
      class="item"
      :center="{ lat: 36.14557919088093,
          lng: 128.39311591970852}"
      :zoom="8"
      style="width: 50%; height: 700px;  "
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </v-container>
</template>

<script>
import User from './User'
export default {

  data () {
    return {
      markers: []
    };
  },
  created () {
    console.log(this.markers);
  },
  methods: {
    clickMarker: function () {
      this.$dialog.confirm({
        text: "What's your name? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Natgeologo.svg/1200px-Natgeologo.svg.png' height=100/><input value='input'></input>", title: 'Warning'
      });
    },
    addDev (userList) {
      userList.forEach(user => {
        const lat = user.Location.lat;
        const lng = user.Location.lng;

        this.markers.push({
          position: {
            lat: lat,
            lng: lng
          }
        })
      })
    },
    rmUser (index) {
      console.log(index);
      console.log(this.markers)
      this.markers.splice(index, 1);
      console.log(this.markers)
    }
  },
  components: {
    User
  },
};

</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.item {
  width: 50%;
}
</style>