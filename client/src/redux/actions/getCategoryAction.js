import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from "./type";

import axios from "../../axios/axios";

const getCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await axios.get("/getCategory", {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: { category: data } });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error?.response?.data?.message;
    }
    dispatch({ type: GET_CATEGORY_FAIL, payload: { errorMessage } });
  }
};

export default getCategoryAction;
