import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST,
  GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS,
  GET_FILTERED_PRODUCTS_BY_BRAND_FAIL,
} from "../redux/actions/type";
import axios from "../axios/axios";
import { useInfiniteQuery } from "react-query";

// const getProducts = async ({ query, level, pageParam }) => {
//   let pageLimit = 9;
//   const { data } = await axios.get(
//     `products/${query}/${level}?pageNum=${pageParam}&pageLimit=${pageLimit}`
//   );
//   console.log(data);
//   return data;
// };

// const useProduct = ({ query, level }) => {
//   let pageLimit = 9;

//   return useInfiniteQuery(
//     ["products", { query, level }],
//     async ({ pageParam = 1 }) => {
//       const response = await axios.get(
//         `products/${query}/${level}?pageNum=${pageParam}&pageLimit=${pageLimit}`
//       );
//       return {
//         data: response?.data,
//       };
//     },
//     {
//       getNextPageParam: (lastPage) => {
//         const { data } = lastPage;
//         const nextPage = data.hasNextPage ? pageParam + 1 : undefined;
//         return nextPage;
//       },
//     },
//     { keepPreviousData: true }
//   );
// };
// export default useProduct;

// const useProduct = (query, level, pageNum, pageLimit = 9) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch({ type: GET_FILTERED_PRODUCTS_BY_BRAND_REQUEST });
//     const controller = new AbortController();
//     const { signal } = controller;
//     axios
//       .get(
//         `products/${query}/${level}?pageNum=${pageNum}&pageLimit=${pageLimit}`,
//         { signal }
//       )
//       .then(({ data }) => {
//         dispatch({
//           type: GET_FILTERED_PRODUCTS_BY_BRAND_SUCCESS,
//           payload: {
//             products: data.docs,
//             hasNextPage: data?.hasNextPage,
//             totalDocs: data?.totalDocs,
//             totalPages: data?.totalPages,
//             nextPage: data?.nextPage,
//           },
//         });
//       })
//       .catch((error) => {
//         if (signal.aborted) return;
//         dispatch({
//           type: GET_FILTERED_PRODUCTS_BY_BRAND_FAIL,
//           payload: { errorMessage: error?.response?.data?.message },
//         });
//       });
//     return () => {
//       controller.abort();
//     };
//   }, [query, pageNum]);
// };
