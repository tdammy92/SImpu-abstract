import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import BackIcon from 'src/assets/images/BackIcon.svg';
import {wp, hp} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
useNavigation;

const HeaderBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        paddingLeft: 10,
        height: hp(50),
        width: wp(60),
        // backgroundColor: 'red',
        // alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => navigation.goBack()}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default HeaderBack;
