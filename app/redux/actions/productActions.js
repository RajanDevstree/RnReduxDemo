import {
  GET_USER_ALL_TASK,
  GET_USER_ALL_LOADING,
  GET_USER_ALL_ERROR,
  TOGGLE_TASK,
} from './types';

export const getUserTask = () => async dispatch => {
  dispatch({
    type: GET_USER_ALL_LOADING,
  });

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://jsonplaceholder.typicode.com/todos', requestOptions)
    .then(response => response.text())
    .then(result => {
      const serverResponse = JSON.parse(result);

      if (serverResponse && Array.isArray(serverResponse)) {
        dispatch({
          type: GET_USER_ALL_TASK,
          payload: serverResponse ? serverResponse : [],
        });
      }
    })
    .catch(error => {
      dispatch({
        type: GET_USER_ALL_ERROR,
        payload: 'server response failed',
      });
    });
};

export const taskToggleAction = taskId => async dispatch => {
  dispatch({
    type: TOGGLE_TASK,
    payload: taskId,
  });
};
