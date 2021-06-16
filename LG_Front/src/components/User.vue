<template>
  <div class="userContainer">
    <div id="addLoc">
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
          text:"batteryLevel", align:"center", value: "batteryLevel"
        },

        {
          text:"critical", align:"center", value: "critical"
        },
        {
          text:"button", align:"center", value:"button"
        }
      ],
      userList: [],
      nextDevId: 1,
      lat: null,
      lng: null,
      search: "",
      check:1,
      // addedDate: null,
      // deviceName: null,
      // deviceSerial: null,
      // organization: null,
      // indexCount: null,
    };
  },
  created () {

    // this.getDevice()
    this.getDeviceData()



    // this.getDevice();


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
          // this.userList = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err)
        alert("데이터 불러오기 중 오류");
      })
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
          this.userList = res.data.data;
          console.log("확인 : " + res.data.data);
          console.log("통신완료" + this.check);
          this.check++;
          // console.log("this.userList : " + res.data.data);
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