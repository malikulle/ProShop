import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./index";
import initialState from "./initialState";
import { setAuthorizationHeader, setBaseuRL } from "../actions/auth";

const middleware = [thunk];

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  setBaseuRL();
  if (store.getState().userLogin && store.getState().userLogin.userInfo) {
    setAuthorizationHeader(store.getState().userLogin.userInfo);
  }
});

export default store;
