import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, memo} from 'react';
import {hp, wp} from 'src/utils';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FONTS, FontSize, colors} from 'src/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ContentLoader from 'react-native-easy-content-loader';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {Avatar} from 'src/constants';
import Availble from 'src/assets/images/Available.svg';
import HeaderOption from 'src/screens/Message/threadDetails/component/messageHeaderOption';
import Resolve from 'src/screens/Message/threadDetails/resolve-thread';

const {height} = Dimensions.get('screen');

const MailHeader = ({threadDetail, loading}: any) => {
  const navigation = useNavigation();
  const chatOptionRef = useRef<any>(null);
  const resolveRef = useRef<any>(null);

  const thread = threadDetail?.thread;
  const subject = threadDetail?.thread?.subject;
  // const sender = threadDetail?.thread?.sender;

  // console.log('email header', JSON.stringify(threadDetail, null, 2));

  //open sheet code
  const openSheet = () => {
    // setchannelName(channel);
    if (chatOptionRef.current) {
      chatOptionRef.current.open();
    }
  };

  // close sheet
  const closeSheet = () => {
    if (chatOptionRef.current) {
      chatOptionRef.current.close();
    }
  };

  //open sresolveSheet
  const openResolve = () => {
    closeSheet();
    setTimeout(() => {
      if (resolveRef.current) {
        resolveRef.current.open();
      }
    }, 300);
  };

  return (
    <>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.headerLeft}>
            <View style={styles.backBtnWrapper}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="arrow-back-sharp"
                  size={22}
                  color={colors.secondaryBg}
                />

                {loading ? ( // @ts-ignore
                  <ContentLoader
                    avatar
                    active
                    containerStyles={{}}
                    title={false}
                    pRows={0}
                    loading={loading}
                  />
                ) : (
                  <View
                    style={[
                      styles.ChannelIconBackground,
                      {
                        backgroundColor: colors.bootomHeaderBg,
                      },
                    ]}>
                    <ChannelIcon
                      name={thread?.channel_name}
                      height={20}
                      width={20}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.inboxStyle}>
              <Availble
                height={hp(12)}
                width={hp(12)}
                color={thread?.inbox?.color ?? colors?.secondaryBgDark}
              />
              <Text style={{color: colors.dark, marginLeft: wp(3)}}>
                {thread?.inbox.name}
              </Text>
            </View>
            <TouchableOpacity style={{padding: 10}} onPress={openSheet}>
              <View style={{}}>
                <SimpleLineIcons
                  name="options-vertical"
                  size={22}
                  color={colors?.darkGray}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* email subject */}

        {loading ? ( // @ts-ignore
          <ContentLoader
            active
            containerStyles={
              {
                // backgroundColor: 'transparent',
                // marginRight: wp(10),
                // width: hp(40),
              }
            }
            title={false}
            pRows={2}
            pHeight={[15, 15]}
            loading={loading}
          />
        ) : (
          <View style={{marginVertical: hp(5)}}>
            <Text
              style={{
                fontSize: FontSize.MediumText,
                marginLeft: wp(15),
                width: '85%',
                fontFamily: FONTS.TEXT_SEMI_BOLD,
                color: colors.dark,
              }}>
              {subject}
            </Text>
          </View>
        )}
      </View>
      <Resolve ref={resolveRef} threadDetail={threadDetail} />
      <HeaderOption
        ref={chatOptionRef}
        threadDetail={threadDetail}
        openResolve={openResolve}
        closeSheet={closeSheet}
      />
    </>
  );
};

export default memo(MailHeader);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp(10),
    paddingTop: hp(height * 0.06),
    paddingBottom: hp(height * 0.015),
    alignSelf: 'center',
    width: '100%',
    // backgroundColor:,
  },

  headerLeft: {},

  ChannelIconBackground: {
    marginLeft: 5,
    padding: hp(5),
    height: hp(40),
    width: hp(40),
    borderRadius: hp(40 * 0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inboxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(5),
    backgroundColor: colors.bootomHeaderBg,
    padding: hp(5),
    borderRadius: hp(5),
  },
  backBtnWrapper: {},
});
