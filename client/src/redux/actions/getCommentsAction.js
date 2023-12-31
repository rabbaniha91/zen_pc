import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_CLEAN,
} from "./type";

import axios from "../../axios/axios";

const getCommentsAction = (id, signal) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });
    const { data } = await axios.get(`/getComments/${id}`, { signal });
    dispatch({ type: GET_COMMENTS_SUCCESS, payload: { commentsInfo: data } });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "سرور پاسخگو نیست.";
    } else {
      errorMessage = error?.response?.data?.message;
    }
  }
};

export default getCommentsAction;
