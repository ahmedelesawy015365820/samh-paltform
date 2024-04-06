<template>
  <div class="contactUs">
    <topBanner
      :title="$t('pages.support.title')"
      :subtitle="$t('pages.support.sub_title')"
      image="/images/static/contact_us.png"
    />

    <main class="main">
      <v-container>
        <div class="section_1">
          <v-row>
            <v-col cols="12" md="6">
              <ContactForm />
            </v-col>
            <v-col cols="12" md="6">
              <div class="text">
                <div>
                  <h3 class="h_3">{{ $t("pages.support.title1") }}</h3>
                  <p class="para">{{ $t("pages.support.para1") }}</p>
                </div>

                <div class="my-10">
                  <h4 class="h_4">{{ $t("pages.support.complain.title") }}</h4>
                  <p class="para mb-5">
                    {{ $t("pages.support.complain.para") }}
                  </p>
                  <ul>
                    <li>
                      <p class="para">
                        {{ $t("pages.support.complain.step1") }}
                      </p>
                    </li>
                    <li>
                      <p class="para">
                        {{ $t("pages.support.complain.step2") }}
                      </p>
                    </li>
                    <li>
                      <p class="para">
                        {{ $t("pages.support.complain.step3") }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="mb-0">
                    {{ $t("pages.support.complain.sub_title") }}
                  </h5>
                  <p class="para">
                    {{ $t("pages.support.complain.sub_para") }}
                  </p>
                </div>

                <div class="info my-2">
                  <div>
                    <a href="mailto:+0559333360" class="text-subtitle-2">
                      0559333360
                    </a>
                    -
                    <a href="mailto:0112456403" class="text-subtitle-2">
                      0112456403
                    </a>
                  </div>
                  <p class="para mt-1">
                    {{ $t("pages.support.complain.mail") }}
                    <a class="text-subtitle-2" href="mailto:info@samh.com.sa"
                      >support@samh.com.sa</a
                    >
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <section class="section_2 mt-16" data-aos="fade-left">
          <h3 class="h_3">{{ $t("pages.support.title2") }}</h3>
          <p class="para">{{ $t("pages.support.para2") }}</p>

          <div class="office_card">
            <NuxtImg
              preset="default"
              src="/images/office.svg"
              width="120"
              height="120"
              class="mb-8"
            />

            <h5 class="h_5">{{ $t("pages.support.city") }}</h5>
            <p class="para gray">{{ $t("pages.support.location") }}</p>
            <h6 class="h_6">0112456403</h6>
            <a href="/google" class="underline text-subtitle-2">{{
              $t("pages.support.googleMap")
            }}</a>
          </div>
        </section>

        <section class="section_3" data-aos="fade-up-right">
          <v-row align="center">
            <v-col cols="12" md="7">
              <h2 class="h_2">{{ $t("pages.support.title3") }}</h2>
              <p class="para">{{ $t("pages.support.para3") }}</p>
            </v-col>
            <v-col cols="12" md="5">
              <base-button class="with_icon animate_dark dark xl">
                0112456403
                <Icon class="ms-2" size="20" color="#fff" name="mdi:phone" />
              </base-button>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </main>

    <div class="chatboot">
      <ChatBoot />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.support.title"),
});
definePageMeta({
  requireAuth: false,
});
</script>

<style lang="scss" scoped>
.contactUs {
  position: relative;

  .header {
    height: 80vh;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.414),
        rgba(0, 0, 0, 0.169)
      ),
      url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    background-size: cover;
  }

  main.main {
    padding: 50px 0;

    h4,
    h3,
    h5 {
      color: var(--secondary_text) !important;
    }

    ul {
      list-style: circle;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }

    .section_2 {
      text-align: center;
      padding-block: 50px;

      .office_card {
        background: var(--main_bg);
        padding: 80px;
        box-shadow: 0px 10px 40px var(--shadow_1);
        width: fit-content;
        margin: 50px auto;
        border-radius: 10px;
      }
    }

    .section_3 {
      background: var(--main_bg);
      padding: 90px 0;
    }
  }
}
</style>
