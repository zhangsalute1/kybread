import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue'; // 确保你有这个组件

import ArticleView from '../components/ArticleView.vue'; // 创建这个组件
import AdminLogin from '../components/AdminLogin.vue';
import GenerateCodes from '../components/GenerateCodes.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/article/:type/:year',
        name: 'Article',
        component: ArticleView,
        props: true,
    },
    {
        path: '/admin-login',
        name: 'AdminLogin',
        component: AdminLogin,
    },
    {
        path: '/generate-codes',
        name: 'GenerateCodes',
        component: GenerateCodes,
    },
    {
        path: '/article/:year/:type/:textNumber',
        name: 'ArticleView',
        component: () => import('../components/ArticleView.vue')
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
