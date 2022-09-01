import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { LOGIN, LOGIN_FAIL, LOGOUT } from "./types";
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

export const logout = (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};
