import {CHANGE_APP_THEME} from '../actions/types';

const ColorList = [
  '#4287f5',
  '#eb392d',
  '#044f1c',
  '#ac2deb',
  '#001D6E',
  '#eb2d99',
  '#eba52d',
  '#8ceb2d',
  '#2deb8c',
  '#2dcbeb',
  '#2d4deb',
];

const initialState = {
  appThemeColor: '#eba52d',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APP_THEME:
      return {
        ...state,
        appThemeColor: ColorList[parseInt(Math.random() * (10 - 1) + 1)],
      };
    default:
      return state;
  }
};
