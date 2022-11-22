import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';
import {format} from 'date-fns';

const Comments = ({data}: any) => {
  return (
    <View
      style={{
        marginHorizontal: wp(15),
        alignItems: 'center',
        padding: hp(5),
        //    backgroundColor: colors.bootomHeaderBg,
        borderRadius: 15,
      }}>
      <Text
        style={{
          fontFamily: FONTS.TEXT_REGULAR,
          color: colors.dark,
          fontSize: hp(12),
        }}>
        Conversation started at{' '}
        {format(new Date(data?.created_datetime), 'pp d-MMM-yyyy ')}
      </Text>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
