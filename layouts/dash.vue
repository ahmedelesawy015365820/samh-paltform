<template>
  <div class="default_layout">
    <TheSidebar
      @toggleSidebar="toggleSidebar"
      @openSidebar="sidebar_is_closed = false"
      :sidebar_is_closed="sidebar_is_closed"
    />

    <main
      @click="mobileMainClick"
      class="main"
      :class="{ sidebar_is_closed: sidebar_is_closed }"
    >
      <TheNavbar
        @click.stop
        @toggleSidebar="toggleSidebar"
        :sidebar_is_closed="sidebar_is_closed"
        dash_nav
      />

      <div class="insideHomeView">
        <slot />
      </div>

      <!-- <DashFooter /> -->
    </main>

    <LowerNav />
  </div>
</template>

<script setup>
const sidebar_is_closed = ref(false);
const toggleSidebar = () => {
  sidebar_is_closed.value = !sidebar_is_closed.value;
};

const mobileMainClick = () => {
  if (useHelpers().isSmallScreen()) {
    sidebar_is_closed.value = true;
  }
};
</script>

<style lang="scss" scoped>
.default_layout {
  .main {
    width: calc(100% - var(--sidebar_width));
    margin-inline-start: auto;
    transition: var(--layout_transition);

    &.sidebar_is_closed {
      width: calc(100% - var(--sidebar_close_width));
    }

    .insideHomeView {
      background: var(--body_bg);
      min-height: calc(100vh - var(--header_height));
      padding-top: calc(var(--header_height) + 20px);
      padding-inline: var(--layout_inline_padding);
    }
  }
}
</style>
