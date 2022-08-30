import { combineReducers } from "redux";

const appReducer = combineReducers({});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
