import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {hp, wp} from 'src/utils';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FONTS, colors} from 'src/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';

const {height} = Dimensions.get('screen');

const MailHeader = ({threadDetail}: any) => {
  const navigation = useNavigation();

  const subject = threadDetail?.thread?.subject;
  const sender = threadDetail?.thread?.sender;

  //   console.log('email header', JSON.stringify(subject, null, 2));

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.headerLeft}>
          <View style={styles.userDetails}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="arrow-back-sharp"
                size={22}
                color={colors.secondaryBg}
              />
              <View style={{marginLeft: 5}}>
                {/* @ts-ignore */}
                <UserAvatar
                  size={hp(30)}
                  style={{height: hp(35), width: hp(35)}}
                  borderRadius={hp(35 * 0.5)}
                  name={sender?.platform_nick ?? sender?.platform_id}
                  src={sender?.image_url}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: hp(-7),
                    right: hp(-7),
                  }}>
                  <ChannelIcon name={sender?.channel_name} />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.usernameText}>
              {sender?.platform_nick ?? sender?.platform_id}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          // onPress={openSheet}
        >
          <View style={styles.headerRight}>
            <SimpleLineIcons
              name="options-vertical"
              size={22}
              color={'#A5ACB8'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: hp(5)}}>
        <Text
          style={{
            marginLeft: wp(15),
            width: '80%',
            fontFamily: FONTS.TEXT_SEMI_BOLD,
          }}>
          {subject}
        </Text>
      </View>
    </View>
  );
};

export default MailHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp(10),
    paddingTop: hp(height * 0.06),
    paddingBottom: hp(height * 0.015),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    // backgroundColor: 'red',
  },

  userDetails: {
    marginLeft: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  usernameText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(16),
    color: colors.dark,
    marginLeft: wp(7),
  },
});
