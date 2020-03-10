import * as types from "./constants";
import initialState from "./initial.state";
import { ActionConst } from "react-native-router-flux";
import * as Types from "./constants";

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene
      };
    case Types.GET_APP_LOCAL_STORE_DATA:
      return {
        ...state,
        ...action.payload
      };
    case Types.APP_LOGOUT_ACTION:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
