import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { LOGIN, LOGIN_FAIL, LOGOUT, LOAD_USER } from "./types";
import { message } from "antd";
import { NavigateFunction } from "react-router-dom";

export const login = (username: string, password: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.post("/login", { username, password });
    dispatch({ type: LOGIN, payload: res.data.access_token });
    navigate("/articles");
    console.log(res);
  } catch (error: any) {
    message.error(error.response.data.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await axiosClient.get(`/tenants/38ab5ddd-a9dc-454f-b62c-9fac7f223edc`);
    dispatch({ type: LOAD_USER, payload: res.data });

    console.log(res);
  } catch (error: any) {
    console.log(error);
    message.error(error.response.data.message);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
