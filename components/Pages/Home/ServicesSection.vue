<template>
  <div class="relation_section">
    <v-container>
      <div class="text text-center">
        <h2 class="h_2 mb-2">{{ $t("pages.home.relaton.title") }}</h2>
        <p class="para">{{ $t("pages.home.relaton.para") }}</p>
      </div>

      <v-row class="mt-10">
        <v-col cols="12" sm="6" md="4" v-for="(item, index) in items">
          <nuxt-link to="/">
            <div
              to="/"
              class="office_card"
              :data-aos="`fade-${aos_animate(index)}`"
            >
              <NuxtImg
                preset="default"
                :src="item.image"
                width="70"
                height="70"
                class="mb-8"
              />

              <h4 class="h_4 bold">{{ item.title }}</h4>
              <p class="para gray">{{ item.para }}</p>

              <base-button class="mt-10 flat _colored underline">
                {{ $t("pages.home.relaton.button") }}
                <Icon class="ms-1" name="solar:arrow-right-linear" />
              </base-button>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const items = [
  {
    image: "/images/sell.png",
    title: useNuxtApp().$i18n.t("pages.home.relaton.cards[0].title"),
    para: useNuxtApp().$i18n.t("pages.home.relaton.cards[0].para"),
  },
  {
    image: "/images/rent.png",
    title: useNuxtApp().$i18n.t("pages.home.relaton.cards[1].title"),
    para: useNuxtApp().$i18n.t("pages.home.relaton.cards[1].para"),
  },
  {
    image: "/images/buy.png",
    title: useNuxtApp().$i18n.t("pages.home.relaton.cards[2].title"),
    para: useNuxtApp().$i18n.t("pages.home.relaton.cards[2].para"),
  },
];

const aos_animate = (index) => {
  if (index === 0) return "right";
  if (index === 1) return "up";
  if (index === 2) return "left";
};
</script>

<style lang="scss" scoped>
.relation_section {
  background: var(--homeSection_bg);
  padding: 50px 0;

  a {
    cursor: pointer;
  }

  .office_card {
    padding: 50px 30px;
    box-shadow: 0px 10px 40px var(--shadow_1);
    border-radius: 10px;
    transition: all 0.2s linear;

    a {
      text-decoration: underline;
    }

    &:hover,
    &.active {
      background: var(--main_bg);
    }
  }
}
</style>
