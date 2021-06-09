<template>
  <div class="userContainer">
    <!-- <p id="user">User</p> -->

    <div id="addLoc">
      <!-- <form id="form" @submit.prevent="addNewDev">
        <v-text-field class="ml-2" label="lat" filled rounded v-model="lat" placeholder="Latitude" />

        <v-text-field
          class="ml-2"
          label="lng"
          filled
          rounded
          v-model="lng"
          placeholder="Longitude"
        />

        <v-btn id="addBtn" class="ml-2" type="submit" color="primary">Add</v-btn>
      </form>-->
      <!-- <template>
      <v-data-table
        :headers="information"
        :items="userList"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
      </template>-->
      <template>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="information" :items="userList" :search="search"></v-data-table>
        </v-card>
      </template>
    </div>

    <!-- <ul>
        <li v-for="(user, index) in userList" :key="user.devId">
          <v-btn
            fab
            small
            class="mt-3"
            id="rmBtn"
            color="error"
            style="float:right"
            @click="rmDev(index)"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <b>devID:</b>
          {{ user.devId }}
          <br />
          <b>Location:</b>
          lat {{user.Location.lat}}/lng {{user.Location.lng}}
        </li>
    </ul>-->
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
          text: "addedDate", align: "center", value: "addedDate"
        },
        {
          text: "deviceName", align: "center", value: "deviceName"
        },
        {
          text: "deviceSerial", align: "center", value: "deviceSerial"
        },
        {
          text: "organization", align: "center", value: "organization"
        }
      ],
      userList: [],
      nextDevId: 1,
      lat: null,
      lng: null,
      search: "",
      addedDate: null,
      deviceName: null,
      deviceSerial: null,
      organization: null,
      indexCount: null,
    };
  },
  created () {
    this.getDevice();


    // this.send(); // 서버로 부터 반복문을 통해 실시간 장치 정보를 받기 위한 테스트 함수


    // this.getDeviceData()
  },
  methods: {

    async send () { // async await 으로 비동기 처리
      for (var i = 0; i < 10; i++) {
        var res = await this.getDevPosTest(i);
        console.log(res);
      }

    },
    getDevPosTest (pos) {
      return new Promise(function (resolve, reject) {
        axios.get(`${ipObj.ip}/getDevData/${pos}`).then((res) => {
          if (res.status == 200) {
            resolve(res.data.position);
          }
        })
          .catch((err) => {
            reject(err);
          })
      });

    },

    getDevice () {
      axios.get(`${ipObj.ip}/device`,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.indexCount = res.data.data.length;
            for (let i = 0; i < this.indexCount; i++) {
              // this.addedDate = res.data.data[i].addedDate;
              // this.deviceName = res.data.data[i].deviceName;
              // this.deviceSerial = res.data.data[i].deviceSerial;
              // this.organization = res.data.data[i].organization;
              // this.pushUserDataInList()
            }
            this.userList = res.data.data;
            console.log(this.userList);
          }
        })
        .catch((err) => {
          console.log(err)
          alert("불러오기 중 오류");
        })
      this.getDeviceData()
    },

    // pushUserDataInList() {
    //    this.userList.push({
    //       addedDate: this.addedDate,
    //       deviceName: this.deviceName,
    //       deviceSerial: this.deviceSerial,
    //       organization : this.organization
    //     })
    // },
    getDeviceData () {
      axios.get(`${ipObj.ip}/deviceData`,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status == 200) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addNewDev () {
      this.userList.push({
        devId: this.nextDevId++,
        Location: {
          lat: Number(this.lat),
          lng: Number(this.lng)
        }
      })
      this.addDev();
      this.lat = null //입력값 초기화
      this.lng = null //입력값 초기화


    },
    addDev () {
      this.$emit("addDev", this.userList);
    },
    rmDev (index) {
      this.userList.splice(index, 1);
      this.$emit("rmDev", this.userList);
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
</style>