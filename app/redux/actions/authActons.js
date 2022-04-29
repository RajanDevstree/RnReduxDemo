/* eslint-disable radix */
import {USER_LOGIN, AUTH_LOADING, USER_LOGOUT} from './types';
import Toast from 'react-native-toast-message';

export const authLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: AUTH_LOADING,
      payload: loading,
    });
  };

export const authLogOutAction = () => dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
};

export const userLoginAction =
  (userName = '', userPassword = '') =>
  dispatch => {
    dispatch(authLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({name: userName, password: userPassword});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://jsonplaceholder.typicode.com/users', requestOptions)
      .then(response => response.text())
      .then(result => {
        let serverResponse = JSON.parse(result);
        dispatch(authLoadingAction());
        if (serverResponse) {
          dispatch({
            type: USER_LOGIN,
            payload: '@static_token',
          });

          Toast.show({
            text1: 'User Login Successfully',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
        } else {
          Toast.show({
            text1: 'Loading Failure',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
        }
      })
      .catch(error => {
        dispatch(authLoadingAction());

        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
