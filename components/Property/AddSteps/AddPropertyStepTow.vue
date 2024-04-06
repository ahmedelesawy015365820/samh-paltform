<template>
  <div class="stepTow">
    <v-form ref="form" class="property" @submit.prevent="next">
      <main class="inputs">
        <v-row>
          <!-- Address -->
          <v-col cols="12" md="4">
            <select-input
              v-model="data.region"
              getUrl="member/lookups/regions"
              :label="$t('labels.region')"
              required
              up_mode
            />
          </v-col>
          <v-col cols="12" md="4">
            <select-input
              v-model="data.city"
              :getUrl="`member/lookups/cities?region_id=${data.region?.id}`"
              :_sync="data.region"
              :label="$t('labels.city')"
              required
              up_mode
            />
          </v-col>
          <v-col cols="12" md="4">
            <select-input
              v-model="data.district"
              :getUrl="`member/lookups/districts?city_id=${data.city?.id}`"
              :_sync="data.city"
              :label="$t('labels.district')"
              required
              up_mode
            />
          </v-col>

          <v-col cols="12">
            <GoogleMap
              height=""
              @updateLocation="updateLocation"
              :location="data.location"
            />
          </v-col>
        </v-row>
      </main>

      <footer class="footer">
        <div class="d-flex flex-row-reverse justify-space-between">
          <base-button
            :loading="loading"
            type="submit"
            class="lg animate_dark_filled filled"
            >{{ $t("form.next") }}</base-button
          >

          <base-button
            @click.prevent="previous"
            type="button"
            class="lg animate_dark filled"
            >{{ $t("form.previous") }}</base-button
          >
        </div>
      </footer>
    </v-form>
  </div>
</template>

<script setup>
const emit = defineEmits(["nextStep", "previousStep"]);

import { usePropertyStore } from "@/stores/property";
const property_store = usePropertyStore();

const loading = ref(false);
const data = ref(property_store.current_property[2]);

const updateLocation = (new_location) => {
  data.value.location.value = new_location;
};

const form = ref(null);
const next = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;

  // Set form data
  const form_data = new FormData();
  form_data.append("district_id", data.value.district.id);
  form_data.append("latitude", data.value.location.value.lat);
  form_data.append("longitude", data.value.location.value.lng);
  form_data.append("address", data.value.location.value.address);

  if (
    await usePropertyStore().addStep(
      form_data,
      2,
      property_store.current_property_id
    )
  ) {
    emit("nextStep");
  }
  loading.value = false;
};

const previous = () => {
  emit("previousStep");
};
</script>

<style lang="sass" scoped></style>
