<template>
  <div class="upper_nav d-flex align-center">
    <div class="mail d-flex align-center">
      <Icon size="25" name="ph:envelope-open-light" />
      <h6 class="h_6 mb-0 px-1">{{ $t("navbar.upper.email_us") }}:</h6>
      <a href="mailto:info@samh.com.sa">info@samh.com.sa</a>
    </div>

    <div class="badge">
      {{ $t("navbar.upper.under_construction") }}
    </div>

    <div class="d-flex align-center ga-5">
      <div class="phone d-flex align-center">
        <span class="pe-1">
          <Icon size="25" name="ph:phone-light" />
        </span>
        <a href="tel:+0559333360">0559333360</a>
      </div>

      <SwitchLanguage />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.upper_nav {
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  padding-block: 10px;

  .mail,
  .phone {
    a {
      color: #f3f3f3;
      font-size: 14px;
      margin-bottom: -1px;
    }
  }

  .badge {
    background: crimson;
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 120px;
    height: 60px;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 30%,
      100% 56%,
      75% 100%,
      50% 70%,
      25% 100%,
      0 55%
    );

    padding: 10px 10px 0;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
}

body.ltr {
  .upper_nav {
    .badge {
      width: 200px;
    }
  }
}
</style>
