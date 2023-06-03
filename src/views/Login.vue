<script setup>
import { ref } from "vue";
import { railsAxios } from "../common/axiosBais";

const mail = ref("");

const loginSubmit = () => {
  const RESOURCE = "/user?mail=" + mail.value;
  railsAxios
    .get(RESOURCE)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      alert(`${mail.value} に該当するユーザーはいません`);
      console.log(err);
    });
};
</script>

<template>
  <div class="page">
    <h1>Login</h1>
    <div class="login-form">
      <div class="input_box">
        <label>メールアドレス</label>
        <input v-model="mail" type="text" name="mail" id="mail" />
      </div>
      <div class="btn_box">
        <button @click="loginSubmit">Login</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
