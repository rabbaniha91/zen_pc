import {
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
} from "./type";

import axios from "../../axios/axios";

const getDiscountAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DISCOUNT_REQUEST });
    const { data } = await axios.get("/discountProduct");
    dispatch({ type: GET_DISCOUNT_SUCCESS, payload: { info: data } });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    dispatch({ type: GET_DISCOUNT_FAIL, payload: { errorMessage } });
  }
};

export default getDiscountAction;
