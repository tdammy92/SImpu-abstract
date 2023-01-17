import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {colors} from 'src/constants';
import {hp} from 'src/utils';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {useDispatch} from 'react-redux';
import {removeReply} from 'src/store/reply/replyReducer';

type chatHeaderProps = {
  threadDetail: any;
  openSheet: any;
};

const ChatHeader = ({threadDetail, openSheet}: chatHeaderProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const {platform_name, image_url, channel_name, name} =
  //   threadDetail?.thread?.sender;
  const sender = threadDetail?.thread?.sender;

  const goBack = () => {
    navigation.goBack();
  };

  // console.log(
  //   'details in header',
  //   JSON.stringify(threadDetail?.thread?.sender, null, 2),
  // );

  return (
    <>
      {threadDetail?.thread?.sender && (
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
                  <View style={{marginLeft: 5}}>
                    {/* @ts-ignore */}
                    {sender && (
                      <UserAvatar
                        size={hp(40)}
                        style={{height: hp(40), width: hp(40)}}
                        borderRadius={hp(40 * 0.5)}
                        name={sender?.platform_name ?? sender?.platform_nick}
                        src={sender?.image_url}
                      />
                    )}
                    <View
                      style={{
                        position: 'absolute',
                        bottom: hp(-4),
                        right: hp(-5),
                      }}>
                      <ChannelIcon name={sender?.channel_name} />
                    </View>
                  </View>
                </TouchableOpacity>
                <Text style={styles.usernameText}>
                  {sender?.platform_name ?? sender?.platform_nick}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{padding: 10}} onPress={openSheet}>
              <View style={styles.headerRight}>
                <SimpleLineIcons
                  name="options-vertical"
                  size={22}
                  color={'#A5ACB8'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Divider />
        </>
      )}
    </>
  );
};

export default ChatHeader;
