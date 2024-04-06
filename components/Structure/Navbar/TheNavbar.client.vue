<template>
  <section class="navs">
    <nav
      class="theNav"
      :class="{
        stikyNav: stikyNav && !props.dash_nav,
        inView: inView && !props.dash_nav,
        dash_nav: props.dash_nav,
        sidebar_is_closed: sidebar_is_closed,
        mobile: useHelpers().isSmallScreen(),
        header_nav: is_header_nav,
      }"
    >
      <v-container class="pt-0">
        <UpperNav v-if="is_header_nav && !stikyNav"></UpperNav>

        <div class="wrapper d-flex align-center">
          <div
            v-if="dash_nav"
            class="hamburger-icon me-8"
            @click="emit('toggleSidebar')"
            :class="{ open: sidebar_is_closed }"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="d-flex align-center me-auto">
            <Logo
              v-if="!props.dash_nav"
              class="me-md-7 me-2 flex-shrink-0"
              :stiky="stikyNav"
              :header_nav="is_header_nav"
              :header_nav_mobile="useHelpers().isSmallScreen()"
              :mobile="useHelpers().isSmallScreen()"
            />

            <div class="d-flex align-center">
              <Links
                :navLinks="navLinks"
                class="d-none d-md-flex me-2 bigScreen"
              />
              <!-- <SearchMenu class="mx-2 d-none d-md-block" /> -->
            </div>
          </div>

          <div class="d-flex align-center ga-4">
            <div
              class="v-step-0 d-flex align-center ga-4"
              v-if="!props.dash_nav"
            >
              <div v-if="useHelpers().isSmallScreen()">
                <nuxt-link v-bind="props" to="/dashboard/properties/add">
                  <v-btn
                    class="d-flex justify-center align-center pa-5"
                    color="primary"
                    aria-label="add-property"
                    density="compact"
                    icon="mdi-plus-circle-multiple"
                  ></v-btn>
                </nuxt-link>
              </div>
              <div v-else>
                <base-button
                  class="with_icon filled animate_primary_filled"
                  aria-label="Add Property"
                  link
                  to="/dashboard/properties/add"
                >
                  <span
                    ><Icon class="ms-1" name="mdi:plus-circle-multiple" />
                  </span>
                  {{ $t("form.add_property") }}
                </base-button>
              </div>

              <div v-if="useHelpers().isSmallScreen()">
                <nuxt-link v-bind="props" to="/dashboard/properties/add">
                  <v-btn
                    class="d-flex justify-center align-center pa-5"
                    color="primary"
                    aria-label="request-property"
                    density="compact"
                    icon="mdi-office-building-plus-outline"
                  ></v-btn>
                </nuxt-link>
              </div>
              <div v-else>
                <base-button
                  class="filled animate_dark"
                  :class="{ wihte: !stikyNav && is_header_nav }"
                  aria-label="Add Property"
                  link
                  to="/dashboard/properties/add"
                >
                  <span> </span>
                  {{ $t("form.request_property") }}
                </base-button>
              </div>
            </div>

            <NavAuth v-if="!useAuthStore().user" />

            <div class="d-flex flex-shrink-0 align-center ga-4 me-4">
              <UserMenu v-if="useAuthStore().user" />
              <notification-menu
                :sticky="stikyNav || props.dash_nav"
                :header_nav="is_header_nav"
                url="/lol"
              ></notification-menu>
              <ToggleLinksMenu
                :navLinks="navLinks"
                v-if="useHelpers().isSmallScreen()"
              />
            </div>
          </div>
        </div>
      </v-container>
    </nav>
    <LowerNav />
  </section>
</template>

<script setup>
const emit = defineEmits(["toggleSidebar"]);
const props = defineProps({
  dash_nav: Boolean,
  sidebar_is_closed: Boolean,
});

const is_header_nav = computed(() => {
  return useRoute().fullPath == "/";
});

const navLinks = [
  {
    title: useNuxtApp().$i18n.t("navbar.support"),
    link: "/support",
  },
  {
    title: useNuxtApp().$i18n.t("navbar.auctions"),
    link: "/",
  },
];

import { useAuthStore } from "~/stores/auth";

const stikyNav = ref(false);
const inView = ref(false);

onMounted(() => {
  setTimeout(() => {
    const NAV_HEIGHT = document.querySelector("nav.theNav").clientHeight;

    window.addEventListener("scroll", () => {
      let documentScrollTop = document.documentElement.scrollTop;

      stikyNav.value = documentScrollTop > NAV_HEIGHT;
      inView.value =
        documentScrollTop > NAV_HEIGHT + 10 &&
        useHelpers().scrollDirection() == "down";
    });
  }, 10);
});
</script>

<style lang="scss">
.theNav {
  background: transparent;
  transition: all 0.3s ease-in-out;
  position: fixed;
  inset: 0;
  width: 100%;
  height: fit-content;
  z-index: 999;
  background: var(--main_bg);
  box-shadow: 0 0 10px var(--shadow);

  .wrapper {
    @media (max-width: 960px) {
      .links,
      .NavMenu {
        display: none;
      }
      .toggleMenu {
        display: block;
      }
    }
  }

  &.header_nav:not(.stikyNav) {
    background: transparent;
    box-shadow: none;
    background: transparent;

    .wrapper {
      padding-top: 10px;
      .search {
        color: #fff;
      }
      ul.bigScreen {
        li {
          a {
            color: #fff;
          }
        }
      }
      .navAuth {
        .base_button {
          color: #fff;
        }
      }
      a.base_button.animate {
        color: #fff;
        border-color: #fff;
      }
      .notification {
        svg.icon {
          color: #fff;
        }
      }
      .NavMenu {
        svg.icon {
          color: #fff;
        }
      }
      .toggleMenu {
        svg.icon {
          color: #fff;
        }
      }
      .user {
        header {
          .txt {
            color: #fff;
          }
        }
      }
    }
  }

  &.dash_nav {
    inset: unset;
    width: 100%;
    transition: var(--layout_transition);
    right: var(--sidebar_width);
    left: 0;
    width: calc(100vw - var(--sidebar_width));
    z-index: 999;
    height: var(--header_height);
    padding-inline: var(--layout_inline_padding);
    display: flex;
    align-items: center;
    justify-content: center;

    .v-container {
      padding: 0;
      width: 100%;
      margin: 0;
      max-width: unset;
    }

    &.sidebar_is_closed {
      right: var(--sidebar_close_width);
      width: calc(100vw - var(--sidebar_close_width));
    }

    &.mobile {
      right: 0 !important;
      left: 0 !important;
      width: 100% !important;
    }
  }

  &.stikyNav {
    padding: 0;
    position: fixed;
    top: -100px;
    width: 100%;
    z-index: 999;
    height: var(--header_height);
    @include flex_center;
    .v-container {
      padding-block: 0;
    }
  }
  &.inView {
    top: 0;
  }
}

body.ltr {
  .theNav {
    &.dash_nav {
      right: unset;
      left: var(--sidebar_width);
    }

    &.sidebar_is_closed {
      left: var(--sidebar_close_width);
    }
  }
}
</style>
