import {
  ACCESS_TOKEN_REQUEST,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAIL,
} from "../actions/type";

const initialState = {
    isLoading: false,
    errorMessage: ""
}

function accessTokenReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACCESS_TOKEN_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
      };
    case ACCESS_TOKEN_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
}

export default accessTokenReducer;
