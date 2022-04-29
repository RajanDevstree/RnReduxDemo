import 'react-native-gesture-handler';
import React from 'react';
import AppNavigation from './navigation';
import store from './redux/store.js';
import Toast from 'react-native-toast-message';

import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
      <Toast ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
