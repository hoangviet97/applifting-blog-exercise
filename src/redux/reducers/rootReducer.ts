import { combineReducers } from "redux";
import authReducer from "./authReducer";
import articleReducer from "./articleReducer";

const appReducer = combineReducers({ authReducer, articleReducer });

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
