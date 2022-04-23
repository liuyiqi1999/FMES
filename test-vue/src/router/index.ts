import { createRouter, createWebHistory } from 'vue-router';

// 路由信息
const routes = [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('../views/reportConfig.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard.vue'),
      },
    {
      path: '/file',
      name: 'File',
      component: () => import('../views/reportPage.vue'),
    },

  ];
  
  // 导出路由
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;