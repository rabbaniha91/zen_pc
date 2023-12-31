import axios from "../axios/axios";
import { useDispatch } from "react-redux";
import { NEW_REFRESH_TOKEN } from "../redux/actions/type";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/auth/refreshToken", {
        withCredentials: true,
      });

      dispatch({
        type: NEW_REFRESH_TOKEN,
        payload: {
          userInfo: data?.userInfo,
          accessToken: data?.accessToken,
        },
      });

      return data?.accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
