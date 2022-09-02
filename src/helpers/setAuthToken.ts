import axiosClient from "./axios";

const setAuthToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = token;
};

export default setAuthToken;
