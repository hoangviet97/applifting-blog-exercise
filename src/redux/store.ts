import { applyMiddleware, createStore, AnyAction, Dispatch } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export type AppDispatch = typeof store.dispatch;

export default store;
