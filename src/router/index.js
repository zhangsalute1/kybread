import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue'; // 确保你有这个组件

// 你将需要为文章创建一个组件
import ArticleView from '../components/ArticleView.vue'; // 创建这个组件

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
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
