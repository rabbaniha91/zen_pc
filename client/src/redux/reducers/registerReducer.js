import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  isRegisterd: false,
};

const registerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        isLoading: true,
        isRegisterd: false,
        errorMessage: "",
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        isRegisterd: true,
        errorMessage: "",
      };
    case REGISTER_FAIL:
      return {
        isLoading: false,
        isRegisterd: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};

export default registerReducer
