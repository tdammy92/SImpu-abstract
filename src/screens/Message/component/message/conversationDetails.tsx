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
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import {Divider, Toggle} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Labellist from 'src/components/common/Label';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {FormatText} from 'src/utils/string-utils/string';
const height = Dimensions.get('window').height;

const ConversationDetails = ({route}: any) => {
  const {threadDetail} = route.params;
  const navigation = useNavigation();

  const {sender, inbox} = threadDetail;

  return (
    <>
      {/* <StatusBar
        backgroundColor={colors.light}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      /> */}
      <View style={styles.container}>
        <View style={styles.backWrapper}>
          <TouchableOpacity
            style={{paddingTop: hp(20), paddingHorizontal: hp(10)}}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color={colors.secondaryBg} />
          </TouchableOpacity>

          <View style={styles.senderWrapper}>
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
          </View>
        </View>

        <View style={{marginTop: hp(15)}}>
          <View style={[styles.cardList, {flexDirection: 'column'}]}>
            <View
              style={[
                styles.cardListItem,
                {
                  marginBottom: hp(10),
                },
              ]}>
              <Text style={{fontSize: hp(16)}}>Channel</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp(14), marginRight: hp(4)}}>
                  {FormatText(sender?.channel_name)}
                </Text>
                <ChannelIcon name={sender?.channel_name} />
              </View>
            </View>
            <Divider
              style={{
                backgroundColor: colors.bootomHeaderBg,
                height: 0.9,
                width: '100%',
                marginVertical: hp(6),
              }}
            />
            <View
              style={[
                styles.cardListItem,
                {
                  // marginBottom: hp(10),
                },
              ]}>
              <Text style={{fontSize: hp(16)}}>Inbox</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp(14), marginRight: hp(4)}}>
                  {FormatText(inbox?.name)}
                </Text>
                <View
                  style={{
                    height: hp(10),
                    width: hp(10),
                    borderRadius: hp(10 * 0.5),
                    // marginRight: hp(4),
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
                style={{
                  fontSize: hp(16),
                  paddingVertical: hp(5),
                  color: colors.dark,
                }}>
                Conversation ID
              </Text>
              <Text style={{fontSize: hp(14), color: colors.darkGray}}>
                {threadDetail?.uuid}
              </Text>
            </View>
            <Divider
              style={{
                backgroundColor: colors.bootomHeaderBg,
                height: 0.9,
                width: '100%',
                marginVertical: hp(6),
              }}
            />
            <View
              style={{
                paddingHorizontal: wp(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
                marginTop: hp(5),
              }}>
              <TouchableOpacity style={styles.copyBtn}>
                <Text style={styles.copyBtnTxt}>Copy ID</Text>
                <Ionicons name="copy-outline" size={16} color={colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.copyBtn}>
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
              <Text style={{fontSize: hp(16)}}>Read By</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(5),
                }}>
                <Text style={{fontSize: hp(16)}}>0</Text>
              </View>
            </View>
            <Divider
              style={{
                backgroundColor: colors.bootomHeaderBg,
                height: 0.9,
                width: '100%',
                marginVertical: hp(6),
              }}
            />

            <View style={styles.cardListItem}>
              <Text style={{fontSize: hp(16)}}>Status</Text>
              <View
                style={{
                  backgroundColor: colors.bootomHeaderBg,
                  padding: hp(5),
                  borderRadius: hp(5),
                }}>
                <Text style={{fontSize: hp(14)}}>
                  {threadDetail?.is_assignee ? 'Assigned' : 'Not Assigned'}
                </Text>
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
    // overflow: 'hidden',
    // backgroundColor: 'red',
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

  cardList: {
    backgroundColor: 'white',
    marginVertical: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(15),
    // marginHorizontal: hp(5),
    // borderRadius: 10,
  },

  cardListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(20),
  },

  copyBtn: {
    flexDirection: 'row',
    paddingHorizontal: hp(8),
    paddingVertical: hp(6),
    borderColor: colors.darkGray,
    borderWidth: 0.8,
    borderRadius: hp(5),
    alignItems: 'center',
  },

  copyBtnTxt: {
    color: colors.dark,
    fontSize: hp(14),
    marginRight: hp(4),
  },
});
