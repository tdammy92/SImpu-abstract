import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import React, {useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {colors} from 'src/constants';
import {hp, wp} from 'src/utils';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {useDispatch} from 'react-redux';
import {removeReply} from 'src/store/reply/replyReducer';
import {removeEmoji} from 'src/utils/string-utils/string';
import ContentLoader from 'react-native-easy-content-loader';
import HeaderOption from '../../../threadDetails/component/messageHeaderOption';

type chatHeaderProps = {
  threadDetail: any;
  infoLoading: boolean;
};

const ChatHeader = ({threadDetail, infoLoading}: chatHeaderProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const chatOptionRef = useRef<any>(null);

  // const {platform_name, image_url, channel_name, name} =
  //   threadDetail?.thread?.sender;
  const sender = threadDetail?.thread?.sender;

  const goBack = () => {
    navigation.goBack();
  };

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

  return (
    <>
      <>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.userDetails}>
              <TouchableOpacity
                onPress={goBack}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="arrow-back-sharp"
                  size={22}
                  color={colors.secondaryBg}
                />

                {/* @ts-ignore */}
                {infoLoading ? (
                  // @ts-ignore
                  <ContentLoader
                    avatar
                    active
                    containerStyles={{
                      backgroundColor: 'transparent',
                      marginRight: wp(10),
                      width: hp(40),
                    }}
                    title={false}
                    pRows={0}
                    loading={infoLoading}
                  />
                ) : (
                  <View style={{marginLeft: 5}}>
                    <UserAvatar
                      size={hp(40)}
                      style={{height: hp(40), width: hp(40)}}
                      borderRadius={hp(40 * 0.5)}
                      name={removeEmoji(
                        sender?.platform_name ?? sender?.platform_nick,
                      )}
                      src={sender?.image_url}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: hp(-4),
                        right: hp(-5),
                      }}>
                      <ChannelIcon name={sender?.channel_name} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              {!infoLoading ? (
                <Text style={styles.usernameText}>
                  {sender?.platform_name ?? sender?.platform_nick}
                </Text>
              ) : (
                // @ts-ignore
                <ContentLoader
                  active
                  containerStyles={{
                    backgroundColor: 'transparent',
                    marginLeft: wp(10),
                    width: hp(40),
                  }}
                  title={false}
                  pRows={1}
                  loading={infoLoading}
                  pHeight={[15]}
                  pWidth={[hp(150)]}
                />
              )}
            </View>
          </View>
          {!infoLoading && threadDetail && (
            <TouchableOpacity style={{padding: 10}} onPress={openSheet}>
              <View style={styles.headerRight}>
                <SimpleLineIcons
                  name="options-vertical"
                  size={22}
                  color={colors.darkGray}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Divider />
      </>
      <HeaderOption ref={chatOptionRef} threadDetail={threadDetail} />
    </>
  );
};

export default ChatHeader;
