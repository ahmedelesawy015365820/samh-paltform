<template>
  <div class="stepThree">
    <v-form ref="form" class="property" @submit.prevent="next">
      <main class="inputs">
        <v-row>
          <v-col cols="12" md="6">
            <select-input
              v-model="data.property_usage"
              getUrl="member/lookups/property/usages"
              :label="$t('labels.property_usage')"
              required
              up_mode
            />
          </v-col>
          <v-col cols="12" md="6">
            <select-input
              v-model="data.property_type"
              :getUrl="`member/lookups/property/types?usage_id=${data.property_usage?.id}`"
              :_sync="data.property_usage"
              :label="$t('labels.property_type')"
              required
              up_mode
            />
          </v-col>

          <!-- Descreptions -->
          <v-col cols="12" md="12">
            <DescreptionsInputs
              v-model="data.property_descriptions"
              :property_type_id="data.property_type?.id"
            />
          </v-col>

          <h5 class="h_5">{{ $t("labels.amenities") }}</h5>
          <v-col cols="12" class="mb-10">
            <v-row dense>
              <v-col cols="12" md="4" v-for="feature in features">
                <v-checkbox
                  density="compact"
                  v-model="data.features_ids"
                  :key="feature.id"
                  :label="feature.name"
                  :value="feature.id"
                  color="primary"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>

          <h5 class="h_5">{{ $t("labels.utilities") }}</h5>
          <v-col cols="12" class="mb-10">
            <v-row dense>
              <v-col cols="12" md="4" v-for="utility in utilities">
                <v-checkbox
                  density="compact"
                  v-model="data.utilities_ids"
                  :key="utility.id"
                  :label="utility.name"
                  :value="utility.id"
                  color="primary"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
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

const features = await useLookupsStore().getFeatures();
const utilities = await useLookupsStore().getUtilities();

const loading = ref(false);
const data = ref(property_store.current_property[3]);

const form = ref(null);
const next = async () => {
  let { valid } = await form.value.validate();
  if (data.value.utilities_ids.length === 0) {
    valid = false;
    useNuxtApp().$Swal.fire({
      icon: "error",
      text: useNuxtApp().$i18n.t("validation.utilities_required"),
    });
  }
  if (!valid) return;

  loading.value = true;

  // Set form data
  const form_data = new FormData();
  form_data.append("usage_id", data.value.property_usage.id);
  form_data.append("type_id", data.value.property_type.id);
  data.value.property_descriptions.forEach((description, index) => {
    form_data.append(`description[${index}][id]`, description.id);
    form_data.append(`description[${index}][value]`, description.value);
  });
  data.value.features_ids.forEach((feature_id, index) => {
    form_data.append(`features[${index}]`, feature_id);
  });
  data.value.utilities_ids.forEach((utility_id, index) => {
    form_data.append(`utilities[${index}]`, utility_id);
  });

  if (
    await usePropertyStore().addStep(
      form_data,
      3,
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
