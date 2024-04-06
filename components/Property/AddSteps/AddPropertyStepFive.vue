<template>
  <div class="stepThree">
    <v-form ref="form" class="property" @submit.prevent="submit">
      <main class="inputs">
        <v-row>
          <v-col cols="12">
            <base-input
              type="url"
              v-model="data.video_url"
              :label="$t('labels.video_url')"
              placeholder="https://www.youtube.com/watch?v=6v2L2UGZJAM"
              up_mode
            />
          </v-col>
          <v-col cols="12">
            <UplodeMultiple required v-model="data.images" />
          </v-col>
        </v-row>
      </main>

      <footer class="footer">
        <div class="d-flex flex-row-reverse justify-space-between">
          <base-button
            :loading="loading"
            type="submit"
            class="lg animate_primary_filled filled"
            >{{ $t("form.submit") }}</base-button
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
const data = ref(property_store.current_property[5]);

const form = ref(null);
const submit = async () => {
  let { valid } = await form.value.validate();
  if (data.value.images.length === 0) {
    valid = false;
    useNuxtApp().$Swal.fire({
      icon: "error",
      text: useNuxtApp().$i18n.t("validation.images_required"),
    });
  }
  if (!valid) return;

  loading.value = true;
  const form_data = new FormData();
  form_data.append("video_url", data.value.video_url);
  data.value.images.forEach((image, index) => {
    form_data.append(`images[${index}]`, image.file_obj);
  });

  if (
    await usePropertyStore().addStep(
      form_data,
      5,
      property_store.current_property_id
    )
  ) {
    useNuxtApp().$Swal.fire({
      icon: "success",
      text: useNuxtApp().$i18n.t("messages.property_added"),
    });
    navigateTo(`/dashboard/properties/${property_store.current_property_slug}`);
  }
  loading.value = false;
};

const previous = () => {
  emit("previousStep");
};
</script>

<style lang="sass" scoped></style>
