<template>
  <NuxtLink class="logo" to="/" name="Home Page Logo">
    <nuxt-img
      :key="useHelpers().dir()"
      v-bind="$attrs"
      preset="default"
      :src="logo"
      alt="App Logo"
      :width="width"
      :height="height"
  /></NuxtLink>
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";
import { useLangStore } from "@/stores/lang";
// const { current_theme } = useThemeStore();
// const { current_lang } = useLangStore();

const props = defineProps([
  "big",
  "fixed_src",
  "fixed_theme",
  "fixed_lang",
  "header_nav",
  "header_nav_mobile",
  "stiky",
  "mobile",
  "width",
  "height",
]);

const width = computed(() => {
  if (props.width) return props.width;
  if (props.big) return "126";
  if (props.mobile) return "35";
  else return "90";
});
const height = computed(() => {
  if (props.height) return props.height;
  if (props.big) return "56";
  if (props.mobile) return "35";
  else return "42";
});

const logo = computed(() => {
  if (props.fixed_src) return props.fixed_src;
  if (props.mobile) {
    return `/images/Logo/mobile_logo.png`;
  }
  if (props.fixed_theme) {
    if (useLangStore().current_lang == "ar") {
      return `/images/Logo/ar_logo_${props.fixed_theme}.png`;
    } else {
      return `/images/Logo/en_logo_${props.fixed_theme}.png`;
    }
  }
  if (props.fixed_lang) {
    if (useThemeStore().current_theme == "dark") {
      return `/images/Logo/${props.fixed_lang}_logo_light.png`;
    } else {
      return `/images/Logo/${props.fixed_lang}_logo_dark.png`;
    }
  }

  if (useLangStore().current_lang == "ar") {
    if (props.header_nav && !props.stiky) {
      return "/images/Logo/ar_logo_light.png";
    }
    if (props.stiky) {
      return "/images/Logo/ar_logo_dark.png";
    }
    if (props.header_nav_mobile) {
      return "/images/Logo/mobile_logo.png";
    }

    if (useThemeStore().current_theme == "dark") {
      return "/images/Logo/ar_logo_light.png";
    } else {
      return "/images/Logo/ar_logo_dark.png";
    }
  } else {
    if (props.header_nav && !props.stiky) {
      return "/images/Logo/en_logo_light.png";
    }
    if (props.stiky) {
      return "/images/Logo/en_logo_dark.png";
    }
    if (props.header_nav_mobile) {
      return "/images/Logo/mobile_logo.png";
    }

    if (useThemeStore().current_theme == "dark") {
      return "/images/Logo/en_logo_light.png";
    } else {
      return "/images/Logo/en_logo_dark.png";
    }
  }
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
a {
  display: block;

  img {
    display: block;
  }
}
</style>
