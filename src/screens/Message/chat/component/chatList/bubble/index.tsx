import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import ChatItem from './chatItem';

const ChatBubble = ({item}: any): JSX.Element => {
  const {author_id, author, created_datetime} = item;
  // console.log('each chat item', JSON.stringify(item, null, 2));
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const myUser = () => {
    return author_id === profile.id ? true : false;
  };

  return (
    <View
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
      <View>
        {/* message componentx */}
        <ChatItem message={item} isUser={myUser} />
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  bubbleContianer: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(8),
    marginHorizontal: wp(8),
    marginVertical: hp(10),
    maxWidth: '65%',
    minWidth: '25%',
    borderRadius: hp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.15,

    elevation: 1.5,
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
