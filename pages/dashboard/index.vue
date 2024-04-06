<template>
  <div>
    <h1>Dashboard Index</h1>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("dash.title"),
});
definePageMeta({
  layout: "dash",
});
</script>

<style lang="scss" scoped></style>
