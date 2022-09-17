import { createRouter, createWebHistory } from "vue-router";

import { AuthStore } from "../stores/AuthStore";

const middleware = (to, from, next) => {
  const auth = AuthStore();
  if (!auth.status) {
    if (to.name == "login" || to.name == "register") return next();

    return next("/login");
  } else {
    if (to.name == "login" || to.name == "register") return next("/");

    return next();
  }
};

const load = (component) => () => import(`../views/${component}`);

const routes = [
  {
    path: "/",
    name: "home",
    component: load("HomeView"),
  },
  {
    path: "/login",
    name: "login",
    component: load("LoginView"),
  },
  {
    path: "/register",
    name: "register",
    component: load("RegisterView.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: load("TodoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(middleware);

export default router;
