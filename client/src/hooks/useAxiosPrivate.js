import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../axios/axios";

const useAxiosPrivate = (user) => {
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 || !prevRequest?.sent) {
          if (prevRequest) {
            prevRequest.sent = true;
          }
          const newAccessToken = await refresh();
          console.log("new Access: ", newAccessToken);
          console.log("user Access: ", user?.accessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
