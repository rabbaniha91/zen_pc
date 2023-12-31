import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_CLEAN,
} from "../actions/type";

const initialState = {
  isLoading: false,
  commentsInfo: null,
  errorMessage: "",
};

const getCommentsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS_REQUEST:
      return {
        isLoading: true,
        commentsInfo: null,
        errorMessage: "",
      };
    case GET_COMMENTS_SUCCESS:
      return {
        isLoading: false,
        commentsInfo: payload?.commentsInfo,
        errorMessage: "",
      };
    case GET_COMMENTS_FAIL:
      return {
        isLoading: false,
        commentsInfo: null,
        errorMessage: payload?.errorMessage,
      };
    case GET_COMMENTS_CLEAN:
      return initialState;
    default:
      return { ...state };
  }
};

export default getCommentsReducer;
