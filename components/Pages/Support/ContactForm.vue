<template>
  <v-container>
    <v-form
      class="contact_form custom_card pt-3 px-4"
      @submit.prevent="sendForm"
    >
      <h4 class="h_4 mb-5">{{ $t("pages.support.form_title") }}</h4>

      <v-row dense>
        <v-col cols="12" md="6">
          <BaseInput
            hide-details
            up_mode
            v-model="contact.first_name"
            :label="$t('labels.first_name')"
            placeholder="John"
            class="ma-0"
        /></v-col>
        <v-col cols="12" md="6">
          <BaseInput
            hide-details
            up_mode
            v-model="contact.last_name"
            :label="$t('labels.last_name')"
            placeholder="Doe"
        /></v-col>
        <v-col cols="12">
          <BaseInput
            hide-details
            v-model="contact.email"
            :label="$t('labels.email')"
            placeholder="name@sample.com"
            type="email"
            up_mode
        /></v-col>
        <v-col cols="12">
          <select-input
            hide-details
            v-model="contact.subject"
            :label="$t('labels.subject')"
            :placeholder="$t('placeholderes.inquiry_complaint')"
            :staticItems="subjects"
            up_mode
        /></v-col>
        <v-col cols="12">
          <BaseInput
            hide-details
            v-model="contact.message"
            :label="$t('labels.message')"
            :placeholder="$t('labels.message_placeholder')"
            type="textarea"
            rows="5"
            up_mode
        /></v-col>
      </v-row>

      <base-button
        class="with_icon mb-2 animate_dark_filled filled block_center w-100 lg mt-0"
        :loading="loading"
        :disabled="loading"
        @click="submit"
        :label="$t('labels.send')"
        aria-label="SEND"
      >
        <Icon name="mdi:send" size="20" />
        {{ $t("form.send") }}
      </base-button>
    </v-form>
  </v-container>
</template>

<script setup>
const contact = reactive({
  first_name: "",
  last_name: "",
  email: "",
  message: "",
  subject: "",
});

const subjects = [
  { id: 1, name: useNuxtApp().$i18n.t("labels.inquiry"), value: 1 },
  { id: 2, name: useNuxtApp().$i18n.t("labels.complaint"), value: 2 },
];

const nuxtApp = useNuxtApp();
const Toast = nuxtApp?.$Swal?.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = nuxtApp.$Swal.stopTimer;
    toast.onmouseleave = nuxtApp.$Swal.resumeTimer;
  },
});
const sendForm = () => {
  Toast.fire({
    icon: "success",
    title: useHelpers().capitalizeEveryWord(
      nuxtApp.$i18n.t("form.sentSuccess")
    ),
  });
};
</script>

<style lang="scss" scoped>
.contact_form {
  width: 500px;

  @media (max-width: 1280px) {
    max-width: 95%;
  }
}
</style>
