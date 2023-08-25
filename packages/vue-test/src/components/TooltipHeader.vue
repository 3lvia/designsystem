<template>
  <div class="header-container">
    <span class="e-text-md e-mr-8">Tooltip</span>
    <elvia-tooltip content="Im a tooltip!" position="bottom">
      <router-link to="/" slot="trigger" class="e-btn e-btn--icon e-btn--sm" aria-label="Se mer info">
        <span class="e-btn__icon">
          <i class="e-icon e-icon--cog" aria-hidden="true"></i>
        </span>
      </router-link>
    </elvia-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
}
</style>
