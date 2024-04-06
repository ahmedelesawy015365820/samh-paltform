<template>
  <div class="stepTow">
    <v-form ref="form" class="auth" @submit.prevent="submit">
      <main class="inputs">
        <div class="d-flex flex-column align-center">
          <v-chip color="primary" size="large" class="mb-3">{{
            useAuthStore().nafaz_verify_num
          }}</v-chip>

          <v-chip size="large">{{
            $t("auth.register.steps.step2.sub_title")
          }}</v-chip>
        </div>
      </main>
      <footer class="footer d-flex justify-center mt-16">
        <base-button
          :class="{ disabled: !is_count_finished }"
          :loading="loading"
          type="submit"
          class="lg animate_primary_filled check_nafaz"
          >{{ $t("form.check") }}
          <count-down
            :start="6"
            @number_of_try_exceeded="navigateTo('/authentication/login')"
            :clearInterval="clearInterval"
            loob
            @countFinished="submit"
          />
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

const is_count_finished = ref(true);
const start_resend = ref(false);

const cancelRegister = () => {
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
};

const clearInterval = ref(false);

import { useAuthStore } from "@/stores/auth";

const loading = ref(false);
const form = ref(null);
const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  is_count_finished.value = true;

  loading.value = true;
  if (await useAuthStore().checkNavazNum()) {
    is_count_finished.value = false;
    clearInterval.value = true;
    emit("nextStep");
  }
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.check_nafaz {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
</style>
