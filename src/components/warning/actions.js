import { get, post, put } from '../../utils/http';
import * as types from './constants';
import { getErrorMessage } from '../../utils/helpers';

export function getWarningList(url) {
  return function (dispatch, getState) {
    const headers = {};
    return get(url, { headers })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_WARNING_LIST_SUCCESS,
            payload: response.data.response || {},
          });
          return response.data.response;
        } else {
          throw response.data;
        }
      })
      .catch(error => {
        dispatch({
          type: types.COMPONENTS_WARNING_LIST_FAILED,
          payload: {},
          warningListError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}

export function modifyReadunReadStatus(data = {}) {
  return function (dispatch, getState) {
    const headers = {};
    let url = `event/v1/getEventStatusReadUnRead`;
    return post(url, { headers, data })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_READ_UNREAD_SUCCESS,
            payload: response.data.response || {},
          });
          return response.data.response;
        } else {
          throw response.data;
        }
      })
      .catch(error => {
        dispatch({
          type: types.COMPONENTS_READ_UNREAD_FAILED,
          payload: {},
          warningListError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}

export function markAllRead(data = {}) {
  return function (dispatch, getState) {
    const headers = {};
    let url = `event/v1/markEventStatusReadUnRead`;
    return put(url, { headers, data })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: types.COMPONENTS_MARK_ALL_READ_SUCCESS,
            payload: response.data.response || {},
          });
          return response.data.response;
        } else {
          throw response.data;
        }
      })
      .catch(error => {
        dispatch({
          type: types.COMPONENTS_MARK_ALL_READ_FAILED,
          payload: {},
          markAllUnReadError: getErrorMessage(error.response),
        });
        throw error.response;
      });
  };
}