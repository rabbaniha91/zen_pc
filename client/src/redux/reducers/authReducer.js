import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  CLEAR_ERROR_MESSAGE,
  NEW_REFRESH_TOKEN,
  SET_REDIRECT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  userInfo: null,
  accessToken: "",
  path: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        userInfo: payload.userInfo,
        accessToken: payload.accessToken,
        path: "",
      };
    case SET_REDIRECT:
      return {
        ...state,
        path: payload.from,
      };
    case NEW_REFRESH_TOKEN:
      return {
        ...state,
        userInfo: payload.userInfo,
        accessToken: payload.accessToken,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case AUTH_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
        userInfo: null,
        accessToken: "",
        path: "",
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case CLEAR_ERROR_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
