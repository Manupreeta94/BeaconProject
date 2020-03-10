import { get, post, put } from '../../utils/http';
import * as types from './constants';
import { getErrorMessage } from '../../utils/helpers';

export function authenticateUser(data = {}) {
  return function (dispatch, getState) {
    const headers = {};
    const url = `user/v1/login`;
    return post(url, { data, headers })
      .then(response => {
        // console.log('login response', response);
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_AUTHENTICATE_USER_SUCCESS,
            payload: response.data.data || {},
          });
          return response.data.response;
        } else {
          throw response.data;
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch({
          type: types.COMPONENTS_AUTHENTICATE_USER_FAILED,
          payload: {},
          loginError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}