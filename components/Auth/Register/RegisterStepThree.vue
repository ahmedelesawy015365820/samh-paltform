<template>
  <div class="stepThree">
    <v-form ref="form" class="auth" @submit.prevent="submit">
      <div class="inputs">
        <v-col cols="12">
          <base-input
            type="number"
            v-model="data.phone_number"
            :label="$t('labels.phone')"
            :hint="$t('hints.phone')"
            :rules="[useInputRules().saudi_numbers]"
            required
            up_mode
          ></base-input>
        </v-col>
      </div>

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
  if (data.value.phone_number) {
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

const loading = ref(false);
const data = ref({
  phone_number: null,
});

import { useAuthStore } from "@/stores/auth";
const form = ref(null);
const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  if (await useAuthStore().verifyPhoneNumber(data.value.phone_number)) {
    emit("nextStep");
  }
  loading.value = false;
};
</script>
