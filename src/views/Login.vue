<script setup>
import { ref } from "vue";
import { railsAxios } from "../common/axiosBais";
import { useWorkAppStore } from "../store/workApp";
import { useRouter } from 'vue-router'

const mail = ref("");

const store = useWorkAppStore();
const router = useRouter();

const loginSubmit = () => {
  const RESOURCE = "/user?mail=" + mail.value;
  railsAxios
    .get(RESOURCE)
    .then((res) => {
      store.setUserId(res.data.user_id);
      router.push({ path: "/today" });
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
