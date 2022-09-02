import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://fullstack.exercise.applifting.cz"
});

axiosClient.defaults.headers.common["Authorization"] = "0880b78c-4821-4265-b058-85dded517122";
axiosClient.defaults.headers.common["X-API-KEY"] = "d853e9b9-eb91-4716-9a64-0bd520f61827";

export default axiosClient;
