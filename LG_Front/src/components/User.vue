<template>
  <div class="userContainer">
    <p id="user">User</p>
    <v-btn class="primary mb-2" @click="markDev">refresh</v-btn>
    <v-btn class="error mb-2 ml-2" @click="rmDev">remove</v-btn>
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
    // let timerId = setInterval(() => this.getDeviceData(), 5000); 
    // setTimeout(() => { clearInterval(timerId); console.log("clearInterval") }, 10000); // 필요시 참고 
  },
  methods: {
    async send () { // async await 으로 비동기 처리
      for (var i = 0; i < 10; i++) {
        var res = await this.getDevPosTest(i);
        console.log(res);
      }
    },

    getDeviceData () {

      axios.get(`${ipObj.ip}/device`,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status == 200) {
            this.rmDev();
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
</style>