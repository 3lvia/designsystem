<template>
  <elvia-header
    appTitle="Vue 3 Preview"
    :pageTitle="pageTitle"
    username="Ragna Nordmann"
    email="e325334@elvia.no"
    :navItems="navItems"
    @onSideNavItemClick="navigate($event.detail.value)"
  >
    <router-view slot="appContent" />
  </elvia-header>
</template>

<script lang="ts">
import { NavItem } from '@elvia/elvis-header';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navItems: NavItem[] = [
      {
        url: '/',
        iconName: 'dashboard',
        name: 'Components',
        strictMatching: true,
      },
      {
        url: '/tooltip',
        iconName: 'touchFingerColor',
        name: 'Tooltip',
      },
    ];

    const pageTitle = computed(() => {
      return route.meta.title;
    });

    const navigate = (navItem: NavItem): void => {
      router.push(navItem.url);
    };

    return { pageTitle, navItems, navigate };
  },
});
</script>
