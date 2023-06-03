import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Signin from "@/views/Signin.vue";
import Today from "@/views/Today.vue";
import List from "@/views/List.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/signin", component: Signin },
  {
    path: "/today",
    component: Today,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/list",
    component: List,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { useWorkAppStore } from "../store/workApp";

router.beforeEach((to, from, next) => {
  const store = useWorkAppStore();
  console.log(store.user_id);

  if (to.matched.some((page) => page.meta.requireAuth) && !store.user_id) {
    next("/login");
  } else {
    next();
  }
});

export default router;
