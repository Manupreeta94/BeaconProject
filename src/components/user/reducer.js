import * as types from './constants';
import initialState from './initial.state';

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.COMPONENTS_AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        loginResponse: action.payload,
        loginError: '',
      };
    case types.COMPONENTS_AUTHENTICATE_USER_FAILED:
      return {
        ...state,
        loginResponse: action.payload,
        loginError: action.loginError,
      };

    default:
      return state;
  }
}
