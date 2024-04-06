<template>
  <div class="stepThree">
    <v-form ref="form" class="auth" @submit.prevent="signup">
      <main class="inputs">
        <v-row dense>
          <!-- Names -->
          <v-col cols="12" md="6">
            <base-input
              type="text"
              v-model="data.first_name_ar"
              :label="$t('labels.first_name')"
              :placeholder="$t('placeholderes.first_name')"
              required
              :rules="[useInputRules().only_ar_letters]"
              up_mode
            ></base-input>
          </v-col>
          <v-col cols="12" md="6">
            <base-input
              type="text"
              v-model="data.second_name_ar"
              :label="$t('labels.second_name')"
              :placeholder="$t('placeholderes.second_name')"
              required
              :rules="[useInputRules().only_ar_letters]"
              up_mode
            ></base-input>
          </v-col>
          <v-col cols="12" md="6">
            <base-input
              type="text"
              v-model="data.third_name_ar"
              :label="$t('labels.third_name')"
              :placeholder="$t('placeholderes.third_name')"
              required
              :rules="[useInputRules().only_ar_letters]"
              up_mode
            ></base-input>
          </v-col>
          <v-col cols="12" md="6">
            <base-input
              type="text"
              v-model="data.last_name_ar"
              :label="$t('labels.family_name')"
              :placeholder="$t('placeholderes.family_name')"
              required
              :rules="[useInputRules().only_ar_letters]"
              up_mode
            ></base-input>
          </v-col>

          <!-- Email -->
          <v-col cols="12">
            <base-input
              type="email"
              v-model="data.email"
              :label="$t('labels.email')"
              :placeholder="$t('placeholderes.email')"
              :rules="[useInputRules().email]"
              up_mode
            ></base-input
          ></v-col>

          <!-- <v-col cols="12" md="6">
            <DatePicker v-model="data.date" />
          </v-col>
          <v-col cols="12" md="6">
            <RadioInput
              required
              v-model="data.gender"
              :items="genders"
              :label="$t('labels.gender')"
            />
          </v-col> -->

          <!-- Address -->
          <v-col cols="12" md="4">
            <select-input
              v-model="data.region"
              getUrl="member/lookups/regions"
              :label="$t('labels.region')"
              :placeholder="$t('placeholderes.region')"
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
              :placeholder="$t('placeholderes.city')"
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
              :placeholder="$t('placeholderes.district')"
              up_mode
            />
          </v-col>

          <!-- Passwords -->
          <v-col cols="12">
            <ConfirmPassword v-model="data.passwords" />
          </v-col>
        </v-row>
      </main>

      <footer class="footer mt-15">
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
        <p>
          {{ $t("auth.register.footer") }}
          <button class="colored">
            <router-link to="/authentication/login">{{
              $t("form.login")
            }}</router-link>
          </button>
        </p>
      </footer>
    </v-form>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();

const cancelRegister = () => {
  let noData = true;
  if (Object.values(data.value).some((value) => !!value)) {
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

const data = ref({
  first_name_ar: null,
  second_name_ar: null,
  third_name_ar: null,
  last_name_ar: null,

  region: null,
  city: null,
  district: null,

  email: null,
  passwords: null,
});

const form = ref(null);
const loading = ref(false);
const signup = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  if (await useAuthStore().signup(data.value)) {
    navigateTo("/authentication/login");
  }
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
