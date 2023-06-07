<script setup>
import { onMounted, ref, watch } from "vue";
import { useWorkAppStore } from "../store/workApp";
import { railsAxios } from "../common/axiosBais";
import { useRouter } from "vue-router";
import { getToday, getDateAndTime } from "../common/dayUtil";

const store = useWorkAppStore();
const router = useRouter();

// 仮
const targetDate = ref(null);
const inputStartDate = ref(null);
const inputStartTime = ref(null);
const inputEndDate = ref(null);
const inputEndTime = ref(null);

const logout = () => {
  store.delUserId();
  router.push("/login");
};

/**
 * 指定した日付の勤怠記録を取得
 */
const getTodayWorkHour = () => {
  const RESOURCE = `/work_hour?user_id=${store.user_id}&date=${targetDate.value}`;
  railsAxios
    .get(RESOURCE)
    .then((res) => {
      inputStartDate.value = null;
      inputStartTime.value = null;
      inputEndDate.value = null;
      inputEndTime.value = null;
      if (res.data) {
        console.log(res.data);
        // 出勤時間
        if (res.data.start_time) {
          const { date, time } = getDateAndTime(res.data.start_time);
          inputStartDate.value = date;
          inputStartTime.value = time;
        }
        // 退勤時間
        if (res.data.end_time) {
          const { date, time } = getDateAndTime(res.data.end_time);
          inputEndDate.value = date;
          inputEndTime.value = time;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const createWorkHour = () => {
  const RESOURCE = `/work_hours`;
  const body = {
    user_id: store.user_id,
    date: inputStartDate.value,
    start_time: `${inputStartDate.value} ${inputStartTime.value}`,
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
    date: inputEndDate.value,
    end_time: `${inputEndDate.value} ${inputEndTime.value}`,
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

onMounted(() => {
  targetDate.value = getToday();
});

watch(targetDate, () => {
  getTodayWorkHour();
});
</script>

<template>
  <div class="page">
    <h1>勤怠登録画面</h1>
    <h2>日付</h2>
    <p>勤怠登録する日付を入力してください</p>
    <input type="date" v-model="targetDate" id="targetDate" name="targetDate" />
    <h2>出退勤</h2>
    <p>日時を入力し[出勤]/[退勤]で登録してください</p>
    <div class="time-box">
      <button class="btn" @click="createWorkHour('start_time')">出勤</button>
      <input
        type="date"
        v-model="inputStartDate"
        id="inputStartDate"
        name="inputStartDate"
      />
      <input
        type="time"
        v-model="inputStartTime"
        id="inputStartTime"
        name="inputStartTime"
      />
    </div>
    <div class="time-box">
      <button class="btn" @click="updateWorkHour('end_time')">退勤</button>
      <input
        type="date"
        v-model="inputEndDate"
        id="inputEndDate"
        name="inputEndDate"
      />
      <input
        type="time"
        v-model="inputEndTime"
        id="inputEndTime"
        name="inputEndTime"
      />
    </div>
    <div class="btm-menu">
      <router-link class="btm-menu-link" to="/list">List</router-link>
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
  .time-box {
    padding: 10px;
    .btn {
      font-size: 16px;
      margin: 10px 20px;
      padding: 10px 20px;
      border-radius: 10px;

      &:hover {
        background-color: #ff7979;
      }

      &:active {
        background-color: #eb4d4b;
      }
    }
  }
  .btm-menu {
    margin: 20px;
    .btm-menu-link, .btm-menu-item {
      padding: 10px;
    }
  }
}
</style>
