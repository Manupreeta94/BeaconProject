import { combineReducers } from "redux";

// import app reducers
import appReducer from "./app.reducer";
import userReducer from "../components/user/reducer";
import warningReducer from "../components/warning/reducer";

const combinedReducer = combineReducers({
  userReducer,
  warningReducer
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
