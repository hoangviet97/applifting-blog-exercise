import { Dispatch } from "redux";
import axiosClient from "../../helpers/axios";
import { LOGIN, LOGIN_FAIL, LOGOUT } from "./types";

export const login = (username: string, password: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post("/login", { username, password });
    console.log(res);
    //dispatch({ type: LOGIN });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};
