<template>
  <div class="homeBanner">
    <v-row>
      <v-col cols="12" md="6" class="">
        <div class="text_wrapper">
          <div class="text">
            <h2 class="h_2" data-aos="flip-up">
              {{ $t("pages.home.banner.title") }}
            </h2>
            <p class="para my-4" data-aos="fade-left">
              {{ $t("pages.home.banner.para") }}
            </p>
            <BaseButton
              class="with_icon animate_primary_filled lg"
              data-aos="fade-right"
            >
              {{ $t("form.contact_us") }}
            </BaseButton>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-md-block d-none">
        <div class="image">
          <NuxtImg
            preset="default"
            height="400px"
            width="400px"
            src="/images/bg/home_banner.png"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.homeBanner {
  background: linear-gradient(125deg, #00a2ff3c, #00a2ff27 50%);
  border-radius: 15px;
  min-height: 70vh;
  display: flex;
  padding: 15px 40px 0;

  .text_wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      h2 {
        font-size: 40px;
        line-height: 60px;
      }
    }
  }

  .image {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    img {
      object-fit: cover;
      height: 400px;
    }
  }
}
</style>
