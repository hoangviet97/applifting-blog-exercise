import { combineReducers } from "redux";
import authReducer from "./authReducer";

const appReducer = combineReducers({ authReducer });

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
