import {
  SAVE_CARTITEMS_REQUEST,
  SAVE_CARTITEMS_SUCCESS,
  SAVE_CARTITEMS_FAIL,
} from "./type";

import axios from "../../axios/axios";

const cartItemsAction = (items, signal) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_CARTITEMS_REQUEST });

    const { data } = await axios.post(
      "/cartItems",
      { items },
      { signal },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Cart Items: ", data);
    dispatch({ type: SAVE_CARTITEMS_SUCCESS, payload: { info: data } });
  } catch (error) {
    if (signal.aborted) return;
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    console.log("error cart items: ", errorMessage);

    dispatch({ type: SAVE_CARTITEMS_FAIL, payload: { errorMessage } });
  }
};

export default cartItemsAction;
