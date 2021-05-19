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
import ipObj from "../key";
import axios from "axios";
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
        console.log(this.email, this.Password)
        axios
          .post(`${ipObj.ip}/user/login`, {
            "email": this.email,
            "password": this.Password,
          }, {
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json"
            }
          })
          .then((res) => {
            if (res.status === 200) {
              //const admin = res.data.admin;
              const token = res.data.token;
              if (token) {
                sessionStorage.setItem("token", token);
              }
              console.log(res);
              // sessionStorage.setItem("admin", admin);

              // if (admin) {
              //   this.setAdmin(true);
              // }
              sessionStorage.setItem("isLogin", true);
              this.setLogin(true); // 로그인 함수
              this.$router.push("/"); // 메인페이지로 이동
            }
          })
          .catch((err) => {
            console.log(err);
          });


        // sessionStorage.setItem("isLogin", true);
        // this.$router.push("/"); // 메인페이지로 이동
      }

      //입력이 아예 업는 경우
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