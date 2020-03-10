import { get, post, put } from '../../utils/http';
import * as types from './constants';
import { getErrorMessage } from '../../utils/helpers';

export function getCount(data = {}) {
  return function (dispatch, getState) {
    const headers = {};
    const url = `event/v1/insertNewEventStatus`;
    return post(url, { headers, data })
      .then(response => {
        // console.log('login response', response);
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_GET_COUNT_SUCCESS,
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
          type: types.COMPONENTS_GET_COUNT_FAILED,
          payload: {},
          fcmTokenError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}

export function getNotificationCount(username) {
  return function (dispatch, getState) {
    const headers = {};
    const url = `event/v1/getPushNotification?beaconUniqueId=A0E6F85455DA&username=${username}`;
    return get(url, { headers })
      .then(response => {
        // console.log('login response', response);
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_NOTIFICATION_COUNT_SUCCESS,
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
          type: types.COMPONENTS_NOTIFICATION_COUNT_FAILED,
          payload: {},
          notificationCountError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}

export function saveFcmToken(data = {}) {
  return function (dispatch, getState) {
    const headers = {};
    const url = `fcm/notification/token`;
    return post(url, { headers, data })
      .then(response => {
        // console.log('login response', response);
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_FCM_TOKEN_SUCCESS,
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
          type: types.COMPONENTS_FCM_TOKEN_FAILED,
          payload: {},
          fcmTokenError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}
