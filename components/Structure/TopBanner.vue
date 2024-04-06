<template>
  <header
    class="topBannerHeader"
    :style="{
      'background-image': `linear-gradient(-90deg,rgba(115, 61, 0, 0.5),rgba(248, 136, 0, 0.2)),url('/images/bg/sub_bgs/${random_image}.png')`,
    }"
  >
    <v-container>
      <div class="text">
        <h1 class="h_1 mb-0">{{ title }}</h1>
        <h5 class="h_5">{{ subtitle }}</h5>
      </div>
      <div class="image">
        <NuxtImg
          preset="default"
          :src="image"
          width="300"
          height="250"
          class="mb-8"
        />
      </div>
    </v-container>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title asdasd",
  },
  subtitle: {
    type: String,
    default: "Subtitle",
  },
  image: {
    type: String,
    default: "/images/static/contact_us.png",
  },
});

// Randome from 1 to 4
const random_image = Math.floor(Math.random() * 4) + 1;
</script>

<style lang="scss" scoped>
.topBannerHeader {
  height: 50vh;
  background-size: cover;

  .v-container {
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .image {
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
}
</style>
