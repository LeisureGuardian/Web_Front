<template>
  <v-container>
    <GmapMap
      :center="{ lat: 36.14557919088093,
          lng: 128.39311591970852}"
      :zoom="8"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="clickMarker"
      />
    </GmapMap>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      markers: [{
        position: {
          lat: 36.14557919088093,
          lng: 128.39311591970852
        }
      }]
    };
  },
  methods: {
    clickMarker: function () {
      this.$dialog.confirm({
        text: "What's your name? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Natgeologo.svg/1200px-Natgeologo.svg.png' height=100/><input value='input'></input>", title: 'Warning'
      });
    }
  }
};

</script>