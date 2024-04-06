export const useErrorHandler = (error, api = null) => {
  console.log("LOL");
  const nuxtApp = useNuxtApp();

  if (error && nuxtApp) {
    const Toast = nuxtApp?.$Swal?.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = nuxtApp.$Swal.stopTimer;
        toast.onmouseleave = nuxtApp.$Swal.resumeTimer;
      },
    });
    const errors = error?.data?.errors;

    if (errors && Object.keys(errors).length > 0) {
      for (const field in errors) {
        if (errors[field].length > 0) {
          const message = useHelpers().capitalizeEveryWord(
            `${errors[field][0]}`
          );

          Toast.fire({
            icon: "error",
            title: message,
          });
        }
      }
    } else {
      Toast.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }

    return 1;
  }

  return 0;
};
