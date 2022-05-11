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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

import TaskItem from '../../modules/Home/component/TaskItem';
import {changeThemeAction} from '../../redux/actions/themeActions';
import {authLogOutAction} from '../../redux/actions/authActons';
import {getUserTask} from '../../redux/actions/productActions';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {appThemeColor} = useSelector(state => state.themeState);
  const {userTaskList, userTaskLoading, userTaskError} = useSelector(
    state => state.productState,
  );

  useEffect(() => {
    dispatch(getUserTask());
  }, []);

  const renderItem = ({item}) => (
    <TaskItem item={item} appThemeColor={appThemeColor} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor={appThemeColor} barStyle="light-content" />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: appThemeColor,
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(changeThemeAction());
          }}
          style={{
            position: 'absolute',
            left: '6%',
            zIndex: 100,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Ionicons size={23} color="#FFFFFF" name="color-palette-sharp" />
        </TouchableOpacity>

        <Text style={{color: '#FFFFFF', fontSize: 17}}>Dashboard</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(authLogOutAction());
          }}
          style={{
            position: 'absolute',
            right: '6%',
            zIndex: 100,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Ionicons size={23} color="#FFFFFF" name="log-out-outline" />
        </TouchableOpacity>
      </View>

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

export default Home;
