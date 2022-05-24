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
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  userLoginAction,
  authEmailLinkAction,
  authLogInTokenAction,
} from '../../redux/actions/authActons';

const Phone = ({navigation}) => {
  const dispatch = useDispatch();
  const [phoneInput, setPhoneInput] = useState('');
  const {appThemeColor} = useSelector(state => state.themeState);
  const {authEmailLink} = useSelector(state => state.authState);
  const [confirm, setConfirm] = useState(null);
  const [codeOtp, setCodeOtp] = useState('');

  // console.log(confirm);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPhoneInput('');
      setCodeOtp('');
      // setConfirm('');
    });

    return unsubscribe;
  }, [navigation]);

  const userPhoneLogin = async () => {
    debugger;

    if (phoneInput) {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${phoneInput}`,
      );
      setConfirm(confirmation);

      console.log(JSON.stringify(confirmation));

      debugger;

      // auth()
      //   .signInWithEmailAndPassword(phoneInput)
      //   .then(SignInData => {
      //     if (
      //       SignInData &&
      //       SignInData.user &&
      //       SignInData.user.emailVerified == false
      //     ) {
      //       alert('please, verfiy your email address');
      //     } else if (
      //       SignInData &&
      //       SignInData.user &&
      //       SignInData.user.emailVerified
      //     ) {
      //       dispatch(authLogInTokenAction('@FIrebaseAuthLogin'));
      //     }
      //   })
      //   .catch(error => {
      //     alert(error.message);
      //   });
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

  const confirmCode = async () => {
    // try {
    //   const credential = auth.PhoneAuthProvider.credential(
    //     confirm.verificationId,
    //     codeOtp,
    //   );

    //   console.log(credential, 'aaaaaaaaaaaaaaaa');
    //   // let userData = await auth().currentUser.linkWithCredential(credential);
    //   // setUser(userData.user);
    //   // console.log(userData, 'qqqqqqqqqqq');
    // } catch (error) {
    //   if (error.code == 'auth/invalid-verification-code') {
    //     console.log(error.message, 'Invalid code.');
    //   } else {
    //     console.log(error.message, 'Account linking error');
    //   }
    // }

    try {
      console.log(confirm.confirm);
      const dataOTP = await confirm.confirm(codeOtp);
      console.log(dataOTP, '2323232323232323');

      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        codeOtp,
      );
      console.log(credential, 'xxxxxxxxxxxxxxxxxx');
    } catch (error) {
      console.log('Invalid code.');
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

          {confirm ? (
            <>
              <View style={{marginHorizontal: 30, marginTop: -10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: appThemeColor,
                  }}>
                  Otp
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
                    <Text>Otp</Text>
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
                      placeholder="Otp"
                      placeholderTextColor="#666666"
                      autoComplete="sms-otp" // android
                      textContentType="oneTimeCode" // ios
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
                      onChangeText={setCodeOtp}
                      value={codeOtp}
                    />
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
                      confirmCode();
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
                        Verify Otp
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={{marginHorizontal: 30, marginTop: -10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: appThemeColor,
                  }}>
                  Phone Number
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
                    <Text>Phone Number</Text>
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
                      placeholder="Phone Number"
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
                      onChangeText={setPhoneInput}
                      value={phoneInput}
                    />
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
                      userPhoneLogin();
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
                        Get Otp
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </>
          )}

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
              If you Don't have account Sing Up
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

export default Phone;
