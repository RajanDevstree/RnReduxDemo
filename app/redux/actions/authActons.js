import {USER_EMAIL_LINK, USER_LOGIN, AUTH_LOADING, USER_LOGOUT} from './types';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APICallService from '../../Api/APICallService';

export const authLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: AUTH_LOADING,
      payload: loading,
    });
  };

export const authLogOutAction = () => dispatch => {
  AsyncStorage.removeItem('@token_Key');

  dispatch({
    type: USER_LOGOUT,
  });
};

export const authEmailLinkAction =
  (linkEmail = '') =>
  dispatch => {
    dispatch({
      type: USER_EMAIL_LINK,
      payload: linkEmail,
    });
  };

export const authLogInTokenAction = token => dispatch => {
  dispatch({
    type: USER_LOGIN,
    payload: token,
  });
};

export const userLoginAction =
  (userName = '', userPassword = '') =>
  (dispatch, getState) => {
    const {
      authState: {userToken},
    } = getState();
    dispatch(authLoadingAction(true));

    console.log(userToken, 'Header');

    const apiCall = new APICallService(
      '/apidemo/api/filter',
      'GET',
      '744c5e9fc1123e4d058feab4c912c92c',
      {
        mobile: userName,
        password: userPassword,
      },
    );

    apiCall
      .callAPI()
      .then(response => {
        dispatch(authLoadingAction());

        if (response) {
          console.log(response);
          dispatch({
            type: USER_LOGIN,
            payload: '@static_token',
          });
          (async () => {
            await AsyncStorage.setItem('@token_Key', '@static_token');
          })();
          Toast.show({
            text1: 'User Login Successfully',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
        }
      })
      .catch(err => {
        dispatch(authLoadingAction());
        Toast.show({
          text1: err.message ? err.message : 'Server response failed',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
