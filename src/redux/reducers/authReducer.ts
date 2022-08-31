import { LOGIN } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: {}
};

function authReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.setItem("token", payload)
      };
    default:
      return state;
  }
}

export default authReducer;
