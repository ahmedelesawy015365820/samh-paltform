<template>
  <div class="stepOne">
    <v-form ref="form" class="auth" @submit.prevent="submit">
      <main class="inputs">
        <base-input
          v-model="ssn_id"
          type="number"
          :label="$t('labels.national_id')"
          :hint="$t('hints.national_id')"
          :rules="[useInputRules().saudi_ids]"
          required
          placeholder="1234567891"
          up_mode
        ></base-input>
      </main>
      <footer class="footer d-flex justify-space-between">
        <base-button
          class="animate_primary_filled lg"
          type="submit"
          color="primary"
          :loading="loading"
          >{{ $t("form.send") }}
        </base-button>

        <base-button
          @click="cancelRegister"
          class="animate_dark lg"
          color="primary"
          type="button"
          >{{ $t("form.cancel") }}
        </base-button>
      </footer>
    </v-form>
  </div>
</template>

<script setup>
const emit = defineEmits(["nextStep"]);
const nuxtApp = useNuxtApp();

const cancelRegister = () => {
  let noData = true;
  if (ssn_id.value) {
    noData = false;
  }

  nuxtApp.$Swal
    .fire({
      title: nuxtApp.$i18n.t("auth.register.cancel.title"),
      text: nuxtApp.$i18n.t("auth.register.cancel.text"),
      showCancelButton: true,
      confirmButtonText: nuxtApp.$i18n.t("auth.register.cancel.confirm_text"),
      cancelButtonText: nuxtApp.$i18n.t("auth.register.cancel.cancel_text"),
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigateTo("/authentication/login");
      }
    });
  return;
};

import { useAuthStore } from "@/stores/auth";

const ssn_id = ref("");

const loading = ref(false);
const form = ref(null);
const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  if (await useAuthStore().verifyWithNafaz(ssn_id)) {
    emit("nextStep");
  }
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
