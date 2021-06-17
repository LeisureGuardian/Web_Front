<template>
  <div class="userContainer">
    <p id="user">User</p>
    <v-btn class="primary mb-1" @click="markDev">reflash</v-btn>
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
          text: "deviceName", align: "center", value: "devName"
        },
        {
          text: "lat", align: "center", value: "lat"
        },
        {
          text: "lng", align: "center", value: "lng"
        }

      ],
      devs: [
        //Dummy devs
        {
          devName: 1,
          lat: "35",
          lng: "125"
        },
        {
          devName: 2,
          lat: "32",
          lng: "124"
        },
        {
          devName: 3,
          lat: "34",
          lng: "123"
        },
        {
          devName: 4,
          lat: "36",
          lng: "125"
        },
        {
          devName: 5,
          lat: "35",
          lng: "126"
        },
      ],
      userList: [],
      nextDevId: 1,
      lat: 35,
      lng: 123,
      search: "",
      addedDate: null,
      deviceName: null,
      deviceSerial: null,
      organization: null,
      indexCount: null,
      count: 1
    };
  },
  created () {
    // this.send(); // 서버로 부터 반복문을 통해 실시간 장치 정보를 받기 위한 테스트 함수

    // let timerId = setInterval(() => this.getDeviceData(), 2000);
    // setTimeout(() => { clearInterval(timerId); console.log("clearInterval") }, 10000);
  },
  methods: {
    async send () { // async await 으로 비동기 처리
      for (var i = 0; i < 10; i++) {
        var res = await this.getDevPosTest(i);
        console.log(res);
      }
    },

    // Test Code 
    // getDevPosTest (pos) {
    //   return new Promise(function (resolve, reject) {
    //     axios.get(`${ipObj.ip}/getDevData/${pos}`).then((res) => {
    //       if (res.status == 200) {
    //         resolve(res.data.position);
    //       }
    //     })
    //       .catch((err) => {
    //         reject(err);
    //       })
    //   });

    // },

    getDeviceData () {

      axios.get(`${ipObj.ip}/device`,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status == 200) {
            //기존 정보 지우는 코드
            console.log(this.count++, res.data);
            // this.devs = res.data;
            // this.markDev();
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    markDev () {
      this.$emit("addDev", this.devs);
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