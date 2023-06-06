<script setup>
import { ref } from "vue";
import { useWorkAppStore } from "../store/workApp";
import { railsAxios } from "../common/axiosBais";
import { useRouter } from "vue-router";
import { getToday, formatTime } from "../common/dayUtil";

const store = useWorkAppStore();
const router = useRouter();

// 仮
const inputDate = ref(null);
const inputTime = ref(null);

const logout = () => {
  store.delUserId();
  router.push("/login");
};

const getTodayWorkHour = () => {
  const RESOURCE = `/work_hour?user_id=${store.user_id}&date=${getToday()}`;
  railsAxios
    .get(RESOURCE)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createWorkHour = () => {
  const RESOURCE = `/work_hours`;
  const body = {
    user_id: store.user_id,
    date: inputDate.value,
    start_time: `${inputDate.value} ${inputTime.value}`
  };
  railsAxios
    .post(RESOURCE, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateWorkHour = () => {
  const RESOURCE = `/work_hours`;
  const body = {
    user_id: store.user_id,
    date: inputDate.value,
    end_time: `${inputDate.value} ${inputTime.value}`
  };
  railsAxios
    .put(RESOURCE, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="page">
    <h1>Today</h1>
    <h2>{{ getToday() }}</h2>
    <router-link to="/list">List</router-link>
    <h2>仮入力欄</h2>
    <div>
      <label>日付</label>
      <input type="date" v-model="inputDate" id="inputDate" name="inputDate"/>
    </div>
    <div>
      <label>時刻</label>
      <input type="time" v-model="inputTime" id="inputTime" name="inputTime"/>
    </div>
    <div>
      <button @click="createWorkHour('start_time')">出勤</button>
      <button @click="updateWorkHour('end_time')">退勤</button>
    </div>
    <div>
      <button @click="getTodayWorkHour">Logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
