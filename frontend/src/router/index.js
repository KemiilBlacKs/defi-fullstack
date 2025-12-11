import { createRouter, createWebHistory } from "vue-router";
import DashboardStats from "../views/DashboardStats.vue";
import RouteCalculator from "../views/RouteCalculator.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: RouteCalculator,
        },
        {
            path: "/stats",
            name: "stats",
            component: DashboardStats,
        },
    ],
});
export default router;
