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
  Alert,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import {userLoginAction} from '../../redux/actions/authActons';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const {appThemeColor} = useSelector(state => state.themeState);

  const [userNameInput, setUserNameInput] = useState('');
  const [userDob, serUserDob] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordConfirmHide, setPasswordConfirmHide] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(Moment().format('DD-MM-YYYY'));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);

    if (currentDate) {
      serUserDob(Moment(currentDate).format('DD-MM-YYYY'));
      setSelectDate(Moment(currentDate).format('DD-MM-YYYY'));
    } else if (selectDate) {
      serUserDob(selectDate);
      setSelectDate(selectDate);
    }
  };

  const signUpUser = () => {
    if (
      userNameInput &&
      userDob &&
      emailInput &&
      passwordInput &&
      passwordConfirmInput
    ) {
      if (
        !String(emailInput)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        Toast.show({
          text1: 'please enter a valid email address',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });

        return;
      }
      if (!(passwordInput == passwordConfirmInput)) {
        Toast.show({
          text1: 'password and password confirm is not same',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });

        return;
      }

      // if (auth)

      auth()
        .createUserWithEmailAndPassword(emailInput, passwordInput)
        .then(successSendEmail => {
          console.log(successSendEmail.user, 'SignUp page');

          alert(`Sign Up Successfully ${emailInput}`);
          setEmailInput('');
          setPasswordInput('');

          if (
            successSendEmail &&
            successSendEmail.user &&
            successSendEmail.user.emailVerified == false
          ) {
            // 1> sendSignInLinkToEmail 2> sendEmailVerification
            auth()
              .currentUser.sendEmailVerification({
                // emai: emailInput,
                handleCodeInApp: true,
                // URL must be whitelisted in the Firebase Console.
                url: 'https://rnreduxdemodevstree.page.link',
                // iOS: {
                //   bundleId: 'com.rnreduxdemo',
                // },
                // android: {
                //   packageName: 'com.rnreduxdemo',
                //   installApp: true,
                //   minimumVersion: '12',
                // },
              })
              .then(successSendEmail => {
                alert(`Login link sent to ${emailInput}`);
                setEmailInput('');
                setPasswordInput('');
              })
              .catch(error => {
                alert(error.message);
              });
          }
        })
        .catch(error => {
          alert(error.message);
        });

      // dispatch(userLoginAction(emailInput, passwordInput));
    } else {
      Toast.show({
        text1: 'You Forgot to enter something',
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
            }}></View>
          <View style={{marginHorizontal: 30, marginTop: 15}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: appThemeColor,
              }}>
              Register User
            </Text>
          </View>

          <View style={{marginHorizontal: 30}}>
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
                <Text>User name</Text>
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
                  placeholder="user name"
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
                  onChangeText={setUserNameInput}
                  value={userNameInput}
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
                <Text>BirthDay Date</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  let datePickerStateDate = selectDate.split('-');
                  var datePickerStartDateDateObj = new Date(
                    datePickerStateDate[2],
                    datePickerStateDate[1] - 1,
                    datePickerStateDate[0],
                  );

                  setDatePickerDate(datePickerStartDateDateObj);
                  setShowDatePicker(item => !item);
                }}>
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

                  <View
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
                    }}>
                    <Text style={{color: userDob ? '#000000' : '#808080'}}>
                      {userDob ? userDob : 'Select Birthday'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {showDatePicker && Platform.OS == 'ios' ? (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={datePickerDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                    style={{
                      alignItems: 'stretch',
                      width: Dimensions.get('window').width / 3,
                    }}
                  />
                </View>
              ) : showDatePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={datePickerDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                />
              ) : null}
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
                marginBottom: 0,
                marginTop: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  color: '#333333',
                  fontWeight: 'bold',
                }}>
                <Text>Confirm Password</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Confirm Password"
                  placeholderTextColor="#666666"
                  onChangeText={setPasswordConfirmInput}
                  value={passwordConfirmInput}
                  secureTextEntry={passwordConfirmHide}
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
                      setPasswordConfirmHide(item => !item);
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
                  signUpUser();
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
                    Register User
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
              navigation.navigate('SignIn');
            }}
            style={{alignItems: 'center', top: 10}}>
            <Text style={{fontSize: 12}}>
              If you Already have account
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

export default SignUp;
