<template>
  <div class="area_section">
    <header class="header text-center">
      <h2 class="h_2 mb-2">{{ $t("pages.home.area.title") }}</h2>
      <p class="para">{{ $t("pages.home.area.para") }}</p>
    </header>

    <div class="top">
      <div class="btns">
        <BaseButton class="animate_dark rounded-pill">
          {{ $t("pages.home.area.all") }}
        </BaseButton>
        <BaseButton class="animate_primary_filled rounded-pill">
          {{ $t("pages.home.area.sell") }}
        </BaseButton>
        <BaseButton class="animate_dark rounded-pill">
          {{ $t("pages.home.area.rent") }}
        </BaseButton>
      </div>

      <!-- <BaseButton class="with_icon flat" link to="/properties">
        {{ $t("pages.home.discover.button") }}
        <span><Icon class="ms-1" name="mdi:arrow-top-left-thin" /> </span>
      </BaseButton> -->
    </div>

    <div class="cards">
      <v-row>
        <v-col
          cols="12"
          md="4"
          sm="6"
          v-for="card in cards.slice(0, 3)"
          data-aos="zoom-in-down"
        >
          <nuxt-link to="/">
            <div class="card">
              <NuxtImg preset="default" :src="card.image" />
              <div class="text">
                <span class="region">{{ card.region }}</span>
                <span class="listing"
                  >{{ card.listing }} {{ $t("pages.home.area.listing") }}</span
                >
              </div>
              <div class="overlay">
                <BaseButton class="white area_btn" link to="/">
                  {{ $t("form.view_details") }}
                  <span> </span>
                </BaseButton>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col
          cols="12"
          ms="8"
          sm="6"
          v-for="card in cards.slice(3, 4)"
          data-aos="zoom-in-left"
        >
          <nuxt-link to="/">
            <div class="card">
              <NuxtImg preset="default" :src="card.image" />
              <div class="text">
                <span class="region">{{ card.region }}</span>
                <span class="listing"
                  >{{ card.listing }} {{ $t("pages.home.area.listing") }}</span
                >
              </div>
              <div class="overlay">
                <BaseButton class="white area_btn" link to="/">
                  {{ $t("form.view_details") }}
                  <span> </span>
                </BaseButton>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col
          cols="12"
          ms="4"
          sm="6"
          v-for="card in cards.slice(4, 5)"
          data-aos="zoom-in-right"
        >
          <nuxt-link to="/">
            <div class="card">
              <NuxtImg preset="default" :src="card.image" />
              <div class="text">
                <span class="region">{{ card.region }}</span>
                <span class="listing"
                  >{{ card.listing }} {{ $t("pages.home.area.listing") }}</span
                >
              </div>
              <div class="overlay">
                <BaseButton class="white area_btn" link to="/">
                  {{ $t("form.view_details") }}
                  <span> </span>
                </BaseButton>
              </div>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    id: 1,
    image: "/Temp/regions/1.png",
    region: "Makkah Al Mukarramah Region",
    listing: 25,
  },
  {
    id: 2,
    image: "/Temp/regions/2.png",
    region: "Makkah Al Mukarramah Region",
    listing: 25,
  },
  {
    id: 3,
    image: "/Temp/regions/3.png",
    region: "Makkah Al Mukarramah Region",
    listing: 25,
  },
  {
    id: 4,
    image: "/Temp/regions/4.png",
    region: "Makkah Al Mukarramah Region",
    listing: 25,
  },
  {
    id: 5,
    image: "/Temp/regions/5.png",
    region: "Makkah Al Mukarramah Region",
    listing: 25,
  },
];
</script>

<style lang="scss" scoped>
.area_section {
  header {
    p {
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .top {
    margin-block: 40px;
    .btns {
      display: flex;
      gap: 10px;

      button {
        padding: 5px 20px;
      }
    }
  }

  .cards {
    .card {
      position: relative;
      height: 260px;
      border-radius: 5px;
      overflow: hidden;

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .text {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        color: #fff;
        padding: 17px;

        background: linear-gradient(
          180deg,
          rgb(59 76 129 / 65%) -12.86%,
          rgb(59 77 129 / 1%) 106.85%
        );

        span {
          display: block;
          &.region {
            font-size: 17px;
          }

          &.listing {
            font-size: 15px;
          }
        }
      }

      .overlay {
        z-index: 3;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        background: linear-gradient(
          180deg,
          rgba(47, 62, 107, 0.27) -12.86%,
          rgba(33, 49, 99, 0) 106.85%
        );
      }

      .area_btn {
        border-radius: 10px;
        font-size: 14px;
      }

      &:hover {
        .overlay {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}
</style>
