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
    addDev (userList) {
      userList.forEach((user, i) => {
        const el = document.createElement("div");
        el.setAttribute("data-marker-index", i);

        const t = new CustomMarker(
          new this.google.maps.LatLng(user.Location.lat, user.Location.lng), el
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