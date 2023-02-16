import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {memo, useState} from 'react';
import {Divider, Text} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {FONTS, FontSize} from 'src/constants';
import {colors} from 'src/constants';
import {SCREEN_NAME} from 'src/navigation/constants';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {
  removeEmoji,
  removeHtmlTags,
  removeLineBreak,
  trimText,
} from 'src/utils/string-utils/string';
import {messgeTimeFormater} from 'src/utils/date-utils/date';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AttachmentIcon from './AttachmentIcon';
import FileType from './FileType';

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

  //formated data
  const threadDetails = {
    name1: trimText(item?.sender?.name ?? item?.sender?.platform_nick, 18),
    name2: removeEmoji(item?.sender?.name ?? item?.sender?.platform_nick),
    date: messgeTimeFormater(item?.updated_datetime),
    image: item?.sender?.image_url,
    message: !!item?.subject
      ? trimText(removeHtmlTags(item?.subject), 25)
      : removeLineBreak(
          trimText(
            removeHtmlTags(item?.last_message?.entity?.content?.body),
            30,
          ),
        ),
    channelType: item?.channel_name,
    ...item,

    has_attachments: item?.last_message?.entity?.attachments ? true : false,
    attachmentType:
      item?.last_message?.entity?.attachments &&
      item?.last_message?.entity?.attachments[0]?.data?.format,

    attachmentName:
      item?.last_message?.entity?.attachments &&
      item?.last_message?.entity?.attachments[0]?.data,
  };

  const handleNavigate = () => {
    // console.log(JSON.stringify(threadDetails, null, 2));
    if (threadDetails.channelType === 'email') {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.mail as never, {
        threadId: threadDetails?.uuid,
      });
    } else {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.chat as never, {
        threadId: threadDetails?.uuid,
      });
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

            <View style={styles.lastmessageTextWrapper}>
              {threadDetails?.has_attachments && (
                <AttachmentIcon type={threadDetails?.attachmentType} />
              )}

              {threadDetails?.has_attachments && !threadDetails?.message && (
                <FileType type={threadDetails?.attachmentType} />
              )}
              <Text
                style={[
                  styles.lastmessageText,
                  {paddingLeft: threadDetails?.has_attachments ? wp(5) : 0},
                ]}>
                {threadDetails?.message}
              </Text>
            </View>
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
    fontSize: FontSize.BigText,
    color: colors.dark,
  },
  isRead: {
    height: hp(12),
    width: wp(12),
    backgroundColor: colors.secondaryBg,
    borderRadius: 30,
  },
  timeText: {
    fontSize: FontSize.SmallText,
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
    fontSize: FontSize.BigText,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
  lastmessageTextWrapper: {
    flexDirection: 'row',
    color: colors.dark,

    paddingTop: hp(1),
    paddingBottom: hp(5),
    width: '85%',

    alignItems: 'center',
    // overflow: 'hidden',

    // borderWidth: 2,
    // borderColor: 'red',
  },
  lastmessageText: {
    color: colors.dark,
    fontSize: FontSize.MediumText,
    paddingTop: hp(1),
    paddingBottom: hp(5),

    fontFamily: FONTS.TEXT_REGULAR,
  },
});
