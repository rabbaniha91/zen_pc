import {
  GET_SHIPPING_INFO_REQUESR,
  GET_SHIPPING_INFO_SUCCESS,
  GET_SHIPPING_INFO_FAIL,
} from "./type";

const getShippingInfoAction = (axiosPrivate, signal) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPPING_INFO_REQUESR });

    const { data } = await axiosPrivate.get("/user/getshipping", { signal });
    dispatch({ type: GET_SHIPPING_INFO_SUCCESS, payload: { info: data } });
  } catch (error) {
    if (signal.aborted) return;
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    dispatch({ type: GET_SHIPPING_INFO_FAIL, payload: { errorMessage } });
  }
};

export default getShippingInfoAction;
