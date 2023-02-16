import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeReply} from 'src/store/reply/replyReducer';
import {StoreState} from 'src/@types/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeOutUp,
} from 'react-native-reanimated';
import {hp, wp} from 'src/utils';
import {colors, imageType} from 'src/constants';
import {trimText} from 'src/utils/string-utils/string';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import prettyBytes from 'pretty-bytes';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
const Reply = () => {
  const dispatch = useDispatch();
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const {reply, replyIsActive} = useSelector(
    (state: StoreState) => state.reply,
  );

  const myUser = () => {
    return reply?.author_id === profile?.id ? true : false;
  };

  const isUser = myUser();

  const handleCloseReply = () => {
    dispatch(removeReply());
  };

  // console.log('reply got to input', JSON.stringify(reply, null, 2));

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(300)}>
      <View style={styles.wrapper}>
        <View
          style={{
            // flexDirection: 'row',

            padding: hp(5),
            paddingVertical: hp(2),
            borderLeftWidth: 1.5,
            borderLeftColor: colors.secondaryBg,
            minHeight: hp(40),
          }}>
          <Text style={styles.author}>
            {isUser
              ? 'You'
              : reply?.author?.platform_name ?? reply?.author?.platform_nick}
            :
          </Text>
          {reply?.entity?.content?.body && (
            <Text style={styles.message}>
              {trimText(reply?.entity?.content?.body, 30)}
            </Text>
          )}

          {reply?.entity?.attachments &&
            imageType?.includes(
              mime.extension(reply?.entity?.attachments[0]?.mimetype),
            ) && (
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 40, width: 35, borderRadius: hp(3)}}
                  source={{uri: reply?.entity?.attachments[0]?.data?.url}}
                />
                <View style={{marginLeft: hp(4), alignItems: 'center'}}>
                  <Text style={{fontSize: hp(14), color: colors.darkGray}}>
                    Image
                  </Text>
                  <Text style={{fontSize: hp(12), color: colors.darkGray}}>
                    {prettyBytes(reply?.entity?.attachments[0]?.size)}
                  </Text>
                </View>
              </View>
            )}

          {reply?.entity?.attachments && (
            <>
              {!imageType?.includes(
                //@ts-ignore
                mime.extension(reply?.entity?.attachments[0]?.mimetype),
              ) && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AttachmentIcon
                    fileExetension={mime
                      //@ts-ignore
                      .extension(reply?.entity?.attachments[0]?.mimetype)}
                    size={hp(24)}
                    color={colors.darkGray}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: hp(4),
                    }}>
                    <Text style={[{color: colors.darkGray, fontSize: hp(14)}]}>
                      {mime
                        //@ts-ignore
                        .extension(reply?.entity?.attachments[0]?.mimetype)}
                    </Text>
                    <Text style={{color: colors.darkGray, fontSize: hp(12)}}>
                      {
                        //@ts-ignore
                        prettyBytes(reply?.entity?.attachments[0]?.size)
                      }
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleCloseReply} style={styles.closeReply}>
        <AntDesign
          name="closecircleo"
          color={colors.secondaryBg}
          size={hp(22)}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Reply;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxheight: hp(80),
    paddingVertical: hp(4),
    backgroundColor: '#f9f9f9',
  },
  wrapper: {
    padding: hp(4),
  },
  closeReply: {
    padding: hp(5),
    marginRight: wp(10),
  },
  author: {
    color: colors.secondaryBg,
    fontSize: 16,
    marginBottom: hp(4),
  },
  message: {
    color: colors.dark,
    fontSize: 16,
  },
});
