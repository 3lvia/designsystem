<template>
  <div class="components-examples">
    <div class="example-wrapper">
      <h3>Tooltip</h3>

      <div class="example-container">
        <p class="e-text-md">
          This is a text to test out the new
          <elvia-tooltip
            content="This is a tooltip! The content is pretty long."
            trigger="tooltip!"
          ></elvia-tooltip>
        </p>

        <elvia-tooltip
          content="This tooltip has a trigger through a slot. Click the button to toggle the tooltip position."
          :position="tooltipPosition"
        >
          <button
            slot="trigger"
            @click="shuffleTooltipPosition()"
            class="e-btn e-btn--icon e-btn--lg"
            aria-label="Vis tooltip"
          >
            <span class="e-btn__icon">
              <i class="e-icon e-icon--star" aria-hidden="true"></i>
            </span>
          </button>
        </elvia-tooltip>

        <elvia-tooltip isDisabled="true" content="This should not be visible">
          <span slot="trigger">Disabled tooltip</span>
        </elvia-tooltip>

        <elvia-tooltip>
          <p slot="content" class="e-text-md e-m-0 e-flex e-align-items-center">
            <i
              class="e-icon e-icon--search-bold e-icon--xs e-icon--color-white e-mr-8"
              aria-hidden="true"
            ></i>
            This is custom content!
          </p>
          <div slot="trigger">Tooltip trigger with custom content</div>
        </elvia-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tooltipPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top');

    const shuffleTooltipPosition = (): void => {
      if (tooltipPosition.value === 'top') {
        tooltipPosition.value = 'right';
      } else if (tooltipPosition.value === 'right') {
        tooltipPosition.value = 'bottom';
      } else if (tooltipPosition.value === 'bottom') {
        tooltipPosition.value = 'left';
      } else {
        tooltipPosition.value = 'top';
      }
    };

    return { tooltipPosition, shuffleTooltipPosition };
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
