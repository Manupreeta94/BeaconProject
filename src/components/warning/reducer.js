import * as types from './constants';
import initialState from './initial.state';

export default function warningReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.COMPONENTS_WARNING_LIST_SUCCESS:
      return {
        ...state,
        warningListResponse: action.payload,
        warningListError: '',
      };
    case types.COMPONENTS_WARNING_LIST_FAILED:
      return {
        ...state,
        warningListResponse: action.payload,
        warningListError: action.loginError,
      };

    case types.COMPONENTS_READ_UNREAD_SUCCESS:
      return {
        ...state,
        readUnReadResponse: action.payload,
        readUnReadError: '',
      };
    case types.COMPONENTS_READ_UNREAD_FAILED:
      return {
        ...state,
        readUnReadResponse: action.payload,
        readUnReadError: action.loginError,
      };

      case types.COMPONENTS_MARK_ALL_READ_SUCCESS:
        return {
          ...state,
          markAllReadResponse: action.payload,
          markAllUnReadError: '',
        };
      case types.COMPONENTS_MARK_ALL_READ_FAILED:
        return {
          ...state,
          markAllReadResponse: action.payload,
          markAllUnReadError: action.markAllUnReadError,
        };

    default:
      return state;
  }
}
