<template>
  <div class="AddDeviceForm">
    <p class="Error">{{error}}</p>
    <v-form @submit="inputDevice" novalidate="true">
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="Serial Number"
            type="text"
            v-model="SerialNumber"
            name="serialnumber"
            class="serialnumberInput"
          />
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="Device Name"
            type="text"
            class="devicenameInput"
            v-model="DeviceName"
            name="DeviceName"
          />
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <v-btn color="primary" type="submit">Input</v-btn>
      </v-row>
    </v-form>
  </div>
</template>


<script>
import axios from "axios";
import ipObj from "../key.js"

export default {
  data () {
    return {
      error: null,
      SerialNumber: "",
      DeviceName: "",
    }
  },
  methods: {
    intervalClear() {
      this.$store.commit('clearinter')
    },
    inputDevice (e) {
      if (this.SerialNumber == "" || this.DeviceName == "") {
        this.error = "아래의 모든 폼을 입력해주세요.";
        e.preventDefault();
      }
      else {
        console.log(this.SerialNumber)
        console.log(this.DeviceName)
        axios.post(`${ipObj.ip}/device`, {
          deviceSerial: this.SerialNumber,
          deviceName: this.DeviceName,
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then((res) => {
          console.log(res);
          this.$router.push("/");

        }).catch((err) => {
          if(err.response.status == 400)
          alert("중복된 기기 등록입니다.");
        })
        e.preventDefault();
      }
    }
  },

  created() {
    this.intervalClear();
  }
}
</script>


<style scoped>
.serialnumberInput,
.devicenameInput,
.organizationInput {
  outline: none;
  border: none;
  background-color: rgb(233, 233, 233);
  border-radius: 60px;
  height: 60px;
  width: 100%;
  padding-left: 1em;
}
.AddDeviceForm {
  margin: 0.3em;
}
.text {
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.center {
  margin: 0 auto;
  justify-content: center;
}
.Error {
  text-align: center;
  color: red;
}
</style>
