<template>
  <div class="stepOne">
    <v-form ref="form" class="property" @submit.prevent="next">
      <main class="inputs">
        <v-row>
          <!-- Ownership -->
          <v-col cols="12" sm="6">
            <RadioInput
              v-model="data.ownership"
              :label="$t('labels.is_owner')"
              :items="OwnerOrAgency"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <div v-show="data.ownership == 'agency'">
              <base-input
                type="number"
                v-model="data.agency_number"
                :label="$t('labels.agency_number')"
                :required="data.ownership == 'agency'"
                up_mode
              ></base-input>
            </div>
          </v-col>

          <!-- License -->
          <v-col cols="12" sm="6">
            <RadioInput
              v-model="data.has_license"
              :label="$t('labels.has_license')"
              :items="yesOrNo"
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <div v-show="data.has_license == 1">
              <base-input
                type="number"
                v-model="data.license_number"
                :label="$t('labels.license_number')"
                :required="data.has_license == 1"
                up_mode
              ></base-input>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <select-input
              v-model="data.advertisement_type"
              getUrl="member/lookups/advertisement-types"
              :label="$t('labels.advertisement_type')"
              required
              up_mode
            />
          </v-col>
        </v-row>
      </main>

      <footer class="footer d-flex justify-end">
        <base-button
          :loading="loading"
          type="submit"
          class="lg animate_dark_filled filled"
          >{{ $t("form.next") }}</base-button
        >
      </footer>
    </v-form>
  </div>
</template>

<script setup>
const emit = defineEmits(["nextStep"]);

import { usePropertyStore } from "@/stores/property";
const property_store = usePropertyStore();

const loading = ref(false);
const data = ref(property_store.current_property[1]);

const yesOrNo = [
  { id: 1, name: useNuxtApp().$i18n.t("labels.yes"), value: "1" },
  { id: 2, name: useNuxtApp().$i18n.t("labels.no"), value: "0" },
];

const OwnerOrAgency = [
  { id: 1, name: useNuxtApp().$i18n.t("labels.owner"), value: "owner" },
  { id: 2, name: useNuxtApp().$i18n.t("labels.agency"), value: "agency" },
];

const form = ref(null);
const next = async () => {
  const valid = ref(true);
  if (data.value.ownership == "agency" && !data.value.agency_number) {
    valid.value = false;
  }
  if (data.value.has_license == 1 && !data.value.license_number) {
    valid.value = false;
  }
  if (!data.value.advertisement_type) {
    valid.value = false;
  }
  if (!valid.value) return;

  loading.value = true;

  // Set form data
  const form_data = new FormData();
  form_data.append("has_licence", +data.value.has_license);
  form_data.append("licence_number", data.value.license_number);
  form_data.append("is_agency", data.value.ownership == "agency" ? 1 : 0);
  form_data.append("agency_number", data.value.agency_number);
  form_data.append("advertisement_type_id", data.value.advertisement_type.id);

  if (
    await usePropertyStore().addStep(
      form_data,
      1,
      property_store.current_property_id
        ? property_store.current_property_id
        : null
    )
  ) {
    emit("nextStep");
  }
  loading.value = false;
};
</script>

<style lang="sass" scoped></style>
