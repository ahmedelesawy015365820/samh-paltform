// import { useLangStore } from "@/stores/lang";

export default defineNuxtRouteMiddleware((to, from) => {
  const redirect_token = useCookie("redirect_token").value;
  // const langStore = useLangStore();

  if (to.meta.requireAuth && !redirect_token) {
    // 1- Show Message Not Authorized

    // 2- Cancel Navigation
    if (from.href) {
      /* {{If}} Means that you navigate throw a link normaly */
      return navigateTo("/authentication/login");
    } else {
      /* {{Else}} Means that you navigate throw writing in the web search bar directly */
      return navigateTo("/authentication/login");
    }
  }

  if (to.path.includes("authentication") && redirect_token) {
    return navigateTo("/");
  }
});
