import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';

import ArticleView from '../components/ArticleView.vue';

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
        meta: { requiresAuth: true }  // 添加这行以确保需要验证
    },

    {
        path: '/article/:year/:type/:textNumber',
        name: 'ArticleView',
        component: () => import('../components/ArticleView.vue'),
        meta: { requiresAuth: true }  // 添加这行以确保需要验证
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    // 检查是否是2023年的内容
    const is2023 = to.params.year === '2023';
    console.log('Is 2023 content:', is2023);

    // 检查路由是否需要验证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (is2023) {
            next(); // 如果是2023年内容，直接放行
        } else {
            const isActivated = localStorage.getItem('isActivated') === 'true';
            console.log('Requires auth and activation status:', isActivated);
            if (!isActivated) {
                console.log('Not activated, redirecting...');
                next({ name: 'Home' }); // 重定向到首页
            } else {
                next(); // 如果激活，允许访问
            }
        }
    } else {
        next(); // 不需要验证的路由，直接放行
    }
});
export default router;
