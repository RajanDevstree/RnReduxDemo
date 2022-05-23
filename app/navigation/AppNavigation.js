/* eslint-disable react-hooks/exhaustive-deps */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';

import SignIn from '../modules/SignIn/SignIn.js';
// import Home from '../modules/Home/Home';
import SignUp from '../modules/SignUp/SignUp';
import Loading from '../modules/Loading/Loading';
import Update from '../modules/Update/Update';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  authLogInTokenAction,
  authEmailLinkAction,
} from '../redux/actions/authActons';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();
  const {authLoading, userToken} = useSelector(state => state.authState);
  const [loading, setLoading] = useState(true);

  const NavigationAnimationType =
    CardStyleInterpolators.forRevealFromBottomAndroid;

  // useEffect(() => {
  //   (async () => {
  //     const userTokenAsync = await AsyncStorage.getItem('@token_Key');
  //     dispatch(authLogInTokenAction(userTokenAsync));
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log(user, '1234567890');
      if (user && user.emailVerified) {
        console.log('THiS IS RUING AND TOKEN SET SET SET');
        dispatch(authLogInTokenAction('@FIrebaseAuthLogin'));
      }
      setLoading(false);
    });
    return subscriber;
  }, []);

  const handleDynamicLink = link => {
    if (link) {
      console.log(link, '1234567890=====');
      // alert(JSON.stringify(link));
      // alert(link.url.split('?')[1]);

      if (auth().isSignInWithEmailLink(link.url)) {
        dispatch(authEmailLinkAction(link.url));
        // setLoading(true);
        // console.log('set login true is runiing');

        // try {
        //   AsyncStorage.getItem('emailForSignIn').then(emailResponse => {
        //     auth()
        //       .signInWithEmailLink(emailResponse, link.url)
        //       .then(data => {
        //         console.log(data, 'DATA REPONSE SUCESS USER lOGIN');
        //         setLoading(false);
        //         dispatch(authLogInTokenAction('@FirebaseLogin'));
        //       })
        //       .catch(error => {
        //         setLoading(false);
        //         alert(error.message);
        //         console.log(error, 'email link login Error');
        //       });
        //   });
        // } catch (e) {
        //   console.log(e);
        //   setLoading(false);
        // } finally {
        //   setLoading(false);
        // }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          alert(JSON.stringify(link));
          alert(link.url.split('?')[1]);

          if (auth().isSignInWithEmailLink(link.url)) {
            dispatch(authEmailLinkAction(link.url));
          }
        }
      });

    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Spinner
        visible={authLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{
              headerShown: false,
              cardStyleInterpolator: NavigationAnimationType,
            }}
          />
        ) : userToken ? (
          <>
            <Stack.Screen
              name="Update"
              component={Update}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            {/* <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            /> */}
          </>
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
