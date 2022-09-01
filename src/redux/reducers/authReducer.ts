import { LOGIN, LOGOUT, LOAD_USER } from "../actions/types";

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
      localStorage.setItem("token", payload);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem("token")
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.name
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        user: {}
      };
    default:
      return state;
  }
}

export default authReducer;
