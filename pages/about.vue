<template>
  <div class="aboutPage">
    <v-container>
      <h1>About Us</h1>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.about.title"),
});
definePageMeta({
  requireAuth: false,
});
</script>

<style lang="scss" scoped></style>
