/* eslint-disable react-hooks/exhaustive-deps */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

import SignIn from '../modules/SignIn/SignIn.js';
import Home from '../modules/Home/Home';
import SignUp from '../modules/SignUp/SignUp';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const {authLoading, userToken} = useSelector(state => state.authState);

  const NavigationAnimationType =
    CardStyleInterpolators.forRevealFromBottomAndroid;

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Spinner
        visible={authLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              cardStyleInterpolator: NavigationAnimationType,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigation;
