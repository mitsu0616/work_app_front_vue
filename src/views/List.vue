<script setup>
import { reactive, ref, watch } from "vue";
import { useWorkAppStore } from "../store/workApp";
import { useRouter } from "vue-router";
import { railsAxios } from "../common/axiosBais";
import { getDateList } from "../common/dayUtil";

const store = useWorkAppStore();
const router = useRouter();

// 仮
const targetMonth = ref(null);
const list = ref([]);

/**
 * 指定した月の勤怠記録を取得
 */
const getTargetMonthWorkHours = async () => {
  let workData = [];

  const RESOURCE = `work_hours/list?user_id=${store.user_id}&date=${targetMonth.value}-01`;
  await railsAxios
    .get(RESOURCE)
    .then((res) => {
      workData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const year = Number(targetMonth.value.split("-")[0]);
  const month = Number(targetMonth.value.split("-")[1]);
  list.value = getDateList(year, month, workData);
  console.log(list.value);
};

const logout = () => {
  store.delUserId();
  router.push("/login");
};

watch(targetMonth, async () => {
  getTargetMonthWorkHours();
});
</script>

<template>
  <div class="page">
    <h1>一覧表示画面</h1>
    <h2>日付</h2>
    <p>一覧確認する年月を入力してください</p>
    <input
      type="month"
      v-model="targetMonth"
      id="targetMonth"
      name="targetMonth"
    />
    <div class="time-list">
      <table>
        <thead>
          <th>日</th>
          <th>曜日</th>
          <th>出勤</th>
          <th>退勤</th>
        </thead>
        <tbody>
          <tr v-for="(val, i) in list" :key="i">
            <td>{{ val.date }}</td>
            <td>{{ val.day }}</td>
            <td>{{ val.start_time }}</td>
            <td>{{ val.end_time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btm-menu">
      <router-link class="btm-menu-link" to="/today">Today</router-link>
      <button class="btm-menu-item" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 80%;
  min-width: 500px;
  margin: auto;
  h2 {
    font-size: 24px;
    margin: 10px;
  }
  p {
    margin: 0px 40px;
  }
  input {
    font-size: 16px;
    margin: 10px 20px;
    padding: 10px;
  }
  table {
    width: 80%;
    margin: 0 auto;
    tr {
      td {
        border: 1px solid #ddd;
        &:nth-child(1), &:nth-child(2){
          width: 10%;
          text-align: center;
        }
        &:nth-child(3), &:nth-child(4){
          width: 40%;
          text-align: center;
        }
      }
    }
  }
  .btm-menu {
    margin: 20px;
    .btm-menu-link,
    .btm-menu-item {
      padding: 10px;
    }
  }
}
</style>
