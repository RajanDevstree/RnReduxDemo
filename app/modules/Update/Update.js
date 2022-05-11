/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Button,
  TextInput,
  Share,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  BannerAdSize,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from '@react-native-firebase/admob';

import TaskItem from './component/TaskItem';
import {
  getUserTask,
  backGroundApiRequestTaskAction,
} from '../../redux/actions/productActions';

const Update = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTask());
  }, []);

  useEffect(() => {
    // admob()
    //   .setRequestConfiguration({
    //     maxAdContentRating: MaxAdContentRating.PG,
    //     tagForChildDirectedTreatment: true,
    //     tagForUnderAgeOfConsent: true,
    //   })
    //   .then(() => {});
  }, []);

  useEffect(() => {
    let interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    let interstitialListeener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
    });
    interstitial.load();

    return () => {
      interstitialListeener = null;
    };
  }, []);

  // useEffect(() => {
  //   let rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });

  //   let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
  //     if (type === RewardedAdEventType.LOADED) {
  //       rewardAd.show();
  //     }

  //     if (type === RewardedAdEventType.EARNED_REWARD) {
  //       alert(`earned + ${reward.amount}`);
  //       console.log(reward, '1234567890');
  //     }
  //   });
  //   rewardAd.load();

  //   return () => {
  //     rewardAdListener = null;
  //   };
  // }, []);

  const {appThemeColor} = useSelector(state => state.themeState);
  const {userTaskList, userTaskLoading, userTaskError} = useSelector(
    state => state.productState,
  );
  const [text, onChangeText] = useState('');

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
      ios: {
        bundleId: 'com.devstree.rnreduxdemo',
        appStoreId: '12345678',
        minimumVersion: '18',
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

      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

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
