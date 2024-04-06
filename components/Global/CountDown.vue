<template>
  <div class="count-down">
    <span class="m-0">{{ countRef }}</span>
  </div>
</template>

<script setup>
const emit = defineEmits(["countFinished", "number_of_try_exceeded"]);
const props = defineProps({
  loob: {
    type: Boolean,
    required: false,
    default: false,
  },
  numberOfTry: {
    type: Number,
    required: false,
    default: 5,
  },
  clearInterval: {
    type: Boolean,
    required: false,
    default: false,
  },
  start: {
    type: Number,
    required: false,
    default: 10,
  },
});

const stop = computed(() => props.clearInterval);

const countRef = ref(0);
const numb_of_try = ref(0);

const intervalId = ref(null);

const countdown = (start, ref) => {
  if (stop.value) {
    clearInterval(intervalId.value);
    return;
  }

  if (numb_of_try.value > props.numberOfTry) {
    clearInterval(intervalId.value);
    emit("number_of_try_exceeded");
    return;
  }

  ref.value = start;
  intervalId.value = setInterval(() => {
    ref.value--;

    if (ref.value === 0) {
      if (stop.value) {
        clearInterval(intervalId.value);
        return;
      }

      clearInterval(intervalId.value);
      emit("countFinished");

      if (props.loob) {
        numb_of_try.value++;
        setTimeout(() => {
          countdown(10, countRef);
        }, 1000);
      }
    }
  }, 1000);
};

onMounted(() => {
  countdown(props.start, countRef);
});
</script>

<style lang="scss" scoped>
span {
  font-size: 15px;
  font-weight: 600;
  margin-inline: 5px;
}
</style>
