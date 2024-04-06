<template>
  <div class="termsPage">
    <topBanner
      :title="privacy.title"
      :subtitle="privacy.updated_at"
      image="/images/static/privacy_terms.png"
    />
    <v-container class="my-8 rounded-lg">
      <main class="main py-2">
        <div v-html="privacy.description"></div>
      </main>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.terms.title"),
});

import { useStaticStore } from "@/stores/static";
const privacy = await useStaticStore().getPrivacy();
</script>

<style lang="scss" scoped>
.termsPage {
  .v-container {
    padding: 30px;
    background: var(--gray);
  }
}
</style>
