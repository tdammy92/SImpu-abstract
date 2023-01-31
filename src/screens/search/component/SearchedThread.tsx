import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {hp, wp} from 'src/utils';
import {FONTS, colors} from 'src/constants';
import {SCREEN_NAME} from 'src/navigation/constants';
import {trimText} from 'src/utils/string-utils/string';
import stc from 'string-to-color';

//Search list item components
const SearchThread = ({item, idx, lt}: any) => {
  const navigation = useNavigation();

  // console.log('from individual conversation', JSON.stringify(item, null, 2));

  //navigate to individual chat
  const handleNavigation = () => {
    if (item?.channel_name === 'email') {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.mail as never, {threadId: item?.uuid});
    } else {
      //@ts-ignore

      navigation.navigate(SCREEN_NAME.chat as never, {threadId: item?.uuid});
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {marginBottom: idx === lt - 1 ? hp(150) : hp(5)},
        ]}
        onPress={handleNavigation}>
        <View>
          <UserAvatar
            name={item?.sender?.platform_name ?? item?.sender?.platform_nick}
            size={hp(30)}
            style={{height: hp(30), width: hp(30)}}
            borderRadius={hp(30 * 0.5)}
            src={item?.sender?.image_url}
          />
        </View>
        <View style={styles.info}>
          <Text
            style={[
              styles.nameText,
              {
                // color: stc(
                //   item?.sender?.platform_name ?? item?.sender?.platform_nick,
                // ),
              },
            ]}>
            {item?.channel_name === 'email'
              ? trimText(item?.subject, 25)
              : trimText(item?.last_message?.entity?.content?.body, 25)}
          </Text>
          <Text style={styles.messageText}>
            {trimText(
              item?.sender?.platform_name ?? item?.sender?.platform_nick,
              20,
            )}
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: hp(5),
            right: hp(1),
            // backgroundColor: colors.lightGray,
            // borderRadius: hp(10),
            // padding: hp(5),
          }}>
          {item?.channel_name && <ChannelIcon name={item?.channel_name} />}
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default SearchThread;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: 5,
    paddingVertical: hp(10),
    alignItems: 'center',
  },

  info: {
    justifyContent: 'center',
    marginLeft: 7,
  },
  nameText: {
    fontSize: hp(16),
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
  },
  messageText: {
    fontSize: hp(14),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },
});
