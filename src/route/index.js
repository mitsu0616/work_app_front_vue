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
  // 中でstoreを定義する必要がある(外で定義すると以下のエラーが出る)
  // Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
  const store = useWorkAppStore();

  // 既にログイン済みであればログインページにはいかない
  if(to.path == "/login" && store.user_id) {
    return next("/today")
  }
  
  // 未ログインの場合はログインページに飛ばす
  if (to.matched.some((page) => page.meta.requireAuth) && !store.user_id) {
    return next("/login");
  } else {
    return next();
  }
});

export default router;
