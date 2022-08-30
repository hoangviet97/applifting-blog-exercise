import { Dispatch } from "redux";
import { LOGIN, LOGOUT } from "./types";

export const login = () => (dispatch: Dispatch) => {
  try {
  } catch (error) {}
};

export const logout = (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};
