import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Text} from '@ui-kitten/components';
import React from 'react';
import {hp, wp} from 'src/utils';

const MessageCard = ({item}: any) => {
  const {name, avatar} = item;
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Text>{name}</Text>
      <Avatar source={{uri: avatar}} size="small" />
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: wp(20),
    marginVertical: hp(8),
    borderRadius: hp(10),
  },
});
