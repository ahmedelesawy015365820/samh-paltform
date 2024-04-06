<template>
  <div>
    <h1>Profile</h1>
    <base-button class="animate_primary_filled" @click="logOut">
      LogOut
    </base-button>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.profile.title"),
});
definePageMeta({
  requireAuth: true,
});

const { logOut } = useAuthStore();
</script>
