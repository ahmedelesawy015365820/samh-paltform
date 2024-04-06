<template>
  <header class="header">
    <video class="hero_video" ref="videoPlayer" autoplay muted loop>
      <source src="/videos/hero_bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="content">
      <div class="text">
        <h1 class="h_1" v-html="$t('header.title_1')"></h1>
        <p class="mb-4" v-html="$t('header.para')"></p>
      </div>

      <HomeFilter />
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
header.header {
  padding: 10px;
  background-size: cover;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, #02285996 100%);
  }

  .hero_video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .content {
    position: relative;
    width: 95%;
    text-align: center;

    @media (min-width: 1200px) {
      width: 1000px;
    }
    & > .text {
      color: #fff;
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80%;
      margin: 40px auto 10px;

      p {
        font-weight: 400;
        font-size: 16px;
      }
    }

    @media (max-width: 600px) {
      width: 100%;
      & > .text {
        width: 100%;

        h1 {
          font-size: 25px;
        }

        p {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
