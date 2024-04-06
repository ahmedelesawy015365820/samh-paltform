<template>
  <div class="custom_input select" v-bind:="$attrs">
    <label v-if="label && up_mode"
      ><span class="text">{{ label }}</span>
      <span class="asterisk" :title="$t('validation.required')">
        <Icon
          v-if="required"
          size="7"
          color="#db0000"
          name="mdi:asterisk" /></span
    ></label>

    <v-autocomplete
      variant="solo"
      density="compact"
      @update:modelValue="updateValue"
      :placeholder="placeholder"
      :loading="loading"
      :deletable-chips="true"
      :items="isStatic ? staticItems : items"
      :disabled="disabled"
      :rules="allRules"
      :return-object="true"
      :label="_label"
      item-title="name"
      item-value="id"
      v-bind:="$attrs"
    >
      <template v-slot:append-inner>
        <slot name="appendInner"></slot>
      </template>

      <template v-slot:prepend-inner>
        <slot name="prependInner"></slot>
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },

  staticItems: {
    required: false,
    type: Array,
    default: () => [],
  },
  getUrl: {
    required: false,
    type: String,
  },
  modelValue: {
    required: true,
  },
  _sync: {
    required: false,
    type: Object,
    default: () => {},
  },
  rules: {
    require: false,
    type: Array,
    default: () => [],
  },
  required: {
    require: false,
    type: Boolean,
    default: false,
  },
  label: {
    required: false,
    default: "",
    type: String,
  },
  placeholder: {
    required: false,
    default: "",
    type: String,
  },
  up_mode: {
    required: false,
    default: false,
    type: Boolean,
  },
});

const _label = computed(() => {
  if (props.up_mode) return "";
  return props.label || props.placeholder;
});

onMounted(async () => {
  await nextTick();
  await getSelectItems();
});

const loading = ref(false);

const isStatic = computed(() => {
  return props.staticItems.length > 0;
});

const items = ref([]);

const staticItems = computed(() => {
  return props.staticItems;
});

const _sync = computed(() => {
  return props._sync;
});
watch(_sync, () => {
  getSelectItems();
  emits("update:modelValue", null);
  items.value = [];
});

const disabled = computed(() => {
  return props.disabled || loading.value || props._sync === null;
});

const dumy_data = ref(null);

if (useHelpers().lang() == "en") {
  dumy_data.value = [
    {
      id: 1,
      name: "Option 1",
    },
    {
      id: 2,
      name: "Option 2",
    },
    {
      id: 3,
      name: "Option 3",
    },
    {
      id: 4,
      name: "Option 4",
    },
    {
      id: 5,
      name: "Option 5",
    },
  ];
} else {
  dumy_data.value = [
    {
      id: 1,
      name: "الخيار 1",
    },
    {
      id: 2,
      name: "الخيار 2",
    },
    {
      id: 3,
      name: "الخيار 3",
    },
    {
      id: 4,
      name: "الخيار 4",
    },
    {
      id: 5,
      name: "الخيار 5",
    },
  ];
}

const getSelectItems = async () => {
  if (isStatic.value || disabled.value) {
    return;
  }

  loading.value = true;
  const { data } = await useMyFetch(props.getUrl);
  items.value = data.value ? data.value.data : dumy_data.value;
  loading.value = false;
};

const allRules = computed(() => {
  if (!props.required) {
    return [];
  }
  let default_rules = [props.required ? useInputRules().required : () => true];

  return [...props.rules, ...default_rules];
});

const updateValue = (e) => {
  emits("update:modelValue", e);
};
</script>
