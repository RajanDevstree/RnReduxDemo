import {
  USER_LOGOUT,
  USER_LOGIN,
  AUTH_LOADING,
  USER_EMAIL_LINK,
} from '../actions/types';

const initialState = {
  userToken: null,
  authLoading: false,
  authEmailLink: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_EMAIL_LINK:
      return {
        ...state,
        authEmailLink: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userToken: action.payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userToken: null,
      };
    default:
      return state;
  }
};
