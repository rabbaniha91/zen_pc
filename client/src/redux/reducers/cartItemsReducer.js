import {
  SAVE_CARTITEMS_REQUEST,
  SAVE_CARTITEMS_SUCCESS,
  SAVE_CARTITEMS_FAIL,
} from "../actions/type";

const initialState = {
  isLoading: false,
  info: null,
  errorMessage: "",
};

const cartItemsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_CARTITEMS_REQUEST:
      return {
        isLoading: true,
        info: null,
        errorMessage: "",
      };
    case SAVE_CARTITEMS_SUCCESS:
      return {
        isLoading: false,
        info: payload?.info,
        errorMessage: "",
      };
    case SAVE_CARTITEMS_FAIL:
      return {
        isLoading: false,
        info: null,
        errorMessage: payload?.errorMessage,
      };
    default:
      return { ...state };
  }
};

export default cartItemsReducer;
