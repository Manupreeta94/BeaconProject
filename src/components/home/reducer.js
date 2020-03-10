import * as types from './constants';
import initialState from './initial.state';

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.COMPONENTS_NOTIFICATION_COUNT_SUCCESS:
      return {
        ...state,
        notificationCountResponsse: action.payload,
        notificationCountError: '',
      };
    case types.COMPONENTS_NOTIFICATION_COUNT_FAILED:
      return {
        ...state,
        notificationCountResponsse: action.payload,
        notificationCountError: action.notificationCountError,
      };
      case types.COMPONENTS_GET_COUNT_SUCCESS:
      return {
        ...state,
        getCountUpdatedResponse: action.payload,
        getCountUpdatedError: action.getCountUpdatedError,
      };
      case types.COMPONENTS_GET_COUNT_FAILED:
      return {
        ...state,
        getCountUpdatedResponse: action.payload,
        getCountUpdatedError: action.getCountUpdatedError,
      };

    default:
      return state;
  }
}
