import { createStore, compose, applyMiddleware } from "redux";
// import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

function configureStoreProd(initialState) {
  const middlewares = [
    thunk
    // reduxImmutableStateInvariant()
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const configureStore = configureStoreProd;

export default configureStore();
