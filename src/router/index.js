import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import LoginPage from "../views/Login.vue";
import DashboardPage from "../views/Dashboard.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/dashboard", component: DashboardPage },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
