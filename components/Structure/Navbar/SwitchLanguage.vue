<template>
  <div class="language" @click="switchLang">
    <!-- <nuxt-img
          preset="default"
          width="30"
          height="30"
          v-bind="props"
          :src="langIcon"
          alt="Switch Lang Image"
        /> -->
    <div class="lang_text">
      <span class="icon"
        ><Icon size="20" name="material-symbols:globe-uk-sharp"
      /></span>
      <span>{{ langText }}</span>
    </div>
  </div>
</template>

<script setup>
import { useLangStore } from "~/stores/lang";
const lang_store = useLangStore();

// const langIcon = computed(() => {
//   if (useHelpers().lang() == "en") {
//     return "/icons/ar.png";
//   } else {
//     return "/icons/en.png";
//   }
// });

const langText = computed(() => {
  if (useHelpers().lang() == "en") {
    return "AR";
  } else {
    return "EN";
  }
});

const switchLang = () => {
  lang_store.switchLang();
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.language {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  .lang_text {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    font-size: 15px;

    .icon {
      margin-bottom: -2px;
      transform-origin: center center;
    }

    transition: all 0.3s ease-in-out;
    &:hover {
      .icon {
        animation: rotate 3s ease-in-out infinite alternate;
      }
    }
  }
}
</style>
