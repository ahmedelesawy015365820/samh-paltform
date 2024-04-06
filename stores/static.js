export const useStaticStore = defineStore("statics", () => {
  const privacy = ref(null);
  const getPrivacy = async () => {
    const data = await staticService().getPrivacy();
    if (data) {
      privacy.value = data;
    }

    return data;
  };

  const terms = ref(null);
  const getTerms = async () => {
    const data = await staticService().getTerms();
    if (data) {
      terms.value = data;
    }
    return data;
  };

  const faqs = ref([]);
  const getFaqs = async () => {
    const data = await staticService().getFaqs();
    if (data) {
      faqs.value = data;
    }
    return data;
  };

  return {
    privacy,
    getPrivacy,

    terms,
    getTerms,

    faqs,
    getFaqs,
  };
});
