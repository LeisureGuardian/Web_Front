<template>
  <v-container>
    <User class="item" @addDev="addDev" @rmDev="rmDev" />

    <GmapMap
      ref="mapRef"
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
import initCustomMarker from "./custom-marker"
import { gmapApi as google } from "vue2-google-maps";
let CustomMarker;
export default {
  data () {
    return {
      markers: [],
      CustomMarker: null,
      center:null, // {lat:0022211.212, lng:4547,9465}
    };
  },
  computed: {
    google
  },
  watch: {
    google (val) {
      CustomMarker = initCustomMarker(val);
    }
  },
  created () {
  },
  methods: {
    rmDev (userList) {
      this.markers.map((marker) => {
        marker.onRemove();
      });//다 지우고 
      this.markers = [];
      this.addDev(userList);//새로 초기화
    },
    addDev (devs) {
      devs.forEach((dev, i) => {
        console.log(dev.devName);
        const el = document.createElement("div");
        el.setAttribute("data-marker-index", i);
        const t = new CustomMarker(
          new this.google.maps.LatLng(dev.lat, dev.lng), el
        );
        this.$refs["mapRef"].$mapPromise.then((map) => {
          t.setMap(map);
        });
        this.markers.push(t);
      })
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
  justify-content: space-between;
}
.item {
  width: 50%;
}
</style>

<style lang = "scss">
  .custom-marker {
    position:absolute;
    top:0;
    left:0;
    transform:translate(-50%, -100%);
    background-color:white;
    padding: 0 8px;
    border-radius:28px;
    box-shadow:rgb(0,0,0,0.8) 0px 0px 0px 1px,
    rgba(0,0,0,0.18) 0px 1px 2px;
    color:#222;
    overflow-y:auto;
    height:28px;
    line-height:28px;
    font-weight: bold;
    cursor:pointer;
    transition:transform 0.15s ease-in-out;
    font-size:14px;
  }
  .custom-marker:hover {
    transform:translate(-50%, -100%) scale(1.2);
  }
  .custom-marker-anchor {
    position:absolute;
    width:100%;
    bottom:8px;
    left:0
  }
</style>