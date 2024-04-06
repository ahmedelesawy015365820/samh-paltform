<template>
  <footer class="theFooter">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <Logo />
          <p class="para my-5">{{ $t("footer.para") }}</p>

          <div class="license d-flex align-center ga-1">
            <!-- <NuxtImg
              class="flex-shrink-0"
              width="60"
              height="50"
              preset="default"
              src="/images/footer_license.png"
            />
            <p class="para my-5">{{ $t("footer.license_para") }}</p> -->
          </div>
        </v-col>

        <v-col cols="12" md="5">
          <v-row justify="center" class="row_links">
            <v-col cols="12" md="4" sm="6">
              <div>
                <h5 class="h_5 mb-6">{{ $t("footer.companyInfo") }}</h5>
                <ul class="links">
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.info.1")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.info.2")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.info.3")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.info.4")
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <div>
                <h5 class="h_5 mb-6">{{ $t("footer.quickLinks") }}</h5>
                <ul class="links">
                  <li>
                    <nuxt-link to="/support">{{
                      $t("footer.links.quick.1")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/terms">{{
                      $t("footer.links.quick.2")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/privacy">{{
                      $t("footer.links.quick.3")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.quick.4")
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <div>
                <h5 class="h_5 mb-6">{{ $t("footer.discover") }}</h5>
                <ul class="links">
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.discover.1")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.discover.2")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.discover.3")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{
                      $t("footer.links.discover.4")
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3">
          <div class="mb-10">
            <h5 class="h_5 mb-2">{{ $t("footer.upToDate") }}</h5>
            <div class="mail">
              <base-input
                v-model="email"
                name="email"
                type="email"
                hide-details
                :label="$t('footer.email')"
                class="flex-grow-1"
              >
                <template #appendInner>
                  <base-button
                    class="animte_primary_filled"
                    aria-label="SUBSCRIBE"
                    >{{ $t("footer.subscribe") }}</base-button
                  >
                </template>
              </base-input>
            </div>
          </div>
          <div class="mt-15">
            <h5 class="h_5">{{ $t("footer.followUs") }}</h5>
            <ul class="socials">
              <li class="facebook" data-aos="fade-up">
                <a>
                  <Icon size="18" name="ri:facebook-fill" />
                </a>
              </li>
              <li class="insta" data-aos="fade-up" data-aos-delay="200">
                <a>
                  <Icon size="18" name="ion:logo-instagram" />
                </a>
              </li>
              <li class="x" data-aos="fade-up" data-aos-delay="300">
                <a>
                  <Icon size="18" name="bi:twitter-x" />
                </a>
              </li>
              <li class="youtube" data-aos="fade-up" data-aos-delay="400">
                <a>
                  <Icon size="18" name="bi:youtube" />
                </a>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <div class="copyright">
        <div class="text">
          {{
            $t("footer.copyrights_1") +
            " " +
            new Date().getFullYear() +
            " " +
            $t("footer.copyrights_2")
          }}
        </div>

        <ul class="info d-flex align-center ga-5">
          <li class="mail d-flex align-center ga-2">
            <Icon size="20" name="ph:envelope-open-light" />
            <a href="mailto:info@samh.com.sa">info@samh.com.sa</a>
          </li>
          <li class="phone d-flex align-center ga-2">
            <Icon size="20" name="ph:phone-light" />
            <a href="tel:+0559333360">0559333360</a>
          </li>
        </ul>
      </div>
    </v-container>
  </footer>
</template>

<script setup>
const email = ref(null);
</script>

<style lang="scss">
.theFooter {
  background: var(--main_bg);
  min-height: 300px;
  padding: 40px 0 15px;
  color: var(--secondary);

  @media (max-width: 960px) {
    padding: 40px 0 50px;
  }

  .para {
    color: var(--secondary);
  }

  .mail {
    display: flex;

    .v-field {
      padding-inline-end: 0 !important;
      border-radius: 16px 0 0 16px !important;
    }

    button {
      height: var(--input_height);
      border-radius: 15px 0 0 15px;
      min-width: 130px;
      font-size: 15px;
    }
  }

  ul.socials {
    display: flex;
    align-items: center;

    li {
      margin-inline: 8px;
      background-color: #f8f9f9;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s linear;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        transition: transform 0.2s linear;
      }

      &:hover {
        &.facebook {
          background-color: #3b5998;
        }
        &.insta {
          background-color: #e1306c;
        }
        &.x {
          background-color: #1da1f2;
        }
        &.youtube {
          background-color: #ff0000;
        }

        a {
          color: #fff;
          transform: rotate(360deg);
        }
      }
    }
  }

  h5 {
    color: var(--secondary_text);
    font-weight: 600;
  }
  ul.links {
    li {
      margin-bottom: 8px;

      a {
        color: var(--footer_links);
        font-size: 15px;
        transition: all 0.4s linear;

        &:hover {
          text-decoration: underline;
          color: var(--footer_links_hover);
        }
      }
    }
  }

  .copyright {
    margin-top: 50px;
    padding: 30px 0 0 0;
    border-top: 1px solid #ffffff1a;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--border);

    .info {
      li {
        a {
          color: var(--secondary_text);
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    @media (max-width: 700px) {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }
}

body.ltr {
  footer.theFooter {
    .mail {
      .v-field {
        border-radius: 0 16px 16px 0 !important;
      }

      button {
        border-radius: 0 15px 15px 0;
      }
    }
  }
}
</style>
