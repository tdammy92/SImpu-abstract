import {StyleSheet, Text, Image, View, Pressable} from 'react-native';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import prettyBytes from 'pretty-bytes';
import {StoreState} from 'src/@types/store';
import {hp, splitLastOccurrence, wp} from 'src/utils';
import {FontSize, colors} from 'src/constants';
import {imageType, audioType, videoType, docType} from 'src/constants';
import stc from 'string-to-color';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import {trimText} from 'src/utils/string-utils/string';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
import {FormatText} from 'src/utils/string-utils/string';
import {quotedType} from 'src/@types/inbox';

type QuotedPropType = {
  item: quotedType;
  isUser: boolean;
  isGroup: boolean;
  isSocials: boolean;
  scrollToMessage: any;
};

const Quoted = ({
  item,
  isUser,
  isGroup,
  isSocials,
  scrollToMessage,
}: QuotedPropType) => {
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  // console.log('each quoted item', JSON.stringify(item, null, 2));

  return (
    <Pressable
      onPress={() => scrollToMessage(item?.uuid)}
      style={[
        styles.container,
        {
          backgroundColor: !isSocials
            ? colors.bootomHeaderBg
            : isUser
            ? colors.secondaryBgDark
            : colors.lightGray,
        },
        {
          borderLeftColor: !isSocials
            ? colors.lightGray
            : isUser
            ? colors.bootomHeaderBg
            : isGroup
            ? stc(item?.author?.platform_name ?? item?.author?.platform_nick)
            : colors.secondaryBg,
        },
      ]}>
      <Text
        style={[
          styles.senderName,
          {
            color: isUser
              ? colors.light
              : item?.author?.uuid === profile?.id
              ? colors.dark
              : isGroup
              ? stc(item?.author?.platform_name ?? item?.author?.platform_nick)
              : colors.secondaryBg,
          },
        ]}>
        {item?.author?.uuid === profile?.id ? 'You' : item?.author?.name}:
      </Text>
      <View>
        {item?.entity?.content?.body && (
          <Text
            style={[
              styles.body,
              {
                color: isUser
                  ? colors.light
                  : item?.author?.uuid === profile?.id
                  ? colors.dark
                  : colors.darkGray,
              },
            ]}>
            {trimText(
              item?.entity?.content?.body ?? '',
              !isSocials ? 200 : 100,
            )}
          </Text>
        )}

        {item?.entity?.attachments && (
          <View style={{}}>
            <View style={{minWidth: wp(100)}} />
            {imageType?.includes(
              mime.extension(item?.entity?.attachments[0]?.mimetype),
            ) && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  maxWidth: hp(70),
                }}>
                <Image
                  style={{height: 40, width: 35}}
                  source={{uri: item?.entity?.attachments[0]?.data?.url}}
                />
                <View
                  style={{
                    marginLeft: wp(5),
                  }}>
                  <Text
                    style={{
                      fontSize: FontSize.SmallText,
                      textTransform: 'capitalize',
                      color: isUser ? colors.lightGray : colors?.darkGray,
                    }}>
                    {mime.extension(item?.entity?.attachments[0]?.mimetype)}
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSize.SmallText,
                      textTransform: 'capitalize',
                      color: isUser ? colors.lightGray : colors?.darkGray,
                    }}>
                    {prettyBytes(item?.entity?.attachments[0]?.size)}
                  </Text>
                </View>
              </View>
            )}

            {!imageType?.includes(
              mime.extension(item?.entity?.attachments[0]?.mimetype),
            ) && (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AttachmentIcon
                    fileExetension={mime.extension(
                      item?.entity?.attachments[0]?.mimetype,
                    )}
                    size={hp(24)}
                    color={isUser ? colors.lightGray : colors.darkGray}
                  />
                  <Text
                    style={[
                      styles.fileName,
                      {color: isUser ? colors.lightGray : colors.darkGray},
                    ]}>
                    {splitLastOccurrence(
                      item?.entity?.attachments[0]?.data?.url,
                      '/',
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={[
                      styles.fileInfoText,
                      {color: isUser ? colors.lightGray : colors.darkGray},
                    ]}>
                    {FormatText(
                      mime.extension(item?.entity?.attachments[0]?.mimetype),
                    )}
                    /
                  </Text>

                  <Text
                    style={[
                      styles.fileInfoText,
                      {color: isUser ? colors.lightGray : colors.darkGray},
                    ]}>
                    {prettyBytes(item?.entity?.attachments[0]?.size)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default memo(Quoted);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(5),
    padding: hp(5),
    minWidth: wp(150),

    borderTopRightRadius: hp(5),
    borderBottomRightRadius: hp(5),
    borderLeftWidth: 1.9,
  },
  senderName: {
    fontSize: FontSize.SmallText,
    lineHeight: 18,
  },
  body: {
    fontSize: FontSize.SmallText,
    lineHeight: 18,
  },
  fileName: {
    fontSize: FontSize.SmallText,
  },

  fileInfoText: {
    fontSize: FontSize.SmallText,
  },
});
