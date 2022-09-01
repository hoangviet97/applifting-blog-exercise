import axiosClient from "./axios";

const setAuthToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = "f8dcc194-0ee1-4b49-b41c-6248cefed3d1";
};

export default setAuthToken;
