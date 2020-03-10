import { get, post, put } from '../../utils/http';
import * as types from './constants';
import { getErrorMessage } from '../../utils/helpers';
import { AsyncStorage } from "react-native";

export function authenticateUser(data = {}) {
  return function (dispatch, getState) {
    const headers = { Authorization: "no" };
    const url = `user/v1/login`;
    return post(url, { data, headers })
      .then(response => {
        // console.log('login response token', response.status);
        if (response.status === 200 || response.status === 201) {
          if (response.data.response.loginResponseCode == 20000) {
            AsyncStorage.setItem("access_token", response.data.response.authResponse.oAuth2AccessToken.access_token);
          }
          dispatch({
            type: types.COMPONENTS_AUTHENTICATE_USER_SUCCESS,
            payload: response.data.response || {},
          });
          return response.data.response;
        } else {
          throw response.data;
        }
      })
      .catch(error => {
        // console.log('error', error);
        dispatch({
          type: types.COMPONENTS_AUTHENTICATE_USER_FAILED,
          payload: {},
          loginError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}