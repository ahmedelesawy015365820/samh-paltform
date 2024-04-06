<template>
  <div class="homePage">
    <TheHeader />

    <div class="homeSection">
      <v-container>
        <PropertiesByArea />
      </v-container>
    </div>

    <div class="homeSection pa-0">
      <ServicesSection />
    </div>

    <v-container>
      <div class="homeSection">
        <DiscoverSection />
      </div>
    </v-container>

    <v-container>
      <div class="homeSection pt-0">
        <BannerSection />
      </div>
    </v-container>

    <div class="homeSection">
      <PopularSeaction />
    </div>

    <div class="homeSection">
      <v-container>
        <SellingSection />
      </v-container>
    </div>

    <div class="homeSection">
      <AppSection />
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: useNuxtApp().$i18n.t("pages.home.title"),
});
</script>

<style scoped lang="scss">
.homeSection {
  padding-block: 50px;
}
</style>
