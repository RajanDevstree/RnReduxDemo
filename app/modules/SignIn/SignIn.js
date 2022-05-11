import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  TouchableNativeFeedback,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {userLoginAction} from '../../redux/actions/authActons';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [passwordHide, setPasswordHide] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const {appThemeColor} = useSelector(state => state.themeState);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmailInput('');
      setPasswordInput('');
    });

    return unsubscribe;
  }, [navigation]);

  const userSignIn = () => {
    if (emailInput && passwordInput) {
      // if (
      //   !String(emailInput)
      //     .toLowerCase()
      //     .match(
      //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //     )
      // ) {
      //   Toast.show({
      //     text1: 'please enter a valid email address',
      //     visibilityTime: 3000,
      //     autoHide: true,
      //     position: 'top',
      //     type: 'error',
      //   });

      //   return;
      // }
      dispatch(userLoginAction('8128421663', passwordInput));
    } else {
      Toast.show({
        text1: 'you forgot to enter something',
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
        type: 'error',
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="light-content" />

      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, flexGrow: 1}}>
          <View
            style={{
              marginTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}>
            <Image
              source={{
                uri: 'https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg',
              }}
              style={{
                width: 170,
                height: 170,
                resizeMode: 'contain',
                borderRadius: 250,
              }}
            />
          </View>
          <View style={{marginHorizontal: 30, marginTop: -10}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: appThemeColor,
              }}>
              SIGN IN
            </Text>
          </View>

          <View style={{marginHorizontal: 30}}>
            <View
              style={{
                marginBottom: 0,
                marginTop: 25,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  color: '#333333',
                  fontWeight: 'bold',
                }}>
                <Text>Email</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    zIndex: 5,
                    flex: 0.1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 5,
                  }}>
                  <Ionicons name="person" color={appThemeColor} size={18} />
                </View>

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor="#666666"
                  style={{
                    color: '#000000',
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    flex: 0.9,
                    paddingLeft: 10,
                  }}
                  onChangeText={setEmailInput}
                  value={emailInput}
                />
              </View>
            </View>

            <View
              style={{
                marginBottom: 0,
                marginTop: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  color: '#333333',
                  fontWeight: 'bold',
                }}>
                <Text>Password</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="#666666"
                  onChangeText={setPasswordInput}
                  value={passwordInput}
                  secureTextEntry={passwordHide}
                  style={{
                    color: '#000000',
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    flex: 0.9,
                    paddingLeft: 25,
                  }}
                />

                <View
                  style={{
                    zIndex: 5,
                    flex: 0.1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    paddingHorizontal: 5,
                  }}>
                  <Ionicons
                    onPress={() => {
                      setPasswordHide(item => !item);
                    }}
                    name={passwordHide ? 'eye-off' : 'eye'}
                    color={appThemeColor}
                    size={18}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                overflow: 'hidden',
                borderRadius: 3,
              }}>
              <TouchableNativeFeedback
                accessible={false}
                background={TouchableNativeFeedback.Ripple('#ECECEC')}
                onPress={() => {
                  Keyboard.dismiss();
                  userSignIn();
                }}>
                <View
                  style={{
                    backgroundColor: appThemeColor,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                    }}>
                    Sign In
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 3,
              }}>
              <TouchableNativeFeedback
                accessible={false}
                background={TouchableNativeFeedback.Ripple('#ECECEC')}
                onPress={() => {
                  dispatch(userLoginAction(emailInput, passwordInput));

                  // Keyboard.dismiss();
                  // userSignIn();
                }}>
                <View
                  style={{
                    backgroundColor: appThemeColor,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                    }}>
                    Test Diff APi Request
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              marginHorizontal: 50,
              paddingVertical: 0.4,
              elevation: 1,
              backgroundColor: '#DDDDDD',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{alignItems: 'center', top: 10}}>
            <Text style={{fontSize: 12}}>
              If you Don't have account
              <Text
                style={{textDecorationLine: 'underline', color: appThemeColor}}>
                {' '}
                click here
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
