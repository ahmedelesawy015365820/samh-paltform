export const usePropertyStore = defineStore("property", () => {
  const properties = ref(null);
  const current_property = ref({
    1: {
      has_license: "1",
      license_number: null,

      ownership: "owner",
      agency_number: null,

      advertisement_type: null,
    },
    2: {
      region: null,
      city: null,
      district: null,

      location: ref({ lat: "", lng: "", address: "" }),
    },
    3: {
      property_usage: null,
      property_type: null,
      property_descriptions: [],
      features_ids: [],
      utilities_ids: [],
    },
    4: {
      selling_price: null,
      is_negotiable: 1,
    },
    5: {
      video_url: null,
      images: [],
    },
  });

  const current_property_id = ref(null);
  const current_property_slug = ref(null);

  const addStep = async (my_form_data, step, id) => {
    const response_data = await propertyService().addPropertyStep(
      my_form_data,
      step,
      id
    );

    if (response_data) {
      if (step == 1) {
        current_property_id.value = response_data.id;
      }
      if (step == 4) {
        current_property_slug.value =
          useNuxtApp().$i18n.t == "en"
            ? response_data.slug_en
            : response_data.slug_ar;
      }
    }
    return response_data;
  };

  return {
    properties,
    current_property,
    addStep,
    current_property_id,
    current_property_slug,
  };
});
