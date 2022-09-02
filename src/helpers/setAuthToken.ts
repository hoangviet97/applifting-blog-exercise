import axiosClient from "./axios";

const setAuthToken = (token: any) => {
  axiosClient.defaults.headers.common["Authorization"] = token;
};

export default setAuthToken;
