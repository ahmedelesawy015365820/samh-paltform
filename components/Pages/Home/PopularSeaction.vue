<template>
  <div class="popular_featuears">
    <v-container>
      <header class="header text-center d-flex justify-center">
        <div>
          <h2 class="h_2 mb-2">
            {{ $t("pages.home.popular.title") }}
          </h2>
          <p class="para">{{ $t("pages.home.popular.para") }}</p>
        </div>
      </header>

      <main class="main mt-16 mb-10">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="property in properties"
            :key="property.id"
          >
            <SingleProperty :property="property" />
          </v-col>
        </v-row>
      </main>

      <footer class="footer">
        <BaseButton
          class="with_icon animate_primary_filled lg mx-auto"
          link
          to="/"
        >
          {{ $t("pages.home.popular.button") }}
          <span><Icon class="ms-1" name="mdi:arrow-top-left-thin" /> </span>
        </BaseButton>
      </footer>
    </v-container>
  </div>
</template>

<script setup>
const properties = [
  {
    id: 1,
    image: "/Temp/property_1.png",
    rent_duration: "month",
    price: "590,693",
    title: "Lorem ipsum dolor sit amet",
    location: "California City, CA, USA1",
  },
  {
    id: 2,
    image: "/Temp/property_2.png",
    rent_duration: "month",
    price: "487,782",
    title: "Lorem ipsum dolor sit amet",
    location: "California City, CA, USA2",
  },
  {
    id: 3,
    image: "/Temp/property_3.png",
    rent_duration: "month",
    price: "220,000",
    title: "Lorem ipsum dolor sit amet",
    location: "California City, CA, USA3",
  },
];
</script>

<style lang="scss" scoped>
.popular_featuears {
}
</style>
