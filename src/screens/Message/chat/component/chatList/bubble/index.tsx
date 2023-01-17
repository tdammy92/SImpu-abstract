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
import stc from 'string-to-color';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  FadeInLeft,
  FadeInRight,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Quoted from './quoted';
import {addReply} from 'src/store/reply/replyReducer';

const ChatBubble = ({item}: any): JSX.Element => {
  const {author_id, author, entity, created_datetime} = item;
  // console.log('each chat item', JSON.stringify(item, null, 2));
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const dispatch = useDispatch();

  //swipe animation value
  const startPosition = 0;
  const x = useSharedValue(startPosition);

  const myUser = () => {
    return author_id === profile?.id ? true : false;
  };

  const isUser = myUser();

  const swipeHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {},
    onActive(event, context) {
      x.value = isUser ? -100 : 100;
    },
    onEnd(event, context) {
      x.value = withSpring(startPosition);
    },
  });

  const swipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  return (
    <FlingGestureHandler
      direction={isUser ? Directions.LEFT : Directions.RIGHT}
      //@ts-ignore
      onGestureEvent={swipeHandler}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          // console.log('selected reply', JSON.stringify(item, null, 2));
          dispatch(addReply(item));
        }
      }}>
      <Animated.View
        entering={isUser ? FadeInRight.duration(300) : FadeInLeft.duration(300)}
        style={[
          styles.bubbleContianer,
          swipeStyle,
          {
            backgroundColor: isUser
              ? colors.secondaryBg
              : colors.bootomHeaderBg,
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            borderBottomLeftRadius: isUser ? hp(10) : hp(0),
            borderBottomRightRadius: isUser ? hp(0) : hp(10),
          },
        ]}>
        <View style={styles.messageHeader}>
          <Text
            style={[
              styles.senderName,
              {color: isUser ? colors.bootomHeaderBg : stc(author?.name)},
            ]}>
            {author?.name}
          </Text>
          <Text
            style={[
              styles.messageDate,
              {color: isUser ? colors.bootomHeaderBg : colors.darkGray},
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
          {/* quoted message */}
          {item?.quoted && <Quoted item={item?.quoted} isUser={isUser} />}
          {/* message componentx */}
          <ChatItem message={item} isUser={isUser} />
        </View>

        {/* send message status */}
        {isUser && (
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
    </FlingGestureHandler>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  bubbleContianer: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(8),
    marginHorizontal: wp(8),
    marginVertical: hp(12),
    maxWidth: '70%',
    minWidth: '25%',
    borderRadius: hp(10),
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(5),
  },

  senderName: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(14),
    marginRight: hp(10),
  },
  messageDate: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(12),
  },
});
