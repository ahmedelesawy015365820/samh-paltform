<template>
  <nav
    class="sideNav"
    @click="$emit('openSidebar')"
    :class="{
      sidebar_is_closed: sidebar_is_closed,
      mobile: useHelpers().isSmallScreen(),
    }"
  >
    <header class="sidebar_header">
      <!-- <nuxt-link to="/profile">
        <div class="image">
          <NuxtImg
            preset="default"
            width="50"
            height="50"
            src="/images/avatars/nav.jpg"
          />
        </div>
        <h4 class="h_4 mb-0 mt-1">
          {{ sidebar_is_closed ? "...." : user.first_name_ar }}
        </h4>
      </nuxt-link>
      <p class="text-caption">
        {{ sidebar_is_closed ? "...." : user.email }}
      </p> -->
      <Logo fixed_theme="light" :mobile="sidebar_is_closed" />
    </header>

    <v-list
      :class="{ sidebar_is_closed: sidebar_is_closed }"
      class="dashList"
      v-model:opened="open"
      density="compact"
      nav
    >
      <div
        class="sidebar_item mb-2"
        v-for="(item, index) in sidbar_items"
        :key="item.id"
      >
        <template v-if="item.link">
          <div
            v-if="item.groupTitle"
            class="sub_header"
            :class="{ sidebar_is_closed: sidebar_is_closed }"
          >
            {{ sidebar_is_closed ? "..." : item.groupTitle }}
          </div>
          <v-list-item
            :key="index"
            :value="item.id"
            :to="item.link"
            color="primary"
          >
            <template v-slot:prepend>
              <Icon :name="item.icon" />
            </template>

            <v-list-item-title v-text="item.title"></v-list-item-title>

            <template v-if="item.append" v-slot:append>
              <span class="hot">{{ item.append }}</span>
            </template>
          </v-list-item>
        </template>

        <template v-if="item.childs && item.childs.length > 0">
          <div
            v-if="item.groupTitle"
            class="sub_header"
            :class="{ sidebar_is_closed: sidebar_is_closed }"
          >
            {{ sidebar_is_closed ? "..." : item.groupTitle }}
          </div>
          <v-list-group color="primary" :value="item.id">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title">
                <template v-slot:prepend>
                  <Icon :name="item.icon" />
                </template>
              </v-list-item>
            </template>

            <template
              v-for="(child, child_index) in item.childs"
              :key="child_index"
            >
              <template v-if="child.link">
                <v-list-item
                  :title="child.title"
                  :prepend-icon="child.icon ? child.icon : 'mdi-minus'"
                  :value="child.id"
                  :to="child.link"
                  color="primary"
                ></v-list-item>
              </template>

              <template v-if="child.childs && child.childs.length > 0">
                <v-list-group color="primary" :value="child.id">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="child.title">
                      <template v-slot:prepend>
                        <Icon :name="child.icon || 'mdi:minus'" />
                      </template>
                    </v-list-item>
                  </template>

                  <template
                    v-for="(sub_child, sub_child_index) in child.childs"
                    :key="sub_child_index"
                  >
                    <template v-if="sub_child.link">
                      <v-list-item
                        :title="sub_child.title"
                        :prepend-icon="
                          sub_child.icon
                            ? sub_child.icon
                            : 'mdi-rhombus-medium-outline'
                        "
                        :value="sub_child.id"
                        :to="sub_child.link"
                        color="primary"
                      ></v-list-item>
                    </template>
                  </template>
                </v-list-group>
              </template>
            </template>
          </v-list-group>
        </template>
      </div>
    </v-list>
  </nav>
</template>

<script setup>
const props = defineProps({
  sidebar_is_closed: Boolean,
});

import { useAuthStore } from "@/stores/auth";
const { user } = useAuthStore();

const { $i18n: locale } = useNuxtApp();

const sidbar_items = ref([
  // Main
  {
    id: "1",
    groupTitle: locale.t("sidebar.groupTitle_1"),
    title: locale.t("sidebar.properties.title"),
    icon: "ri:auction-line",
    childs: [
      {
        id: "1.1",
        title: locale.t("sidebar.properties.childs[0].title"),
        link: "/dashboard/properties",
      },
      {
        id: "1.2",
        title: locale.t("sidebar.properties.childs[1].title"),
        link: "/dashboard/properties/add",
      },
    ],
  },
]);

const open = ref([]);

watchEffect(() => {
  if (props.sidebar_is_closed) {
    open.value = [];
  } else {
    open.value = [];
  }
});
</script>

<style lang="scss">
.sideNav {
  position: fixed;
  right: 0;
  transition: var(--layout_transition);
  width: var(--sidebar_width);
  background-color: var(--secondary);
  color: #fff;

  .sidebar_header {
    border-bottom: 1px solid var(--list_item);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: var(--header_height);

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: inherit;

      .image {
        overflow: hidden;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        img {
          transition: all 0.2s linear;
          width: 50px;
          height: 50px;
          border-radius: 50%;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      h4 {
        transition: all 0.2s linear;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &.sidebar_is_closed {
    width: var(--sidebar_close_width);
    .sidebar_header {
      padding-inline: 10px;
      a {
        .image {
          width: 30px;
          height: 30px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  &.mobile {
    height: calc(100vh - var(--header_height));
    top: var(--header_height);
  }
}

body.ltr {
  .sideNav {
    right: unset;
    left: 0;
  }
}
</style>
