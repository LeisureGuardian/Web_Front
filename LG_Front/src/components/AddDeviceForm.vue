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
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="Organization"
            type="text"
            class="organizationInput"
            v-model="Organization"
            name="organization"
          />
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="8" sm="4" md="3" xl="2" class="center">
          <v-btn color="primary" type="submit">Input</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data () {
    return {
      error: null,
      SerialNumber: null,
      DeviceName: null,
      Organization: null
    }
  },
  methods: {
    inputDevice (e) {
      if (this.SerialNumber == null || this.DeviceName == null || this.Organization == null) {
        this.error = "Please input all of the form.";
        e.preventDefault();
      }
      else {
        console.log(this.SerialNumber)
        console.log(this.DeviceName)
        console.log(this.Organization)
        axios.post(`http://mmyu.synology.me:8000/device`, {
          deviceSerial: this.SerialNumber,
          deviceName: this.DeviceName,
          organization: this.Organization
        }, {
          headers: {
            'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYXNkYXNkQGFzZC5jb20iLCJleHBpcmVzIjoxNjIyNzk2Nzk2LjAzNTgwNjJ9._aTg38fpYNOTEF3KFGGYPGivRyiv1xwAukX_NYZwEP8",
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        }).then((res) => {
          console.log(res);

        }).catch((err) => {
          console.log(err)

        })
        e.preventDefault();
      }
    }
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
