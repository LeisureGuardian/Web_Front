<template>
  <div class="SignUpForm">
    <p class="Error">{{error}}</p>
    <v-form @submit="CheckForm" novalidate="true">
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="name" type="text" v-model="name" name="name" class="NameInput" />
        </v-col>
      </v-row>
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input placeholder="Email" type="text" v-model="email" name="email" class="EmailInput" />
        </v-col>
      </v-row>
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="Organization"
            type="text"
            v-model="Organization"
            name="organization"
            class="EmailInput"
          />
        </v-col>
      </v-row>
      <v-row class="center">
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
      <v-row class="center">
        <v-col cols="10" sm="6" md="5" xl="3">
          <input
            placeholder="PW confirm"
            type="password"
            class="PasswordInput"
            v-model="PasswordConfirm"
            name="PasswordConfirm"
          />
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="8" sm="4" md="3" xl="2" class="center">
          <button type="submit" class="SignUpButton">SignUp</button>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>


<style scoped>
.EmailInput,
.PasswordInput,
.NameInput {
  outline: none;
  border: none;
  background-color: rgb(233, 233, 233);
  border-radius: 60px;
  height: 60px;
  width: 100%;
  padding-left: 1em;
}
.SignUpForm {
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

.SignUpButton {
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


<script>
import axios from "axios";
import ipObj from "../key.js"
export default {
  data () {
    return {
      error: null,
      name: null,
      email: null,
      Password: null,
      PasswordConfirm: null,
      token: null,
      Organization: null
    }
  },
  methods: {
    CheckForm (e) {
      if (this.Password !== this.PasswordConfirm) {
        this.error = "Please check your password again.";
        e.preventDefault();
      }
      else if (this.name == null || this.email == null || this.Password == null || this.PasswordConfirm == null) {
        this.error = "Please input all of the form.";
        e.preventDefault();
      }
      else {
        axios.post(`${ipObj.ip}/user/signup`, {
          organization: this.Organization,
          fullname: this.name,
          email: this.email,
          password: this.Password
        }).then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.token = res.data.access_token;
            /* 회원가입이 성공적으로 끝나면 바로 로그인 되도록 */
            sessionStorage.setItem("token", this.token);
            sessionStorage.setItem("isLogin", true);
          }
        }).catch((err) => {
          if (err.response.status === 422) {
            this.error = "이메일 형식을 맞춰주세요.";
          }
        })
      }
    }
  }
}
</script>
