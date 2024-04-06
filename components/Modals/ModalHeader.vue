<template>
  <header class="modalHeader">
    <h4 class="h_4">{{ title }}</h4>
    <span @click="$emit('close')" class="close"
      ><Icon size="30" name="mdi:close-octagon-outline"
    /></span>
  </header>
</template>

<script setup>
const emits = defineEmits(["close"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.modalHeader {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 30px;

  h4 {
    color: var(--secondary);
    font-weight: 600;
  }
  .close {
    cursor: pointer;

    svg.icon {
      color: #f00 !important;
    }
  }
}
</style>
