import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

const Loading = ({}) => {
  const {appThemeColor} = useSelector(state => state.themeState);

  return (
    <>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="light-content" />
      <SafeAreaView
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{top: -10}}>
          <ActivityIndicator size={50} color={appThemeColor} />
        </View>
        <Text>Loading...</Text>
      </SafeAreaView>
    </>
  );
};

export default Loading;
