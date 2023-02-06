import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from 'src/constants';
import {copyIdToClipboard, hp, wp} from 'src/utils';
import {useNavigation} from '@react-navigation/native';

import {Divider, Toggle} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Labellist from 'src/components/common/Label';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {FormatText} from 'src/utils/string-utils/string';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Share from 'react-native-share';

import Attachment from './component/attachment';

const height = Dimensions.get('window').height;

const ConversationDetails = ({route}: any) => {
  const {threadDetail} = route.params;
  const navigation = useNavigation();

  // console.log('threaddd', JSON.stringify(threadDetail, null, 2));

  const {sender, inbox} = threadDetail;

  const ShareConversationLink = async () => {
    const link = ``;

    const shareResponse = await Share.open({
      title: 'Share link',
      message: link,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backWrapper}>
          <TouchableOpacity
            style={{paddingTop: hp(20), paddingHorizontal: hp(10)}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color={colors.secondaryBg} />
          </TouchableOpacity>

          {/* non email sender details */}
          <View style={styles.senderWrapper}>
            {sender && (
              <>
                <UserAvatar
                  name={sender?.platform_name}
                  size={hp(60)}
                  style={{height: hp(60), width: hp(60)}}
                  borderRadius={hp(60 * 0.5)}
                  src={sender?.platform_name ?? sender?.image_url}
                />
                <View style={{alignItems: 'center', paddingVertical: hp(5)}}>
                  <Text style={styles.nameText}>{sender?.platform_name}</Text>
                  <Text style={styles.nameText2}>{sender?.platform_nick}</Text>
                </View>
              </>
            )}
          </View>

          {/* email  sender details */}
          {!sender && (
            <View style={{paddingHorizontal: wp(10), paddingVertical: hp(10)}}>
              <Text style={styles.headingText}>Subject:</Text>
              <Text style={[styles.headingText, {paddingVertical: hp(10)}]}>
                {threadDetail?.subject}
              </Text>
            </View>
          )}
        </View>

        <View style={{marginTop: hp(15)}}>
          <View style={[styles.cardList, {paddingHorizontal: wp(20)}]}>
            <Text style={styles.headingText}>Attachaments</Text>
            <Text style={styles.SubHeadingText}>
              {threadDetail?.attachments?.length ?? '0'}
            </Text>
          </View>
          {threadDetail?.attachments?.length > 0 && (
            <ScrollView
              style={styles.attachmentsList}
              horizontal
              // contentContainerStyle={{alignItems: 'center'}}
              showsHorizontalScrollIndicator={false}>
              {threadDetail?.attachments?.map((item: {}, idx: number) => (
                <Attachment
                  item={item}
                  key={`${idx}`}
                  idx={idx}
                  lgt={threadDetail?.attachments?.length}
                />
              ))}
            </ScrollView>
          )}
          <View style={[styles.cardList, {flexDirection: 'column'}]}>
            <View
              style={[
                styles.cardListItem,
                {
                  marginBottom: hp(10),
                },
              ]}>
              <Text style={styles.headingText}>Channel</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.SubHeadingText, {marginRight: hp(4)}]}>
                  {FormatText(threadDetail?.channel_name)}
                </Text>
                <ChannelIcon name={threadDetail?.channel_name} />
              </View>
            </View>
            <Divider style={styles.dividerStyle} />
            <View
              style={[
                styles.cardListItem,
                {
                  // marginBottom: hp(10),
                },
              ]}>
              <Text style={styles.headingText}>Inbox</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.SubHeadingText, {marginRight: hp(4)}]}>
                  {FormatText(inbox?.name)}
                </Text>
                <View
                  style={{
                    height: hp(10),
                    width: hp(10),
                    borderRadius: hp(10 * 0.5),

                    backgroundColor: inbox?.color ?? colors.secondaryBg,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.cardList,
              {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            ]}>
            <View style={{paddingHorizontal: wp(20)}}>
              <Text
                style={[
                  styles.headingText,
                  {
                    paddingVertical: hp(5),
                  },
                ]}>
                Conversation ID
              </Text>
              <Text style={{fontSize: hp(16), color: colors.darkGray}}>
                {threadDetail?.uuid}
              </Text>
            </View>
            <Divider style={styles.dividerStyle} />
            <View
              style={{
                paddingHorizontal: wp(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
                marginTop: hp(5),
              }}>
              <TouchableOpacity
                style={styles.copyBtn}
                onPress={() =>
                  copyIdToClipboard(
                    'Copied Conversation ID',
                    threadDetail?.uuid,
                  )
                }>
                <Text style={styles.copyBtnTxt}>Copy ID</Text>
                <Ionicons name="copy-outline" size={16} color={colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.copyBtn}
                onPress={ShareConversationLink}>
                <Text style={styles.copyBtnTxt}>Share link</Text>
                <Ionicons
                  name="share-social-outline"
                  size={18}
                  color={colors.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.cardList, {flexDirection: 'column'}]}>
            <View
              style={[
                styles.cardListItem,
                {
                  // marginBottom: hp(10),
                },
              ]}>
              <Text style={styles.headingText}>Read By</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(5),
                }}>
                <Text style={styles.SubHeadingText}>0</Text>
              </View>
            </View>
            <Divider style={styles.dividerStyle} />

            <View style={styles.cardListItem}>
              <Text style={styles.headingText}>Status</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(5),
                }}>
                <Text style={styles.SubHeadingText}>{threadDetail?.state}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ConversationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  backWrapper: {
    maxHeight: height * 0.28,
    paddingVertical: hp(20),
    paddingHorizontal: wp(10),
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1.5,
    backgroundColor: colors.light,
  },

  senderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameText: {
    fontSize: hp(18),
    color: colors.dark,
    paddingVertical: hp(4),
  },
  nameText2: {
    fontSize: hp(16),
    color: colors.darkGray,
  },

  dividerStyle: {
    backgroundColor: colors.bootomHeaderBg,
    height: 0.9,
    width: '100%',
    marginVertical: hp(6),
  },
  attachmentsList: {
    // maxHeight: hp(150),
    minHeight: hp(74),
    backgroundColor: colors.lightGray,
    // backgroundColor: 'transparent',
    // backgroundColor: colors.light,
  },

  cardList: {
    backgroundColor: 'white',
    marginVertical: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(15),
  },

  cardListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(20),
  },

  cardListColumn: {},

  headingText: {
    fontSize: hp(16),
    color: colors.dark,
  },
  SubHeadingText: {
    fontSize: hp(14),
    color: colors.dark,
  },

  copyBtn: {
    flexDirection: 'row',
    minWidth: hp(100),
    paddingHorizontal: hp(8),
    paddingVertical: hp(6),
    borderColor: colors.darkGray,
    borderWidth: 0.8,
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  copyBtnTxt: {
    color: colors.dark,
    fontSize: hp(14),
    marginRight: hp(4),
  },
});
