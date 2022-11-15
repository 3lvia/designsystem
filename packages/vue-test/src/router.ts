import { createRouter, createWebHistory } from 'vue-router';

import Components from './views/Components.vue';
import Dropdown from './views/Dropdown.vue';
import Tooltip from './views/Tooltip.vue';
import Popover from './views/Popover.vue';

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
      path: '/dropdown',
      name: 'Dropdown',
      component: Dropdown,
      meta: {
        title: 'Dropdown',
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
      path: '/popover',
      name: 'Popover',
      component: Popover,
      meta: {
        title: 'Popover',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
