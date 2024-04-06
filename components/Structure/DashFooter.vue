<template>
  <div class="dashFooter">
    <div class="text">{{ $t("footer.copyrights") }} ©</div>

    <div class="links">
      <span>
        <nuxt-link to="/support">Support</nuxt-link>
        <span class="mx-1">.</span>
      </span>
      <span>
        <nuxt-link to="/terms">Terms</nuxt-link>
        <span class="mx-1">.</span>
      </span>
      <span>
        <nuxt-link to="/privacy">Privacy</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.dashFooter {
  background: #181a20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-top: 10px;
  height: 60px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    & > div {
      width: fit-content;
    }
  }

  * {
    color: #bebdbd;
    font-size: 14px;
    font-weight: 500;
  }

  .links {
    a {
      transition: all 0.2s linear;
      &:hover {
        color: var(--primary_hover);
      }
    }
  }
}
</style>
