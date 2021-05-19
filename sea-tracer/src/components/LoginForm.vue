<template>
  <div class="LoginForm">
    <p class="Error">{{error}}</p>
    <v-form @submit="CheckForm" novalidate="true">
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="Email" type="text" v-model="email" name="email" class="EmailInput" />
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="PW"
            type="password"
            class="PasswordInput"
            v-model="Password"
            name="Password"
          />
        </v-col>
      </v-row>
      <v-row class="mt-5 center">
        <router-link to='/signUp'>SignUp</router-link>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="8" sm="4" md="3" xl="2" class="center">
          <button type="submit" class="LoginButton">LogIn</button>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>

import { mapMutations } from "vuex";
import axios from "axios"
// import API from "../api"
export default {
  name: "LoginForm",
  data () {
    return {
      error: null,
      email: null,
      Password: null,
    };
  },
  methods: {
    CheckForm (e) {
      if (this.Password && this.email) {
        axios.post(`http://mmyu.synology.me:8000/user/login`,
         {
        email: this.email,
        password: this.Password
      }).then((res)=> {
        if(res.status == 200) {
          console.log(res.data);
          sessionStorage.setItem("isLogin", true);
          this.$router.push("/"); // 메인페이지로 이동
        }
      })
      .catch((err) => {
        console.log(err)
      })
      
        // this.axios
        //   .post(`${ipObj.ip}/api/log/in`, {
        //     _id: this.StudentNumber,
        //     pw: this.Password,
        //   })
        //   .then((res) => {
        //     if (res.status === 200) {
        //       const admin = res.data.admin;
        //       const token = res.data.token;
        //       sessionStorage.setItem("admin", admin);
        //       sessionStorage.setItem("token", token);
        //       if (admin) {
        //         this.setAdmin(true);
        //       }
        //       this.setLogin(true); // 로그인 함수
        //       this.$router.push("/"); // 메인페이지로 이동
        //     }
        //   })
        //   .catch((err) => {
        //     if (err.response.status === 400) {
        //       this.error = "아이디 혹은 비밀번호가 일치 하지 않습니다.";
        //     } else if (err.response.status === 500) {
        //       this.error = "통신에 문제가 생겼습니다. 다시 시도해주세요.";
        //     }
        //   });
        
      }

      //입력이 아예 없는 경우
      if (!this.Password || !this.email) {
        this.error = "아이디 및 비밀번호 입력을 확인해주세요";
      }
      e.preventDefault();
    },
    ...mapMutations(["setLogin"]),
  },
};
</script>
<style scoped>
.EmailInput,
.PasswordInput {
  outline: none;
  border: none;
  background-color: rgb(233, 233, 233);
  border-radius: 60px;
  height: 60px;
  width: 100%;
  padding-left: 1em;
}
.LoginForm {
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

.LoginButton {
  outline: none;
  border-radius: 60px;
  border: none;
  background-color: #2a404e;
  width: 100%;
  height: 60px;
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.Error {
  text-align: center;
  color: red;
}
</style>