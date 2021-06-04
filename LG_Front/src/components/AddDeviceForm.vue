<template>
    <div class="AddDeviceForm">
    <!-- <p class="Error">{{error}}</p>
    <v-form @submit="CheckForm" novalidate="true">
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="Serial Number" type="text" v-model="SerialNumber" name="serialnumber" class="serialnumberInput"/>
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="Device Name" type="text" class="devicenameInput" v-model="DeviceName" name="DeviceName"/>
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="Organization" type="text" class="organizationInput" v-model="Organization" name="organization"/>
        </v-col>
      </v-row>
      </v-form> -->
      </div>
</template>


<script>
// import axios from "axios";
export default {
  data() {
      return {
        error: null,
        SerialNumber: null,
        DeviceName: null,
        Organization: null
    }
  },
  methods: {
    // CheckForm(e) {
    //   if(this.SerialNumber == null || this.DeviceName == null || this.Organization == null) {
    //         this.error = "Please input all of the form.";
    //         e.preventDefault();
    //   }
    //   else {
    //     axios.post(`http://mmyu.synology.me:8000/device`, {
    //       deviceSerial: this.SerialNumber,
    //       deviceName: this.DeviceName,
    //       organization: this.Organization
    //     }).then((res) => {
    //       if(res.status === 200) {
    //           console.log(res);
    //         }
    //     }).catch((err) => {
    //       if(err.response.status === 422) {
    //         console.log(err)
    //       }
    //     })
    //   }
    // }
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
