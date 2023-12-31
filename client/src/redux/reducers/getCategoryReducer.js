import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from "../actions/type";

const initalState = {
  isLoading: false,
  errorMessage: "",
  items: null,
};

const getCetgoryReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        items: null,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        items: payload?.category,
      };
    case GET_CATEGORY_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
        items: null,
      };
    default:
      return state;
  }
};

export default getCetgoryReducer
