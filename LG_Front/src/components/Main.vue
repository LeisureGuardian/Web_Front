<template>
  <v-container class = "wrapper">
    <User class="item" @addDev="addDev" @rmDev="rmDev" /> 
    <GmapMap
      ref="mapRef"
      class="item"
      :center="{ lat: 36.145579190,
          lng: 128.39311591970852}"
      :zoom="5"
      style="width: 50%; height: 700px;  "
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="'undefined'"
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
    rmDev () {
      this.markers.map((marker) => {
        marker.onRemove();
      });
      this.markers = [];
    },
    addDev (devs) {
      devs.forEach((dev, i) => {
        const el = document.createElement("div");
        el.textContent = dev.deviceName;
        el.setAttribute("data-marker-index", i);
        if(dev.critical == "꺼짐") {
          el.style.background = "#c8c8c8";
          el.style.color = "black";
        }
        /* 위험 */
        else if(dev.critical == "위험" || dev.button == "위험") {
          el.style.background = "red";
          el.style.color = "white";
          el.style.fontWeight = "bold";
        }
        /* 연결 끊김 */
        else if(dev.critical == "연결끊김") {
          el.style.background="yellow";
          el.style.color="red";
          el.style.fontWeight="bold";
        }
        else {
          el.style.background="white";
          el.style.color="black";
        }
        const t = new CustomMarker(
          new this.google.maps.LatLng(dev.latitude, dev.longitude), el
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
  padding:0;
}
.wrapper:not(.container) {
  position:relative;
  display:flex;
  justify-content: center;
  align-items:center;
  width:100%;
  height:100;
  margin:0;
  padding:10px;
}
.item {
  width: 50%;
  padding:0;
  margin:0;
}
</style>

<style lang="scss">
.custom-marker {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  background-color: white;
  padding: 0 8px;
  border-radius: 28px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.18) 0px 1px 2px;
  color: #222;
  overflow-y: auto;
  height: 28px;
  line-height: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;
  font-size: 14px;
}
.custom-marker:hover {
  transform: translate(-50%, -100%) scale(1.2);
}
.custom-marker-anchor {
  position: absolute;
  width: 100%;
  bottom: 8px;
  left: 0;
}
.custom-marker-container {
  cursor: auto;
  height: 0;
  position: absolute;
  width: 200px;
  &.active {
    .custom-marker {
      z-index: 1000;
      background-color: #f7530e;
      color: #fff;
      transform: translate(-50%, -100%) scale(1.1);
    }
  }
}
</style>
