import axiosClient from "./axios";

const setAuthToken = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = token;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
