import * as Router from 'vue-router';

export const router = Router.createRouter({
  history: Router.createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('./pages/home/index.vue'),
    },
    {
      path: '/rect',
      component: () => import('./pages/rect/index.vue'),
    },
    {
      path: '/image',
      component: () => import('./pages/image/index.vue'),
    },
    {
      path: '/text',
      component: () => import('./pages/text/index.vue'),
    },
  ],
});
