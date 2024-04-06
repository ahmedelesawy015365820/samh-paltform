<template>
  <div>
    <h2 class="h_2 mb-16">All Properties</h2>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("dash.properties.title"),
});
definePageMeta({
  layout: "dash",
  requireAuth: true,
});
</script>

<style lang="scss" scoped></style>
