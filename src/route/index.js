import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Signin from "@/views/Signin.vue";
import Today from "@/views/Today.vue";
import List from "@/views/List.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/signin", component: Signin },
  { path: "/today", component: Today },
  { path: "/list", component: List },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
