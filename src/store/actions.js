import { AsyncStorage } from "react-native";
import * as Types from "./constants";

export function checkAuthenticated() {
  // alert("sample slert");
  return function(dispatch) {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          if (key && value) {
            dispatch({
              type: Types.GET_APP_LOCAL_STORE_DATA,
              payload: {
                [key]: value
              }
            });
          }
        });
        // alert(JSON.stringify(keys));
      });
    });
  };
}

export function logout() {
  return function(dispatch) {
    return AsyncStorage.clear(() => {
      dispatch({
        type: Types.APP_LOGOUT_ACTION,
        payload: undefined
      });
    });
  };
}
