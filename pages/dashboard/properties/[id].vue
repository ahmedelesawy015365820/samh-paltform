<template>
  <div>Property</div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("dash.properties.show.title"),
});
definePageMeta({
  layout: "dash",
  requireAuth: true,
});
</script>

<style lang="scss" scoped></style>
