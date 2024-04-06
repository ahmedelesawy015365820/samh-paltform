<template>
  <div class="default_layout">
    <TheNavbar />
    <div
      class="insideHomeView"
      :class="{ not_homepage: useRoute().fullPath != '/' }"
    >
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.insideHomeView {
  min-height: 500px;

  &.not_homepage {
    padding-top: calc(var(--header_height));
  }
}
</style>
