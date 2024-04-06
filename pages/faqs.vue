<template>
  <div class="faqsPage">
    <topBanner :title="$t('pages.faq.title')" subtitle="7th of January 2024" />
    <v-container class="my-8 rounded-lg">
      <div>
        <v-expansion-panels variant="popout" class="my-4">
          <v-expansion-panel
            v-for="faq in faqs"
            :key="faq.id"
            :title="faq.question"
            :text="faq.answer"
          ></v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.faq.title"),
});

import { useStaticStore } from "@/stores/static";
const faqs = await useStaticStore().getFaqs();
</script>

<style lang="scss" scoped></style>
