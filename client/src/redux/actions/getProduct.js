import axios from "../../axios/axios";
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "./type";

const getProductAction = (id, signal) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const { data } = await axios.get(`/product/${id}`, {
      signal,
    });
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: { info: data } });
  } catch (error) {
    if (signal.aborted) return;
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else if (error?.response?.statusCode === 404) {
      errorMessage = "not found";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    dispatch({ type: GET_PRODUCT_FAIL, payload: { errorMessage } });
  }
};

export default getProductAction;
