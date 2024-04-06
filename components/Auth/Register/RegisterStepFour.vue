<template>
  <div class="confirm">
    <v-form ref="form" class="auth" @submit.prevent>
      <header class="header mb-0">
        <h4 class="h_4 mb-1 big text-center">
          {{ $t("auth.confirm.title") }}
        </h4>
        <p class="para sm text-center mx-auto mb-5">
          {{ $t("auth.confirm.text") + ` (${phone})` }}
        </p>
      </header>

      <main class="inputs">
        <v-otp-input
          dir="ltr"
          v-model="data.code"
          :length="4"
          placeholder="*"
          @finish="onFinish"
          :loading="OTPLoading"
        ></v-otp-input>
      </main>

      <footer class="footer mt-10">
        <div class="d-flex justify-space-between">
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
        </div>

        <p class="d-flex justify-center">
          {{ $t("auth.confirm.footer") }}
          <button
            :class="{ disabled: !is_count_finished }"
            @click="reSend"
            class="colored d-flex ms-2"
          >
            <span>{{ $t("form.resend") }}</span>
            <count-down
              v-if="start_resend"
              @countFinished="countFinished"
              @number_of_try_exceeded="navigateTo('/authentication/login')"
              loob
              :start="30"
              :clearInterval="clearInterval"
            ></count-down>
          </button>
        </p>
      </footer>
    </v-form>
  </div>
</template>

<script setup>
const emit = defineEmits(["nextStep"]);
const nuxtApp = useNuxtApp();

const is_count_finished = ref(true);
const start_resend = ref(false);
const clearInterval = ref(false);
const countFinished = () => {
  is_count_finished.value = true;
  start_resend.value = false;
};
const reSend = async () => {
  if (await useAuthStore().verifyPhoneNumber(phone, false, true)) {
    start_resend.value = true;
    is_count_finished.value = false;
  }
};
const cancelRegister = () => {
  let noData = true;
  if (data.value.code) {
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
const phone = useAuthStore().verify_phone_value;

const data = ref({
  code: "",
});

const loading = ref(false);
const OTPLoading = ref(false);

const onFinish = async () => {
  loading.value = true;
  OTPLoading.value = true;

  if (await useAuthStore().confirmPhoneNumber(data.value.code)) {
    emit("nextStep");
    clearInterval.value = true;
  }

  loading.value = false;
  OTPLoading.value = false;
};
</script>
