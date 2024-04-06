<template>
  <div class="stepThree">
    <v-form ref="form" class="property" @submit.prevent="next">
      <main class="inputs">
        <v-row>
          <v-col cols="12" sm="6">
            <base-input
              type="number"
              v-model="data.selling_price"
              :label="$t('labels.selling_price')"
              required
              up_mode
            ></base-input>
          </v-col>
          <v-col cols="12" sm="6">
            <h5 class="h_5">{{ $t("labels.is_negotiable") }}</h5>
            <v-checkbox
              v-model="data.is_negotiable"
              :label="$t('labels.is_negotiable')"
              :false-value="0"
              color="primary"
              density="compact"
              required
              up_mode
            ></v-checkbox>
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
const data = ref(property_store.current_property[4]);

const form = ref(null);
const next = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  // Set form data
  const form_data = new FormData();
  form_data.append("price", data.value.selling_price);
  form_data.append("allow_offer", +data.value.is_negotiable);

  if (
    await usePropertyStore().addStep(
      form_data,
      4,
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
