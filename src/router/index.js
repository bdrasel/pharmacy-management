import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import LoginPage from "../views/Login.vue";
import DashboardPage from "../views/Dashboard.vue";
const Overview = () => import("../views/dashboard/Overview.vue");
const Drugs = () => import("../views/dashboard/Drugs.vue");
const Order = () => import("../views/dashboard/Order.vue");
const Supplier = () => import("../views/dashboard/Supplier.vue");
const Setting = () => import("../views/dashboard/Setting.vue");

const routes = [
  { path: "/", component: LoginPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    redirect: "/dashboard/overview",
    children: [
      { path: "overview", component: Overview },
      { path: "drugs", component: Drugs },
      { path: "order", component: Order },
      { path: "supplier", component: Supplier },
      { path: "setting", component: Setting },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
