<template>
  <div class="search">
    <base-button
      class="d-flex align-center v-step-1 animate_dark_filled sm"
      @click="show = !show"
    >
      <Icon class="me-1" name="ph:magnifying-glass-thin" />
      {{ $t("navbar.search") }}
    </base-button>

    <search-model
      :show="show"
      :closeIcon="false"
      @close="show = false"
    ></search-model>
  </div>
</template>

<script setup>
const props = defineProps(["url"]);
const show = ref(false);
</script>

<style lang="scss" scoped>
.search {
  // border-radius: 20px;
  // padding: 5px 16px;

  // span {
  //   color: inherit;

  //   & > * {
  //     color: inherit;
  //   }
  // }
}
</style>
