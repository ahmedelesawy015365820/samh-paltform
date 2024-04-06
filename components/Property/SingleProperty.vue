<template>
  <div class="single_property">
    <div class="image">
      <NuxtImg
        preset="default"
        :src="property.image"
        alt="property image"
        width="370px"
        height="240px"
      />

      <div class="fixed">
        <!-- <span class="badge">{{ property.advertisment_type }}</span> -->
        <span class="badge">{{ lang == "ar" ? "بيع" : "Sell" }}</span>
        <span @click="addToFav" class="fave"
          ><Icon size="30" name="ic:outline-favorite"
        /></span>
        <div class="overlay"></div>
      </div>
    </div>

    <main class="d-flex">
      <div class="flex-grow-1">
        <!-- <h5 class="h_5 mb-0">{{ property.title }}</h5> -->
        <h5 class="h_5 mb-0">
          {{ lang == "ar" ? "فيلا بالرياض" : "Villa In Riyadh" }}
        </h5>
        <p class="para sm">
          <span class="me-1"
            ><Icon name="material-symbols-light:location-on-outline"
          /></span>
          <!-- {{ property.location }} -->
          {{ lang == "ar" ? "الرياض - الروضة" : "Riyadh - El-Rawda" }}
        </p>

        <ul class="amenities">
          <li>
            <span class="icon">
              <Icon size="18" name="fluent-emoji-high-contrast:person-in-bed" />
            </span>
            {{ $t("property.bed") }} {{ property.beds_number || 3 }}
          </li>
          <li>
            <span class="icon">
              <Icon size="18" name="fluent-emoji-high-contrast:bathtub" />
            </span>
            {{ $t("property.bath") }} {{ property.beds_number || 4 }}
          </li>
          <li>
            <span class="icon">
              <Icon size="18" name="mdi:arrow-expand-all" />
            </span>
            {{ property.beds_number || 1200 }} {{ $t("property.meter") }}
          </li>
        </ul>

        <h3 class="price text-primary mt-2 mb-0">
          $ {{ property.price || "590,693" }}
        </h3>
      </div>
      <ul class="actions">
        <li class="action">
          <Icon size="20" name="mdi:chat-outline" />
        </li>
        <li class="action">
          <Icon size="20" name="ph:phone-bold" />
        </li>
        <li class="action">
          <Icon size="20" name="icon-park-twotone:share-one" />
        </li>
      </ul>
    </main>

    <footer class="footer d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-2 px-4">
        <nuxt-link class="image" to="/profile">
          <nuxt-img
            class="rounded-circle d-block"
            preset="default"
            width="50"
            height="50"
            :src="property?.owner?.image || 'images/avatars/nav.jpg'"
          ></nuxt-img>
        </nuxt-link>

        <div class="txt">
          <span>
            {{ property?.owner?.name || "John Doe" }}
          </span>
          <a
            class="para"
            :href="`mailto:${property?.owner?.email || '@Jenny Wilson'}`"
            >{{ property?.owner?.email || "@Jenny Wilson" }}</a
          >
        </div>
      </div>

      <div class="time">
        <p>
          {{ $t("property.license") }}: {{ property?.license || "123456789" }}
        </p>
        <p>
          {{ $t("property.since") }} {{ property?.created_at || 9 }}
          {{ $t("property.hours_ago") }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const addToFav = (e) => {
  e.currentTarget.classList.toggle("active");
};

const lang = computed(() => {
  return useHelpers().lang();
});
</script>

<style lang="scss" scoped>
.single_property {
  box-shadow: 0 0 10px var(--shadow);
  border-radius: 10px;
  overflow: hidden;

  & > .image {
    position: relative;
    height: 240px;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 7px 7px 0 0;
      object-fit: cover;
    }

    .fixed {
      span.badge {
        position: absolute;
        top: 0;
        left: 20px;
        background-color: var(--primary);
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        border-radius: 0 0 10px 10px;
        width: 50px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
      }

      span.fave {
        position: absolute;
        top: 5px;
        right: 10px;
        color: #fff;
        z-index: 2;

        &:hover,
        &.active {
          color: var(--primary);
        }
      }

      .overlay {
        z-index: 1;
        background: linear-gradient(
          180deg,
          rgba(0, 53, 245, 0.145) 0%,
          rgba(0, 0, 0, 0.087) 100%
        );
      }
    }
  }

  main {
    background-color: var(--main_bg);
    padding: 15px 8px 13px;

    h5 {
      font-weight: 600;
    }

    p {
      margin-inline-start: -3px;
    }

    ul.amenities {
      display: flex;
      margin-top: 15px;

      li {
        margin-inline-end: 15px;
        display: flex;
        align-items: center;
        color: var(--para);
        font-size: 14px;

        span.icon {
          margin-inline: 5px;
        }
      }
    }

    ul.actions {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      li {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-color: rgba(234, 161, 33, 0.1);
        color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }

  footer {
    padding-block: 15px;
    padding-inline-end: 10px;
    border-top: 1px solid var(--border);
    background-color: var(--main_bg);

    .image {
      position: relative;
      img {
        cursor: pointer;
      }
    }

    .txt {
      display: flex;
      flex-direction: column;
      line-height: 20px;

      span {
        font-weight: 600;
        font-size: 16px;
      }

      a {
        font-size: 14px;
        color: var(--para);
        margin-inline-start: -2px;
      }
    }

    .time {
      line-height: 23px;

      p {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
