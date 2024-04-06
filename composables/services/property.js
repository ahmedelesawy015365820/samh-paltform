import { useLangStore } from "~/stores/lang";

export const propertyService = () => {
  const langStore = useLangStore();
  const nuxtApp = useNuxtApp();

  return {
    async addPropertyStep(form_data, step, id) {
      const url =
        "/member/property" +
        (id ? "/" + id : "") +
        (step == 5 ? "/submit" : "?step=" + step);

      const { data: response_data, error } = await useMyFetch(url, {
        method: step == 5 ? "PUT" : "POST",
        body: form_data,
      });

      if (useErrorHandler(error.value)) return;

      if (step == 5) {
        const message =
          langStore.current_lang == "en"
            ? "Property added successfully"
            : "تم اضافة العقار بنجاح";
        useSuccessToas(message);
      } else {
        const message =
          langStore.current_lang == "en"
            ? "Data saved successfully"
            : "تم حفظ البيانات بنجاح";
        useSuccessToas(message);
      }

      return response_data?.value?.data;
    },
  };
};
