import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {taskToggleAction} from '../../../redux/actions/productActions';

const TaskItem = ({item, appThemeColor}) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#dddddd',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 0.7}}>
        <View>
          <Text
            style={{fontSize: 17, color: appThemeColor, fontWeight: 'bold'}}>
            {item.title ? item.title : 'Title is not available'}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              color: item.completed ? 'green' : 'orange',
              fontWeight: 'bold',
            }}>
            {item.completed ? 'Task Done' : 'Task Pending'}
          </Text>
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
        <View>
          <Text style={{color: '#808080'}}>{item.id}</Text>
        </View>
        {item.completed ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(taskToggleAction(item.id));
            }}>
            <Ionicons name="ios-checkbox" color={appThemeColor} size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(taskToggleAction(item.id));
            }}>
            <Ionicons
              name="ios-checkbox-outline"
              color={appThemeColor}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default memo(TaskItem);
