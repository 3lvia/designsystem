<template>
  <div class="components-examples">
    <div class="example-wrapper">
      <h3>Dropdown</h3>

      <div class="example-container">
        <elvia-dropdown
          :inlineStyle="{ maxWidth: '280px' }"
          label="Standard"
          :items="dropdownItems"
        ></elvia-dropdown>
        <elvia-dropdown
          :inlineStyle="{ maxWidth: '280px' }"
          isDisabled="true"
          label="Disabled"
          :items="dropdownItems"
        ></elvia-dropdown>
        <elvia-dropdown
          :inlineStyle="{ maxWidth: '280px' }"
          label="Searchable"
          :items="dropdownItems"
          isSearchable="true"
        ></elvia-dropdown>
        <elvia-dropdown
          :inlineStyle="{ maxWidth: '280px' }"
          label="Compact"
          :items="dropdownItems"
          isCompact="true"
        ></elvia-dropdown>
        <elvia-dropdown
          :inlineStyle="{ maxWidth: '280px' }"
          label="Multi"
          :items="dropdownItems"
          isMulti="true"
          hasSelectAllOption="true"
          placeholder="Select country"
          hasLoadMoreItemsButton="false"
          :isLoadingMoreItems="isLoadingMoreItems"
          @onLoadMoreItems="setLoading()"
        ></elvia-dropdown>
        <elvia-dropdown label="Full width" :items="dropdownItems" isFullWidth="true"></elvia-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectedDropdownItem = ref('sverige');
    const isLoadingMoreItems = ref(false);
    const dropdownItems = [
      {
        value: 'norge',
        label: 'Norge med en veldig lang tekst som kommer til å overflowe',
        children: [
          { label: 'Oslo', value: 'oslo' },
          {
            label: 'Bergen',
            value: 'bergen',
            children: [
              { label: 'Arna', value: 'arna' },
              { label: 'Bergenhus', value: 'bergenhus' },
              { label: 'Fana', value: 'fana' },
              { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
              { label: 'Laksevåg', value: 'Laksevåg' },
            ],
          },
          { label: 'Trondheim', value: 'trondheim' },
          { label: 'Stavanger', value: 'stavanger' },
          { label: 'Kristiansand', value: 'kristiansand' },
        ],
      },
      { value: 'sverige', label: 'Sverige', status: 'info', tooltip: 'Sweden is a country' },
      { value: 'danmark', label: 'Danmark' },
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London' },
          { value: 'manchester', label: 'Manchester' },
          { value: 'birmingham', label: 'Birmingham' },
        ],
      },
    ];

    const setLoading = () => {
      isLoadingMoreItems.value = true;
      setTimeout(() => (isLoadingMoreItems.value = false), 4000);
    };

    return { selectedDropdownItem, isLoadingMoreItems, dropdownItems, setLoading };
  },
});
</script>

<style lang="scss" scoped>
.example-container {
  display: flex;
  gap: var(--e-spacing-32);
  align-items: baseline;
  flex-wrap: wrap;
}
</style>
