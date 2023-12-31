import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_CLEAN,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  productInfo: null,
};

const getProductReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        productInfo: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        productInfo: payload?.info,
      };
    case GET_PRODUCT_FAIL:
      return {
        isLoading: false,
        errorMessage: payload?.errorMessage,
        productInfo: null,
      };
    case GET_PRODUCT_CLEAN:
      initialState;
    default:
      return { ...state };
  }
};

export default getProductReducer;
