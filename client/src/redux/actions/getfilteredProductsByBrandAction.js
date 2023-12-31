import axios from "../../axios/axios";
import {
  GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST,
  GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS,
  GET_FILTERED_PRODUCTS_BY_BRAND_FAIL,
} from "./type";

const getFilteredProductsByBrandsAction =
  (query, level, pageNum, pageLimit, brands, abortSignal) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST });
      const { data } = await axios.get(
        `products/${query}/${level}/${brands}?pageNum=${pageNum}&pageLimit=${pageLimit}`,
        {
          signal: abortSignal,
        }
      );
      dispatch({
        type: GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS,
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
      if (error?.response) {
        errorMessage = "سرور پاسخگو نیست.";
      } else {
        errorMessage = error?.response?.data?.message;
      }

      dispatch({
        type: GET_FILTERED_PRODUCTS_BY_BRAND_FAIL,
        payload: { errorMessage },
      });
    }
  };

export default getFilteredProductsByBrandsAction;
