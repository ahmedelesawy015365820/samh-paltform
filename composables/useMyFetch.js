import { useAuthStore } from "@/stores/auth";
import { useLangStore } from "@/stores/lang";

export const useMyFetch = (url, options) => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const lang_store = useLangStore();
  const auth_store = useAuthStore();
  const nuxtApp = useNuxtApp();
  const langStore = useLangStore();

  const my_options = {
    ...options,
    baseURL: BASE_URL,
    headers: {
      ...options?.headers,
      "Accept-Language": lang_store.current_lang,
      ...(auth_store.redirect_token
        ? { Authorization: "Bearer " + auth_store.redirect_token }
        : {}),
    },
    onRequestError({ request, options, error }) {},
    onResponseError({ response, options, error }) {
      if (
        response.status == 401 &&
        auth_store.redirect_token &&
        response.url != `${BASE_URL}member/auth/login`
      ) {
        nuxtApp.$Swal
          .fire({
            title: useHelpers().capitalizeEveryWord(
              nuxtApp.$i18n.t("alerts.logout.title")
            ),
            text: useHelpers().capitalizeEveryWord(
              nuxtApp.$i18n.t("alerts.logout.title")
            ),
            showCancelButton: false,
            confirmButtonText: nuxtApp.$i18n.t("form.ok"),
          })
          .then((result) => {
            if (result.isConfirmed) {
              const message =
                langStore.current_lang == "en"
                  ? "You have been logged out successfully"
                  : "تم تسجيل الخروج بنجاح";
              useSuccessToas(message);
              auth_store.clearStorage();
              navigateTo("/authentication/login");
            }
          });
        const message =
          langStore.current_lang == "en"
            ? "You have been logged out successfully"
            : "تم تسجيل الخروج بنجاح";
        useSuccessToas(message);
        auth_store.clearStorage();
        navigateTo("/authentication/login");
      }
    },
  };

  return useFetch(url, my_options);
};
