import {
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  info: [],
};

const getDiscountReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DISCOUNT_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        info: [],
      };
    case GET_DISCOUNT_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        info: payload.info,
      };
    case GET_DISCOUNT_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
        info: [],
      };
    default:
      return initialState;
  }
};

export default getDiscountReducer;
