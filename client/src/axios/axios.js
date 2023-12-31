import axios from "axios";


const BASE_URL = "http://localhost:3400/api/v1";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function customAxiosPrivate(user) {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
}
