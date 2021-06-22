<template>
  <div class="userContainer">
    <div id="addLoc">
      <template>
        <v-card>
          <v-card-title class = 'vCardTitle'>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="information" :items="devs" :search="search"></v-data-table>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ipObj from "../key.js"
export default {
  data () {
    return {
      information: [
        {
          text:"deviceName", align:"center", value: "deviceName"
        },
        {
          text:"temp", align:"center", value: "temp"
        },
        {
          text:"heartRate", align:"center", value: "heartRate"
        },
        {
          text:"accelMax", align:"center", value:"accelMax"
        },
        {
          text:"batteryLevel", align:"center", value: "batteryLevel"
        },
        {
          text:"critical", align:"center", value: "critical"
        },
        {
          text:"button", align:"center", value:"button"
        },
      ],
      devs: [],
      search: "",
      ob_devicename: null,
      ob_temp: null,
      ob_heartRate: null,
      ob_batteryLevel: null,
      ob_accelMax: null,
      ob_critical: null,
      ob_button: null,
      ob_lat: null,
      ob_lng: null,
      // count: 1
    };
  },
  created () {
    this.$store.state.inter = setInterval(() => this.getDeviceData(), 5000);
  },

  methods: {
    getDeviceData () {
      axios.get(`${ipObj.ip}/deviceData`,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status == 200) {
            this.rmDev(); //초기화 함수 
            for(let i = 0; i<res.data.data.length; i++) {
              if(res.data.data[i].button == 0) {
                this.ob_button = "정상"
              }
              else if(res.data.data[i].button == 1) {
                this.ob_button = "위험"
              }
              this.ob_devicename = res.data.data[i].deviceName;
              this.ob_temp = res.data.data[i].temp
              this.ob_heartRate = res.data.data[i].heartRate;
              this.ob_batteryLevel = res.data.data[i].batteryLevel;
              this.ob_accelMax = res.data.data[i].accelMax;
              this.ob_lat = res.data.data[i].latitude;
              this.ob_lng = res.data.data[i].longitude;

              if(res.data.data[i].critical == 0) {
                this.ob_critical = "정상"
              }
              if(res.data.data[i].critical == 1) {
                this.ob_critical = "꺼짐"
              }
              if(res.data.data[i].critical == 2) {
                this.ob_critical = "위험"
              }
              if(res.data.data[i].critical == 3) {
                this.ob_critical = "연결끊김"
              }
              this.devs.push({deviceName: this.ob_devicename, temp: this.ob_temp, accelMax:this.ob_accelMax, 
              heartRate: this.ob_heartRate, batteryLevel: this.ob_batteryLevel, critical: this.ob_critical, 
              button: this.ob_button, latitude: this.ob_lat, longitude:this.ob_lng})
            }
            this.markDev();
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    markDev () {
      this.$emit("addDev", this.devs);
    },

    rmDev () {
      this.devs = []
      this.$emit("rmDev");
    }
  }
};

</script>
<style scoped>
.userContainer {
  padding: 10px;
}
#user {
  font-size: 50px;
  text-align: center;
}
ul {
  list-style: none;
  margin-left: -40px;
  margin-right: 20px;
}
li {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}
b {
  font-size: 20px;
}

#addBtn {
  margin-top: 10px;
}

#form {
  display: flex;
  width: 400px;
  justify-content: center;
}

#addLoc {
  display: flex;
  justify-content: center;
}
.vCardTitle {
  position:relative;
  padding-top:0;
  padding-right:2%;
  padding-left:2%;
}
</style>