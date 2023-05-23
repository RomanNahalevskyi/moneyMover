import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/TheHome.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        alias: '/home'
    },
    {
        path: '/currency-rates',
        name: 'CurrencyRates',
        component: () => import('@/pages/TheCurrencyRates.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
