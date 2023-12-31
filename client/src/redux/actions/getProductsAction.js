import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "./type";

import axios from "../../axios/axios";

const getProductsAction =
  (query, level, pageNum, pageLimit, abortSignal) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQUEST });
      const { data } = await axios.get(
        `products/${query}/${level}?pageNum=${pageNum}&pageLimit=${pageLimit}`,
        {
          signal: abortSignal,
        }
      );

      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products: data.docs,
          hasNextPage: data?.hasNextPage,
          totalDocs: data?.totalDocs,
          totalPages: data?.totalPages,
          nextPage: data?.nextPage,
        },
      });
    } catch (error) {
      if (abortSignal.aborted) return;
      let errorMessage = "";
      if (!error?.response) {
        errorMessage = "سرور پاسخگو نیست.";
      } else {
        errorMessage = error?.response?.data?.message;
      }

      dispatch({ type: GET_PRODUCTS_FAIL, payload: { errorMessage } });
    }
  };

export default getProductsAction;
