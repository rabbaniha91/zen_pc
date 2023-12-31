import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "./type";

import axios from "../../axios/axios";

const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    await axios.post(
      "/auth/register",
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    let errorMessage;
    console.log(error)
    if (!error.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else {
      errorMessage = error?.response?.data?.message;
    }
    dispatch({ type: REGISTER_FAIL, payload: { errorMessage } });
  }
};

export default registerAction;
