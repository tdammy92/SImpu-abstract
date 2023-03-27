import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {customerType} from 'src/@types/inbox';
import {hp, wp} from 'src/utils';
import {FONTS, FontSize, colors} from 'src/constants';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {removeEmoji} from 'src/utils/string-utils/string';

type PropsType = {
  item: customerType;
  selectCustomer: Function;
};

const Customer = ({item, selectCustomer}: PropsType) => {
  return (
    <TouchableOpacity
      onPress={() => selectCustomer(item)}
      style={{
        flexDirection: 'row',
        paddingVertical: hp(6),
        borderBottomWidth: 0.8,
        borderBottomColor: colors.lightGray,
        alignItems: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <UserAvatar
          name={removeEmoji(item?.platform_name ?? item?.platform_nick)}
          size={hp(30)}
          style={{height: hp(30), width: hp(30)}}
          borderRadius={hp(30 * 0.5)}
          src={item?.image_url}
        />
        <View
          style={{
            position: 'absolute',
            bottom: hp(-2),
            right: wp(-4),
          }}>
          <ChannelIcon name={item?.channel_name} width={15} height={15} />
        </View>
      </View>
      <View style={{marginLeft: wp(5)}}>
        <Text
          style={{
            fontSize: FontSize.MediumText,
            fontFamily: FONTS.TEXT_REGULAR,
            color: colors.dark,
          }}>
          {item?.platform_nick}
        </Text>
        <Text
          style={{
            fontSize: FontSize.SmallText,
            fontFamily: FONTS.TEXT_REGULAR,
            color: colors.dark,
          }}>
          {item?.platform_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Customer;

const styles = StyleSheet.create({});
