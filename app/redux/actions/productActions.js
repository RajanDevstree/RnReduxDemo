import {
  GET_USER_ALL_TASK,
  GET_USER_ALL_LOADING,
  GET_USER_ALL_ERROR,
  TOGGLE_TASK,
} from './types';
import APICallService from '../../Api/APICallService';

export const getUserTask = () => async dispatch => {
  dispatch({
    type: GET_USER_ALL_LOADING,
  });

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', requestOptions)
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

export const backGroundApiRequestTaskAction =
  () => async (dispatch, getState) => {
    const {
      productState: {userTaskList},
    } = getState();

    const apiCall = new APICallService('/todos?_limit=5', 'GET', '');

    apiCall
      .callAPI()
      .then(res => {
        console.log(res);
        if (res.response && Array.isArray(res.response)) {
          if (JSON.stringify(userTaskList) != JSON.stringify(res.response)) {
            dispatch({
              type: GET_USER_ALL_TASK,
              payload: res.response ? res.response : [],
            });
            alert('Don UPdate');
          } else {
            alert('not UPdate');
          }
        }
      })
      .catch(err => {});
  };

export const taskToggleAction = taskId => async dispatch => {
  dispatch({
    type: TOGGLE_TASK,
    payload: taskId,
  });
};
