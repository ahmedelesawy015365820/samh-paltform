<template>
  <div class="sellingSection">
    <v-row>
      <v-col cols="12" md="6">
        <h2 class="h_2">{{ $t("pages.home.selling.title") }}</h2>

        <ul class="my-10">
          <li class="d-flex align-center mb-5" data-aos="fade-down">
            <span>
              <NuxtImg
                src="/icons/percent.png"
                alt="selling"
                width="30"
                height="30"
              />
            </span>
            <div class="text">
              <h4 claas="h_4">{{ $t("pages.home.selling.list[0].title") }}</h4>
              <p class="para">{{ $t("pages.home.selling.list[0].para") }}</p>
            </div>
          </li>
          <li
            class="d-flex align-center mb-5"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <span>
              <NuxtImg
                src="/icons/handshake.png"
                alt="selling"
                width="30"
                height="30"
              />
            </span>
            <div class="text">
              <h4 claas="h_4">{{ $t("pages.home.selling.list[1].title") }}</h4>
              <p class="para">{{ $t("pages.home.selling.list[1].para") }}</p>
            </div>
          </li>
          <li
            class="d-flex align-center mb-5"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            <span>
              <NuxtImg
                src="/icons/home.png"
                alt="selling"
                width="30"
                height="30"
              />
            </span>
            <div class="text">
              <h4 claas="h_4">{{ $t("pages.home.selling.list[2].title") }}</h4>
              <p class="para">{{ $t("pages.home.selling.list[2].para") }}</p>
            </div>
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="6">
        <div class="image">
          <NuxtImg
            src="/images/bg/rate.png"
            alt="selling"
            width="570"
            height="470"
            class="first"
          />

          <div class="rate">
            <span class="check">
              <Icon size="15" name="ic:outline-check" />
            </span>
            <span class="rate_number">4.8</span>
            <ul class="rate_icons">
              <li class="rate_icon" v-for="start in 5">
                <Icon size="17" name="ic:round-star" />
              </li>
            </ul>
            <span class="trust">{{ $t("pages.home.selling.trust") }}</span>
            <span class="reviews"
              >500+ {{ $t("pages.home.selling.reviews") }}</span
            >
          </div>

          <div class="analytics">
            <div>
              <span class="number"> 250+ </span>
              <span class="text">
                {{ $t("pages.home.selling.property_completed") }}</span
              >
            </div>
            <div>
              <span class="number"> 99% </span>
              <span class="text">
                {{ $t("pages.home.selling.happy_clients") }}</span
              >
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@keyframes up_down {
  0% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
  100% {
    transform: translateY(0) translateX(-50%);
  }
}
.sellingSection {
  h2 {
    line-height: 40px;
  }
  ul {
    li {
      span {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-inline-end: 20px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        line-height: 20px;
        h4 {
          font-size: 18px;
          font-weight: 600;
        }
        .para {
          font-size: 15px;
          font-weight: 400;
          color: #6c6c6c;
        }
      }

      &:nth-child(1) {
        span {
          background-color: #f5f5f5;
        }
      }
      &:nth-child(2) {
        span {
          background-color: #f5edff;
        }
      }
      &:nth-child(3) {
        span {
          background-color: #eafbee;
        }
      }
    }
  }

  .image {
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .rate {
      background: var(--main_bg);
      box-shadow: 0 0 10px var(--shadow);
      padding: 10px;
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 170px;

      span.check {
        background: var(--primary);
        color: #fff;
        width: 17px;
        height: 17px;
        border-radius: 4px;
        @include flex-center;
      }

      span.rate_number {
        font-size: 50px;
        font-weight: 500;
        color: var(--secondary);
        margin-bottom: -10px;
        margin-top: -10px;
      }

      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;

        li {
          color: var(--primary);
        }
      }

      span.trust {
        color: gray;
        font-size: 14px;
      }

      .reviews {
        color: var(--secondary);
        font-weight: 500;
        font-size: 14px;
      }
    }
    .analytics {
      background: var(--main_bg);
      box-shadow: 0 0 10px var(--shadow);
      padding: 15px 30px;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 25px;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span.number {
          font-size: 50px;
          font-weight: 500;
          color: var(--secondary);
          margin-bottom: -10px;
          margin-top: -10px;
        }

        span.text {
          color: gray;
          font-size: 16px;
        }
      }

      @media (max-width: 500px) {
        bottom: 0;
        width: 100%;

        div {
          span.number {
            font-size: 30px;
          }
          span.text {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
