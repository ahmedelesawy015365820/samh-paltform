<template>
  <div class="appSection text-center">
    <v-row>
      <v-col cols="12" md="6">
        <h1 data-aos="flip-left">{{ $t("pages.home.apps.title") }}</h1>
        <p class="para">{{ $t("pages.home.apps.para") }}</p>

        <div class="apps mt-5 mb-15">
          <div class="app mt-3">
            <a>
              <Icon size="35" name="mdi:apple" />
              <p>
                <span>{{ $t("footer.downloadApp") }}</span>
                <span>{{ $t("footer.appleStore") }}</span>
              </p>
            </a>
          </div>
          <div class="app mt-3">
            <a>
              <Icon size="30" name="bi:google-play" />
              <p>
                <span>{{ $t("footer.getItIn") }}</span>
                <span>{{ $t("footer.googlePlay") }}</span>
              </p>
            </a>
          </div>
        </div>

        <div class="qr_code d-flex align-center justify-center ga-5">
          <div class="out_img" data-aos="fade-left">
            <NuxtImg
              preset="default"
              alt="scan Qr code border"
              src="/images/Qr_border.png"
              width="130"
              height="130"
            />
            <div class="in_img">
              <NuxtImg
                preset="default"
                alt="scan Qr code"
                src="/images/Qr.png"
                width="100"
                height="100"
              />
            </div>
          </div>

          <div class="hint d-flex align-center ga-2" data-aos="fade-right">
            <Icon size="30" name="mingcute:fullscreen-line" />
            {{ $t("pages.home.apps.scan") }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="bg_img">
          <div class="out_img">
            <NuxtImg
              preset="default"
              alt="Apps Bg"
              src="/images/bg/apps_bg.png"
            />
          </div>
          <div class="in_img" data-aos="zoom-in">
            <NuxtImg
              preset="default"
              alt="Apps Mobile"
              src="/images/bg/apps_mobile.png"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@keyframes rotate_360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.appSection {
  background: var(--secondary);
  padding: 60px;

  * {
    color: #fff;
  }

  .apps {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    & > div:first-child {
      margin-inline-end: 40px;
    }

    .app {
      a {
        display: flex;
        align-items: center;
        padding-block: 10px;
        padding-inline-end: 30px;
        padding-inline-start: 20px;
        flex-grow: 1;
        border-radius: 20px;
        transition: all 0.3s linear;
        background: var(--primary);

        p {
          display: flex;
          flex-direction: column;

          span:first-child {
            font-size: 13px;
            font-weight: 300;
          }
          span:last-child {
            font-size: 14px;
            font-weight: 600;
            color: #fff;
          }
        }

        svg.icon {
          margin-inline-end: 12px;
          color: #fff;
        }
      }
    }
  }

  .qr_code {
    .out_img {
      position: relative;
      width: 130px;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;

      .in_img {
        position: absolute;
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.3s linear;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .hint {
      background-color: var(--primary);
      padding: 5px 10px;
      border-radius: 10px;
      font-size: 17px;
    }
  }

  .bg_img {
    position: relative;
    height: 100%;

    .out_img {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: rotate_360 15s linear infinite;
    }

    .in_img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
