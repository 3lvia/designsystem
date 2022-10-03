<template>
  <elvia-header
    appTitle="Vue 3 Preview"
    username="Ragna Nordmann"
    email="e325334@elvia.no"
    :navItems="navItems"
    @onSideNavItemClick="navigate($event.detail.value)"
  >
    <div slot="pageTitle">
      <TooltipHeader v-if="pageTitle === 'Tooltip'" />
      <span v-else>{{ pageTitle }}</span>
    </div>
    <div slot="appContent">
      <router-view />
    </div>
  </elvia-header>
</template>

<script lang="ts">
import { NavItem } from '@elvia/elvis-header';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TooltipHeader from './components/TooltipHeader.vue';

export default defineComponent({
  components: { TooltipHeader },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navItems = ref<NavItem[]>([
      {
        url: '/',
        iconName: 'dashboard',
        name: 'Components',
        strictMatching: true,
        isActive: true,
      },
      {
        url: '/tooltip',
        iconName: 'touchFingerColor',
        name: 'Tooltip',
        isActive: false,
      },
    ]);

    const pageTitle = computed(() => {
      return route.meta.title;
    });

    const navigate = (navItem: NavItem): void => {
      router.push(navItem.url);
    };

    watch(
      () => route.path,
      () => {
        const clone = navItems.value.slice();
        clone.forEach((item) => {
          console.log(route.path);
          item.isActive = item.url === route.path;
        });

        navItems.value = clone;
      },
    );

    return { pageTitle, navItems, navigate };
  },
});
</script>
