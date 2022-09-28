import { createRouter, createWebHistory } from 'vue-router';

import Components from './views/Components.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Components',
      component: Components,
      meta: {
        title: 'Components',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
