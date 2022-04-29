import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import React from 'react';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
