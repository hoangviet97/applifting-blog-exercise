import axios from "axios";
import axiosClient from "./axios";

const setAuthToken = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common["X-API-KEY"] = token;
  } else {
    delete axiosClient.defaults.headers.common["X-API-KEY"];
  }
};

export default setAuthToken;
