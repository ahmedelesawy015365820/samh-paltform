<template>
  <div class="termsPage">
    <topBanner
      :title="terms.title"
      :subtitle="terms.updated_at"
      image="/images/static/terms_of_use.png"
    />
    <v-container class="my-8 rounded-lg">
      <main class="main py-2">
        <div v-html="terms.description"></div>
      </main>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.terms.title"),
});

import { useStaticStore } from "@/stores/static";
const terms = await useStaticStore().getTerms();
</script>

<style lang="scss" scoped>
.termsPage {
  .v-container {
    padding: 30px;
    background: var(--gray);
  }
}
</style>
