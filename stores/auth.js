export const useAuthStore = defineStore("auth", () => {
  const nuxtApp = useNuxtApp();

  const is_first_visit = ref(false);

  const verify_code = ref(null);
  const verify_phone_value = ref(null);

  const confirm_from_page_path = ref(null);

  // ======== Handle First Load
  const redirect_token = useCookie("redirect_token");
  const handleFirstLoad = () => {
    const user = nuxtApp.$encryptStorage.getItem("blank_App_User");
    const token = user?.token;

    redirect_token.value = token;
  };

  // ======== Storage
  const user = ref(null);
  const setStorage = (loginData) => {
    user.value = { ...loginData };
    nuxtApp.$encryptStorage.setItem("blank_App_User", loginData);
    is_first_visit.value = loginData.is_first_visit || true;
    redirect_token.value = loginData.token;
  };
  const clearStorage = () => {
    user.value = null;
    nuxtApp.$encryptStorage.removeItem("blank_App_User");
    redirect_token.value = null;
  };

  // ======== Verify Navaz
  const nafaz_verify_num = ref(null);
  const national_id = ref(null);
  const verifyWithNafaz = async (ssn_id) => {
    const response_data = await userService().verifyWithNafaz(ssn_id);
    if (response_data) {
      national_id.value = ssn_id;
      nafaz_verify_num.value = response_data.random_number;
    }
    return response_data;
  };
  const checkNavazNum = async () => {
    const response_data = await userService().checkNavazNum(national_id.value);
    return response_data;
  };

  // ======== Verify Phone
  const verifyPhoneNumber = async (
    phone,
    forgetPass = false,
    resend = false
  ) => {
    const data = await userService().verifyPhoneNumber(
      phone,
      forgetPass,
      resend
    );
    verify_phone_value.value = phone;
    return data;
  };
  const confirmPhoneNumber = async (code, forgetPass = false) => {
    const data = await userService().confirmPhoneNumber(
      verify_phone_value.value,
      code,
      forgetPass
    );
    verify_code.value = code;
    return data;
  };

  // ======== Main Actions
  const logIn = async (loginData) => {
    const user = await userService().login(loginData);
    if (user) {
      setStorage(user);
    }
    return user;
  };
  const forgetPassword = async (phone) => {
    const data = await userService().forgetPassword(phone);
    verify_phone_value.value = phone;
    return data;
  };
  const resetPassowrd = async (new_password) => {
    const data = await userService().resetPassowrd(
      verify_phone_value.value,
      verify_code.value,
      new_password
    );
    return data;
  };

  const logOut = async () => {
    const data = await userService().logout();
    if (data) {
      clearStorage();
      navigateTo("/");
    }
  };

  const signup = async (signupData) => {
    const user = await userService().signup({
      ...signupData,
      ssn_id: national_id.value,
      phone_number: verify_phone_value.value,
    });
    return user;
  };

  return {
    verifyWithNafaz,
    checkNavazNum,

    verifyPhoneNumber,
    confirmPhoneNumber,

    logIn,
    forgetPassword,
    resetPassowrd,
    logOut,
    clearStorage,
    signup,

    user,
    nafaz_verify_num,
    national_id,
    verify_phone_value,
    verify_code,
    confirm_from_page_path,
    is_first_visit,

    handleFirstLoad,
    redirect_token,
  };
});
