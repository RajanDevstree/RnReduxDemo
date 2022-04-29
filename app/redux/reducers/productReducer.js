import {
  GET_USER_ALL_TASK,
  GET_USER_ALL_LOADING,
  GET_USER_ALL_ERROR,
  TOGGLE_TASK,
} from '../actions/types';

const initialState = {
  userTaskList: [],
  userTaskLoading: false,
  userTaskError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TASK:
      return {
        ...state,
        userTaskList: state.userTaskList.map(userTask =>
          userTask.id === action.payload
            ? {...userTask, completed: !userTask.completed}
            : userTask,
        ),
      };
    case GET_USER_ALL_TASK:
      return {
        ...state,
        userTaskList: action.payload,
        userTaskLoading: false,
        userTaskError: null,
      };
    case GET_USER_ALL_LOADING:
      return {
        ...state,
        userTaskList: [],
        userTaskLoading: true,
        userTaskError: null,
      };
    case GET_USER_ALL_ERROR:
      return {
        ...state,
        userTaskList: [],
        userTaskLoading: false,
        userTaskError: action.payload,
      };
    default:
      return state;
  }
};
