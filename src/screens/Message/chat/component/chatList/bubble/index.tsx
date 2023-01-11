import React from 'react';
import {StyleSheet, Platform, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import ChatItem from './chatItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';

const ChatBubble = ({item}: any): JSX.Element => {
  const {author_id, author, entity, created_datetime} = item;
  // console.log('each chat item', JSON.stringify(item, null, 2));
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const myUser = () => {
    return author_id === profile?.id ? true : false;
  };

  return (
    <Animated.View
      entering={myUser() ? FadeInRight.duration(300) : FadeInLeft.duration(300)}
      style={[
        styles.bubbleContianer,
        {
          backgroundColor: myUser()
            ? colors.secondaryBg
            : colors.bootomHeaderBg,
          alignSelf: myUser() ? 'flex-end' : 'flex-start',
          borderBottomLeftRadius: myUser() ? hp(10) : hp(0),
          borderBottomRightRadius: myUser() ? hp(0) : hp(10),
        },
      ]}>
      <View style={styles.messageHeader}>
        <Text
          style={[
            styles.senderName,
            {color: myUser() ? colors.bootomHeaderBg : colors.darkGray},
          ]}>
          {author?.name}
        </Text>
        <Text
          style={[
            styles.messageDate,
            {color: myUser() ? colors.bootomHeaderBg : colors.darkGray},
          ]}>
          {format(new Date(created_datetime), 'p')}
        </Text>
      </View>
      <View
        style={
          {
            // width: '100%'
          }
        }>
        {/* message componentx */}
        <ChatItem message={item} isUser={myUser} />
      </View>

      {myUser() && (
        <View
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            right: wp(-7),
            bottom: Platform.OS === 'android' ? hp(-21) : hp(-18),
          }}>
          {entity?.status === 'sent' || entity?.status === 'sending' ? (
            <Ionicons
              name="ios-checkmark-circle-outline"
              color={colors.secondaryBg}
              size={14}
            />
          ) : (
            <AntDesign
              name="clockcircleo"
              color={colors.secondaryBg}
              size={14}
            />
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  bubbleContianer: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(8),
    marginHorizontal: wp(8),
    marginVertical: hp(12),
    maxWidth: '65%',
    minWidth: '25%',
    borderRadius: hp(10),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 1.15,

    // elevation: 1.5,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(5),
  },

  senderName: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(12),
    marginRight: hp(10),
  },
  messageDate: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(12),
  },
});
