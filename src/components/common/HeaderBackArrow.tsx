import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {hp} from 'src/utils';

const HeaderBackArrow = () => {
  const navigation = useNavigation();
  const user = useSelector((state: StoreState) => state.user.profile);

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        marginLeft: hp(4),
      }}>
      <AntDesign name="arrowleft" size={24} color={'#276EF1'} />
    </TouchableOpacity>
  );
};

export default HeaderBackArrow;

const styles = StyleSheet.create({});
