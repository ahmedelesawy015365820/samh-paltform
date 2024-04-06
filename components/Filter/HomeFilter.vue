<template>
  <div class="filter_comp">
    <v-form @submit.prevent="filter_data">
      <ul>
        <li
          :class="{ active: current_top_filter === 'buy' }"
          @click="current_top_filter = 'buy'"
        >
          <span>{{ $t("filter.header.buy") }}</span>
        </li>
        <li
          :class="{ active: current_top_filter === 'rent' }"
          @click="current_top_filter = 'rent'"
        >
          <span>{{ $t("filter.header.rent") }}</span>
        </li>
        <li
          :class="{ active: current_top_filter === 'sold' }"
          @click="current_top_filter = 'sold'"
        >
          <span>{{ $t("filter.header.sold") }}</span>
        </li>
      </ul>

      <div class="filter_comp__form">
        <section>
          <select-input
            :get-url="`member/lookups/property/types`"
            v-model="filter.type"
            :placeholder="$t('placeholderes.property_type')"
            hide-details
            class="out_filter_input"
            up_mode
          >
            <template #prependInner>
              <span class="me-2"><Icon name="iconoir:home-alt" /></span>
            </template>
          </select-input>
        </section>

        <section>
          <base-input
            v-model="filter.keyword"
            :placeholder="$t('placeholderes.search')"
            hide-details
            class="out_filter_input"
          >
            <template #prependInner>
              <span class="me-2"><Icon name="iconamoon:search-thin" /></span>
            </template>
          </base-input>

          <base-button
            type="submit"
            class="animate_primary_filled filled lg filter_button"
          >
            {{ $t("form.search") }}
          </base-button>
        </section>

        <section class="advance_filter v-step-2" @click="filterPop = true">
          <Icon name="bytesize:filter" />
          <span>{{ $t("filter.advanced") }}</span>
        </section>
      </div>
    </v-form>
  </div>

  <BaseModel
    :title="$t('header.filter.title')"
    :show="filterPop"
    @close="filterPop = false"
  >
    <v-form class="text-start filter_modal" @submit.prevent="filter_data">
      <div class="input_wrapper px-5">
        <v-row>
          <v-col cols="12">
            {{ filter.type }}
            <SelectInput
              :get-url="`/property/type`"
              :label="$t('labels.property_type')"
              :placeholder="$t('placeholderes.property_type')"
              v-model="filter.type"
              :return-object="false"
              hide-details
              up_mode
            />
          </v-col>

          <v-col cols="12" md="4">
            {{ filter.region }}
            <select-input
              v-model="filter.region"
              getUrl="member/lookups/regions"
              :label="$t('labels.region')"
              :placeholder="$t('placeholderes.region')"
              up_mode
            />
          </v-col>
          <v-col cols="12" md="4">
            <select-input
              v-model="filter.city"
              :getUrl="`member/lookups/cities?region_id=${filter.region?.id}`"
              :_sync="filter.region"
              :label="$t('labels.city')"
              :placeholder="$t('placeholderes.city')"
              up_mode
            />
          </v-col>
          <v-col cols="12" md="4">
            <select-input
              v-model="filter.district"
              :getUrl="`member/lookups/districts?city_id=${filter.city?.id}`"
              :_sync="filter.city"
              :label="$t('labels.district')"
              :placeholder="$t('placeholderes.district')"
              up_mode
            />
          </v-col>

          <!-- Advertising Type -->
          <v-col cols="12" class="mb-5">
            <div class="custom_input">
              <label
                ><span class="text">{{ $t("labels.advertisement_type") }}</span>
              </label>
              <v-radio-group
                v-model="filter.advertisement_type"
                hide-details
                color="primary"
              >
                <div class="card_wrapper advertisments">
                  <div
                    class="_card"
                    :class="{ active: filter.advertisement_type == _type.id }"
                    v-for="_type in advertisement_types"
                  >
                    <v-radio :key="_type.id" :value="_type.id" label="test" />
                    {{ _type.name }}
                  </div>
                </div>
              </v-radio-group>
            </div>
          </v-col>

          <!-- Usages -->
          <v-col cols="12" class="mb-5">
            <div class="custom_input">
              <label
                ><span class="text">{{ $t("labels.usages") }}</span>
              </label>
              <div class="card_wrapper">
                <div
                  :class="{ active: filter.usages_id.includes(usage.id) }"
                  class="_card"
                  v-for="usage in usages"
                >
                  <v-checkbox
                    v-model="filter.usages_id"
                    :label="usage.name"
                    :value="usage.id"
                    hide-details
                    color="primary"
                  />

                  {{ usage.name }}
                </div>
              </div>
            </div>
          </v-col>

          <!-- Price Range -->
          <v-col cols="12">
            <div class="custom_input">
              <label
                ><span class="text">{{ $t("labels.price_range") }}</span>
              </label>
              <v-range-slider
                v-model="filter.price_range"
                :min="50000"
                :max="10000000"
                :step="1000"
                hide-details
                thumb-label="always"
                color="primary"
                class="my-5"
              ></v-range-slider>

              <div class="price_info">
                <div class="from">
                  <span class="label">{{ $t("labels.from") }}</span>
                  <div>
                    <span class="value">{{ filter.price_range[0] }}</span>
                    <span class="currency">SAR</span>
                  </div>
                </div>
                <div class="to">
                  <span class="label">{{ $t("labels.to") }}</span>
                  <div>
                    <span class="value">{{ filter.price_range[1] }}</span>
                    <span class="currency">SAR</span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <footer class="filter_footer pt-5 pb-2 px-5 d-flex justify-space-between">
        <base-button
          class="animate_primary_filled filled with_icon"
          type="submit"
          :loading="loading"
        >
          <span>{{ $t("form.search") }} <Icon name="mdi:magnify" /></span>
        </base-button>

        <button
          type="button"
          class="text-subtitle-2 underline"
          @click="reset_filter"
        >
          {{ $t("form.reset_filter") }}
        </button>
      </footer>
    </v-form>
  </BaseModel>
