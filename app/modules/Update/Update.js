/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Button,
  TextInput,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import TaskItem from './component/TaskItem';
import {changeThemeAction} from '../../redux/actions/themeActions';
import {authLogOutAction} from '../../redux/actions/authActons';
import {
  getUserTask,
  backGroundApiRequestTaskAction,
} from '../../redux/actions/productActions';

const Update = ({navigation}) => {
  const dispatch = useDispatch();
  const {appThemeColor} = useSelector(state => state.themeState);
  const {userTaskList, userTaskLoading, userTaskError} = useSelector(
    state => state.productState,
  );
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    dispatch(getUserTask());
  }, []);

  const actionUpdateDate = () => {
    dispatch(backGroundApiRequestTaskAction());
  };

  const renderItem = ({item}) => (
    <TaskItem item={item} appThemeColor={appThemeColor} />
  );

  const createdpLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: `https://rnreduxdemodevstree.page.link/1?${text ? text : 'NN'}`,
      domainUriPrefix: 'https://rnreduxdemodevstree.page.link',
      android: {
        packageName: 'com.rnreduxdemo',
        minimumVersion: '18',
        data: text ? text : '',
      },
    });
    console.log(link);

    const result = await Share.share({
      title: 'App link',
      message: link,
      url: link,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor={appThemeColor} barStyle="light-content" />
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <Button onPress={actionUpdateDate} title="background api request" />
        <View style={{marginVertical: 10, marginHorizontal: 10}} />
        <Button onPress={createdpLink} title="Create Dyamic Link" />
      </View>
      <TextInput
        style={{
          backgroundColor: '#dddddd',
          marginHorizontal: 20,
          marginVertical: 10,
          paddingVertical: 5,
        }}
        onChangeText={onChangeText}
        value={text}
      />

      {userTaskLoading ? (
        <View
          style={{
            bottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={40} color={appThemeColor} />
          <View style={{marginTop: 10}}>
            <Text style={{color: '#000000', fontSize: 17}}>Loading</Text>
          </View>
        </View>
      ) : userTaskError ||
        (Array.isArray(userTaskList) && userTaskList.length === 0) ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 20,
          }}>
          <View style={{marginTop: 10}}>
            {Array.isArray(userTaskList) && userTaskList.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{top: 10, color: '#000000', fontSize: 17}}>
                    {userTaskError ? userTaskError : 'No Data Found!'}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{color: '#000000', fontSize: 17}}>
                {userTaskError ? userTaskError : 'Something went wrong'}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <>
          <FlatList
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={5}
            initialNumToRender={10}
            windowSize={5}
            data={userTaskList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Update;
