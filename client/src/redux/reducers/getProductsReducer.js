import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_CLEAN,
  GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST,
  GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS,
  GET_FILTERED_PRODUCTS_BY_BRAND_FAIL,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  products: null,
  hasNextPage: false,
  totalDocs: null,
  totalPages: null,
  nextPage: null,
};

const getProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS_REQUEST:
    case GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        products: null,
        hasNextPage: false,
        totalDocs: null,
        totalPages: null,
        nextPage: null,
      };
    case GET_PRODUCTS_SUCCESS:
    case GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        products: payload.products,
        hasNextPage: payload.hasNextPage,
        totalDocs: payload.totalDocs,
        totalPages: payload.totalPages,
        nextPage: payload.nextPage,
      };
    case GET_PRODUCTS_FAIL:
    case GET_FILTERED_PRODUCTS_BY_BRAND_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
        products: null,
        hasNextPage: false,
        totalDocs: null,
        totalPages: null,
        nextPage: null,
      };
    case GET_PRODUCTS_CLEAN:
      return initialState;
    default:
      return state;
  }
};

export default getProductsReducer;
