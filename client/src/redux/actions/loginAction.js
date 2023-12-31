import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL, SET_REDIRECT } from "./type";

import axios from "../../axios/axios";

const loginAction = (email, password, from) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });

    const { data } = await axios.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: AUTH_SUCCESS,
      payload: { userInfo: data?.userInfo, accessToken: data?.accessToken },
    });
    dispatch({ type: SET_REDIRECT, payload: { from } });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    dispatch({ type: AUTH_FAIL, payload: { errorMessage } });
  }
};

export default loginAction;
