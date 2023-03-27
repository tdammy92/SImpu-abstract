import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {FONTS, FontSize, colors, imageType} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import CustomText from 'src/components/common/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {addReply} from 'src/store/reply/replyReducer';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import prettyBytes from 'pretty-bytes';
import {attachmentType} from 'src/@types/inbox';
import Quoted from '../Quoted/quoted';

const Comments = ({data}: any) => {
  const dispatch = useDispatch();
  // console.log('comment  check reply', JSON.stringify(data, null, 2));

  // const mentions = useMemo(() => return data?.entity?.mentions?.map((mention)=>), [data])
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          // justifyContent: 'center',
        },
      ]}>
      <UserAvatar
        size={hp(30)}
        style={{height: hp(30), width: hp(30)}}
        borderRadius={hp(30 * 0.5)}
        name={data?.author?.name}
        src={data?.author?.image_url}
      />
      <View style={[styles.rightContainer, {width: '80%'}]}>
        <Text style={styles.authorText}>{data?.author?.name}:</Text>
        {data?.quoted && (
          <Quoted
            item={data?.quoted}
            isUser={false}
            isGroup={false}
            isSocials={false}
            // isUser={isUser}
            // isGroup={isGroup}
          />
        )}
        <Text
          style={[
            styles.bodyText,
            {
              marginRight: hp(10),
            },
          ]}>
          {/* {data?.entity?.content.body} */}
          <CustomText
            text={data?.entity?.content.body}
            mentions={data?.entity?.mentions}
          />
        </Text>
        {data?.entity?.attachments &&
          data?.entity?.attachments?.map((file: attachmentType, i: number) => {
            if (imageType.includes(mime.extension(file?.mimetype))) {
              return (
                <View
                  key={`${i}`}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.bootomHeaderBg,
                    width: '55%',
                    padding: hp(5),
                    borderRadius: hp(10),
                    marginVertical: hp(5),
                  }}>
                  <Image
                    source={{uri: file?.data?.url}}
                    style={{height: hp(40), width: hp(35)}}
                  />
                  <View style={{marginLeft: wp(4)}}>
                    <Text style={styles.bodyText}>{file?.data?.format}</Text>
                    <Text
                      style={[
                        styles.commentDate,
                        {fontSize: FontSize.SmallText},
                      ]}>
                      {prettyBytes(file?.size ?? 0)}
                    </Text>
                  </View>
                </View>
              );
            }
            return (
              <View
                key={`${i}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.bootomHeaderBg,
                  width: '55%',
                  padding: hp(5),
                  borderRadius: hp(10),
                }}>
                <AttachmentIcon
                  fileExetension={mime.extension(file?.mimetype)}
                  size={hp(22)}
                  color={colors.secondaryBg}
                />
                <View style={{marginLeft: wp(4)}}>
                  <Text style={styles.bodyText}>{file?.data?.format}</Text>
                  <Text
                    style={[
                      styles.commentDate,
                      {fontSize: FontSize.SmallText},
                    ]}>
                    {prettyBytes(file?.size ?? 0)}
                  </Text>
                </View>
              </View>
            );
          })}
        <Text style={styles.commentDate}>
          {format(new Date(data?.created_datetime), 'dd-MM-yy p')}
        </Text>
      </View>

      <TouchableOpacity
        style={{padding: hp(10)}}
        onPress={() => dispatch(addReply(data))}>
        <Entypo name="reply" size={hp(20)} color={colors.darkGray} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Comments);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(15),
    marginVertical: hp(10),
    alignItems: 'center',
    padding: hp(5),
    // paddingVertical: hp(5),
    // borderRadius: 15,
    borderBottomColor: colors.bootomHeaderBg,
    borderBottomWidth: 1,
  },

  rightContainer: {
    marginLeft: wp(10),
  },

  bodyText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  authorText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  actionText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  commentText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  commentDate: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
  },
});
