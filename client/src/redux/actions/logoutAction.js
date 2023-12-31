import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from "./type";

const logoutAction = (axiosPrivate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    await axiosPrivate.get("/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست. لطفا بعدا تلاش کنید.";
    } else {
      errorMessage = "خروج ناموفق";
    }

    dispatch({ type: LOGOUT_FAIL, payload: { errorMessage } });
  }
};

export default logoutAction;
