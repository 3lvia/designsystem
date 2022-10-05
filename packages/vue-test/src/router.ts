import { createRouter, createWebHistory } from 'vue-router';

import Components from './views/Components.vue';
import Tooltip from './views/Tooltip.vue';

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
      path: '/tooltip',
      name: 'Tooltip',
      component: Tooltip,
      meta: {
        title: 'Tooltip',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