</template>

<script setup>
// import { useLookupsStore } from "@/stores/lookups";
// const usages = await useLookupsStore().getUsages();
// console.log(usages);

const usages = [
  {
    id: 1,
    name: "Air Conditioning",
  },
  {
    id: 2,
    name: "Balcony",
  },
  {
    id: 3,
    name: "Cable TV",
  },
  {
    id: 4,
    name: "Dishwasher",
  },
  {
    id: 5,
    name: "Doorman",
  },
  {
    id: 6,
    name: "Elevator",
  },
  {
    id: 7,
    name: "Fireplace",
  },
  {
    id: 8,
    name: "Furnished",
  },
  {
    id: 9,
    name: "Gym",
  },
  {
    id: 10,
    name: "Laundry",
  },
  {
    id: 11,
    name: "Parking",
  },
  {
    id: 12,
    name: "Pool",
  },
  {
    id: 13,
    name: "Smoking allowed",
  },
  {
    id: 14,
    name: "Storage",
  },
  {
    id: 15,
    name: "Wheelchair accessible",
  },
];
const advertisement_types = [
  {
    id: 1,
    name: "Sell",
  },
  {
    id: 2,
    name: "Rent",
  },
];

const current_top_filter = ref("buy");

const filter = ref({
  type: null,
  region: null,
  city: null,
  district: null,
  keyword: null,
  price_range: [2000000, 5000000],
  usages_id: [],
  advertisement_type: null,
});

const filterPop = ref(false);
const filter_data = () => {
  // navigateTo({
  //   path: "/properties",
  //   query: {
  //     ...filter,
  //     current_top_filter: current_top_filter.value,
  //     price_range: filter.price_range.join(","),
  //     amenities_ids: filter.amenities_ids.join(","),
  //   },
  // });
};

const reset_filter = () => {
  filter.value.type = null;
  filter.value.region = null;
  filter.value.city = null;
  filter.value.district = null;
  filter.value.keyword = null;
  filter.value.price_range = [2000000, 5000000];
  filter.value.usages_id = [];
  filter.value.advertisement_type = null;

  console.log(filter.value);
};
</script>

<style lang="scss">
.filter_comp {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;

  ul {
    display: flex;
    background: var(--main_bg);
    border-radius: 15px 15px 0 0;
    width: fit-content;

    li {
      padding: 12px 40px;
      color: #717171;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 3px solid transparent;

      &.active {
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }

  .filter_comp__form {
    background: var(--main_bg);
    padding: 10px 20px 5px 20px;
    border-radius: 0 15px 15px 15px;
    display: flex;
    align-items: center;

    .out_filter_input {
      .v-filed {
        border: none !important;
      }
    }

    section {
      display: flex;
      align-items: center;
      flex-grow: 1;
      border-color: #f2972757 !important;

      &:not(:last-child) {
        padding-inline-end: 15px;
        border-right: 1px solid var(--border);
      }
      &:nth-of-type(2) {
        flex-grow: 2;
      }
      &:not(:first-child) {
        padding-inline-start: 15px;
      }

      .custom_input {
        width: 100%;
      }
    }

    .advance_filter {
      cursor: pointer;
      flex-grow: 0;
      gap: 10px;
      color: var(--primary);

      span {
        font-weight: 600;
      }
    }
  }

  .filter_button {
    height: 45px !important;
    width: 170px !important;
    margin-top: -8px;
  }

  @media (max-width: 820px) {
    flex-wrap: wrap;

    section {
      border: none !important;
      padding: 0 !important;
    }

    .filter_button {
      display: none;
    }

    .advance_filter {
      margin-top: -10px;
      span {
        display: none;
      }
    }
  }
}

.filter_modal {
  .price_info {
    display: flex;
    justify-content: space-around;
    .from,
    .to {
      width: 30%;

      span.label {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
        display: block;
      }

      div {
        border: 1px solid var(--border);
        color: gray;
        padding: 6px;
        border-radius: 7px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .card_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    &.advertisments {
      justify-content: flex-start;
    }
  }

  ._card {
    cursor: pointer;
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 10px;
    padding: 5px 20px;
    font-size: 14px;
    margin: 5px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    position: relative;

    .v-input,
    .v-selection-control {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;

      .v-label--clickable {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: block;
      }
    }

    &.active {
      background-color: var(--primary);
      color: #fff;
    }
  }

  footer.filter_footer {
    // border-top: 1px solid var(--border);
  }
}

body.rtl {
  .filter_comp {
    ul {
      border-radius: 15px 15px 0 0;
    }
    .filter_comp__form {
      border-radius: 15px 0 15px 15px;

      section {
        &:not(:last-child) {
          border-right: none;
          border-left: 1px solid var(--border);
        }
      }
    }
  }
}
</style>
