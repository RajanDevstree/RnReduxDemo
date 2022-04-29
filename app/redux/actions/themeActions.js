import {CHANGE_APP_THEME} from './types';

export const changeThemeAction = () => async dispatch => {
  dispatch({
    type: CHANGE_APP_THEME,
  });
};
