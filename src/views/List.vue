<script setup>
import { useWorkAppStore } from "../store/workApp";
import { useRouter } from "vue-router";

const store = useWorkAppStore();
const router = useRouter();

const logout = () => {
  store.delUserId();
  router.push("/login");
};</script>

<template>
  <div class="page">
    <h1>List</h1>
    <router-link to="/today">Today</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<style lang="scss" scoped></style>
