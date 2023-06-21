<template>
  <elvia-header appTitle="Vue 3 Preview" username="Ragna Nordmann" email="e325334@elvia.no">
    <div slot="pageTitle">
      <TooltipHeader v-if="pageTitle === 'Tooltip'" />
      <span v-else>{{ pageTitle }}</span>
    </div>
    <div slot="navItems" class="e-sidenav__container">
      <router-link
        class="e-sidenav__item"
        :to="navItem.url"
        active-class="e-sidenav__item--active"
        v-for="navItem in navItems"
      >
        <div class="e-sidenav__icon-container">
          <elvia-icon :name="isActive(navItem.url) ? navItem.iconNameActive : navItem.iconName" size="sm" />
        </div>
        <div class="e-sidenav__item-text">{{ navItem.name }}</div>
      </router-link>
    </div>
    <div slot="appContent">
      <router-view />
    </div>
  </elvia-header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import TooltipHeader from './components/TooltipHeader.vue';

interface NavItem {
  url: string;
  iconName: string;
  iconNameActive: string;
  name: string;
}

export default defineComponent({
  components: { TooltipHeader },
  setup() {
    const route = useRoute();

    const navItems = ref<NavItem[]>([
      {
        url: '/',
        iconName: 'dashboard',
        iconNameActive: 'dashboardColor',
        name: 'Components',
      },
      {
        url: '/dropdown',
        iconName: 'list',
        iconNameActive: 'listColor',
        name: 'Dropdown',
      },
      {
        url: '/tooltip',
        iconName: 'search',
        iconNameActive: 'searchColor',
        name: 'Tooltip',
      },
      {
        url: '/popover',
        iconName: 'invoice',
        iconNameActive: 'invoiceColor',
        name: 'Popover',
      },
    ]);

    const pageTitle = computed(() => {
      return route.meta.title;
    });

    const isActive = (url: string): boolean => {
      return route.path === url;
    };

    return { pageTitle, navItems, isActive };
  },
});
</script>
