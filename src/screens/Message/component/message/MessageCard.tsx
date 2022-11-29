import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {memo, useState} from 'react';
import {Divider, Text} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {colors} from 'src/constants';
import {SCREEN_NAME} from 'src/navigation/constants';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {
  removeEmoji,
  removeHtmlTags,
  trimText,
} from 'src/utils/string-utils/string';
import {messgeTimeFormater} from 'src/utils/date-utils/date';

const MessageCard = (props: any) => {
  const navigation = useNavigation();

  const {
    data: {item},
    rowHeightAnimatedValue,
    removeRow,
    leftActionState,
    rightActionState,
  } = props;

  if (rightActionState) {
    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      removeRow();
    });
  }

  const threadDetails = {
    name1: trimText(
      item?.sender?.platform_name ?? item?.sender?.platform_nick,
      20,
    ),
    name2: removeEmoji(item?.sender?.name ?? item?.sender?.platform_nick),
    date: messgeTimeFormater(item?.updated_datetime),
    image: item?.sender?.image_url,
    message: !!item?.subject
      ? trimText(removeHtmlTags(item?.subject), 45)
      : trimText(removeHtmlTags(item?.last_message?.entity?.content?.body), 45),
    channelType: item?.channel_name,
    ...item,
  };

  const handleNavigate = () => {
    if (threadDetails.channelType === 'email') {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.mail as never, {threadDetails});
    } else {
      //@ts-ignore

      navigation.navigate(SCREEN_NAME.chat as never, {threadDetails});
    }
  };

  return (
    <Animated.View style={[styles.rowFront, {}]}>
      <TouchableOpacity style={[styles.cardContainer]} onPress={handleNavigate}>
        {/* left side of the card */}
        <View style={styles.leftSide}>
          <View style={{position: 'relative'}}>
            <UserAvatar
              name={threadDetails?.name2}
              src={threadDetails?.image}
              size={hp(45)}
              style={{height: hp(45), width: hp(45)}}
              borderRadius={hp(45 * 0.5)}
            />

            <View style={{position: 'absolute', bottom: -4, right: -4}}>
              <ChannelIcon name={threadDetails?.channelType} />
            </View>
          </View>
        </View>

        {/* right side of the card */}
        <View style={styles.rightSide}>
          <View style={{marginLeft: hp(5), width: '100%'}}>
            <View style={styles.nameTimeWrapper}>
              <Text style={styles.nameText}>{threadDetails?.name1}</Text>
              <Text style={styles.timeText}>{threadDetails?.date}</Text>
            </View>

            <Text style={styles.lastmessageText}>{threadDetails?.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </Animated.View>
  );
};

export default memo(MessageCard);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.light,
    flexDirection: 'row',
    height: '80%',
    width: '95%',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    marginVertical: hp(8),
    borderRadius: hp(10),
  },

  rowFront: {
    backgroundColor: colors.light,
    height: 90,
    paddingVertical: hp(5),
  },

  leftSide: {},
  rightSide: {
    marginLeft: 10,
    position: 'relative',
    width: '90%',
    // overflow: 'hidden',
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },

  nameText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(16),
    color: colors.dark,
  },
  isRead: {
    height: hp(12),
    width: wp(12),
    backgroundColor: colors.secondaryBg,
    borderRadius: 30,
  },
  timeText: {
    fontSize: hp(12),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    marginRight: wp(10),
  },

  nameTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  messageTitleText: {
    color: colors.dark,
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
  lastmessageText: {
    color: colors.dark,
    fontSize: hp(14),
    paddingTop: hp(1),
    paddingBottom: hp(5),
    width: '85%',
    textAlign: 'left',
    fontFamily: FONTS.TEXT_REGULAR,
    // overflow: 'hidden',
  },
});
