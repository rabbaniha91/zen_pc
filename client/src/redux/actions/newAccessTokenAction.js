import {
  NEW_REFRESH_TOKEN,
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL,
} from "./type";

import axios from "../../axios/axios";

const newAccessTokenAction = () => async (dispatch) => {
  try {
    dispatch({ type: ACCESS_TOKEN_REQUEST });
    const response = await axios.get("/auth/refreshToken", {
      withCredentials: true,
    });
    dispatch({
      type: NEW_REFRESH_TOKEN,
      payload: {
        accessToken: response.data.accessToken,
        userInfo: response.data.userInfo,
      },
    });
    dispatch({ type: ACCESS_TOKEN_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = "Invalid refresh token";
    }

    dispatch({
      type: ACCESS_TOKEN_FAIL,
      payload: {
        errorMessage: errorMessage,
      },
    });
  }
};

export default newAccessTokenAction;
