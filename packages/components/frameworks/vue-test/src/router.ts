import { createRouter, createWebHistory } from 'vue-router';

import Components from './Components.vue';
import Tooltip from './Tooltip.vue';

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
