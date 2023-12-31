import {
  GET_SHIPPING_INFO_REQUESR,
  GET_SHIPPING_INFO_SUCCESS,
  GET_SHIPPING_INFO_FAIL,
  CLEAR_SHIPPING_INFO,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  info: null,
};

const getShippingInfoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPPING_INFO_REQUESR:
      return {
        isLoading: true,
        errorMessage: "",
        info: null,
      };
    case GET_SHIPPING_INFO_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        info: payload?.info,
      };
    case GET_SHIPPING_INFO_FAIL:
      return {
        isLoading: false,
        errorMessage: payload?.errorMessage,
        info: null,
      };
    case CLEAR_SHIPPING_INFO:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default getShippingInfoReducer;
