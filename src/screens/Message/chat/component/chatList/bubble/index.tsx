import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {Avatar, colors, FONTS, FontSize} from 'src/constants';
import {copyIdToClipboard, hp, wp} from 'src/utils';
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
  color,
} from 'react-native-reanimated';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Modal from 'react-native-modal';
import Quoted from '../../../../Quoted/quoted';
import {addReply} from 'src/store/reply/replyReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {addToForward, removeForward} from 'src/store/forward/forwardReducer';
import ForwardModal from './fowardToModal';
import {trimText} from 'src/utils/string-utils/string';

const {height, width} = Dimensions.get('screen');

const ChatBubble = ({item, id, isGroup, scrollToMessage}: any): JSX.Element => {
  const {author_id, author, entity, created_datetime} = item;
  const dispatch = useDispatch();

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {ContextMenu, SlideInMenu, Popover} = renderers;
  const [showForwardModal, setshowForwardModal] = useState(false);
  // const [ForwardItem, setForwardItem] = useState<any>({});
  // const [searchContact, setsearchContact] = useState('');
  // const [Contact, setContact] = useState([]);
  // const [SlectedContact, setSlectedContact] = useState('');

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

  const OpenForward = (selectedItem: any) => {
    setshowForwardModal(true);
    dispatch(addToForward(selectedItem));
  };

  const CloseForward = () => {
    // console.log('modal close got clicked');
    setshowForwardModal(false);
    dispatch(removeForward());
  };

  const swipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });
  // console.log('contact', JSON.stringify(item, null, 2));

  return (
    <>
      <Menu
        renderer={SlideInMenu}
        rendererProps={{
          anchorStyle: {},
          placement: 'auto',
          preferredPlacement: isUser ? 'right' : 'left',
        }}>
        {/* <TouchableOpacity onLongPress={handleLongPres}> */}
        <MenuTrigger
          triggerOnLongPress={true}
          customStyles={{
            triggerOuterWrapper: {},
            triggerWrapper: {},
            triggerTouchable: {
              activeOpacity: 1,
              underlayColor: 'transparent',
            },
          }}>
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
              entering={
                isUser ? FadeInRight.duration(300) : FadeInLeft.duration(300)
              }
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
                  marginBottom: id === 0 ? hp(80) : hp(10),
                },
              ]}>
              <View style={styles.messageHeader}>
                <Text
                  style={[
                    styles.senderName,
                    {
                      width: 'auto',

                      color: isUser
                        ? colors.bootomHeaderBg
                        : isGroup
                        ? stc(author?.name)
                        : colors.secondaryBg,
                    },
                  ]}>
                  {trimText(author?.name, 10)}
                </Text>
                <Text
                  style={[
                    styles.messageDate,
                    {
                      color: isUser ? colors.bootomHeaderBg : colors.darkGray,
                      width: 'auto',
                    },
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
                {item?.quoted && (
                  <Quoted
                    item={item?.quoted}
                    isUser={isUser}
                    isGroup={isGroup}
                    isSocials={true}
                    scrollToMessage={scrollToMessage}
                  />
                )}
                {/* message componentx */}
                <ChatItem message={item} isUser={isUser} />
              </View>

              {/* send message status */}
              {isUser && (
                <View
                  style={{
                    height: hp(20),
                    width: wp(20),
                    position: 'absolute',
                    right: wp(-7),
                    bottom: hp(-20),
                    // bottom: Platform.OS === 'android' ? hp(-21) : hp(-18),
                  }}>
                  {entity?.status === 'sent' || entity?.status === 'sending' ? (
                    <Ionicons
                      name="ios-checkmark-circle-outline"
                      color={colors.secondaryBg}
                      size={hp(14)}
                    />
                  ) : (
                    <AntDesign
                      name="clockcircleo"
                      color={colors.secondaryBg}
                      size={hp(12)}
                      style={{marginTop: hp(3)}}
                    />
                  )}
                </View>
              )}
            </Animated.View>
          </FlingGestureHandler>
        </MenuTrigger>

        {/* conetext menu  */}
        <MenuOptions
          optionsContainerStyle={{
            borderTopLeftRadius: hp(15),
            borderTopRightRadius: hp(15),
            paddingHorizontal: hp(8),
            paddingVertical: hp(15),
          }}>
          <MenuOption
            onSelect={() => dispatch(addReply(item))}
            customStyles={{optionWrapper: optionWrapperStyle}}>
            <View style={styles.menuOptionConatiner}>
              <MaterialCommunityIcons
                name="reply"
                color={colors.dark}
                size={hp(22)}
              />
              <Text style={styles.menuOptionText}>Reply</Text>
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() => OpenForward(item)}
            customStyles={{optionWrapper: optionWrapperStyle}}>
            <View style={styles.menuOptionConatiner}>
              <Entypo name="forward" color={colors.dark} size={hp(22)} />
              <Text style={styles.menuOptionText}>Forward</Text>
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() => {}}
            customStyles={{
              optionWrapper: {...optionWrapperStyle},
            }}>
            <View style={styles.menuOptionConatiner}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                color={'red'}
                size={hp(22)}
              />
              <Text style={[styles.menuOptionText, {color: 'red'}]}>
                Delete Message
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() =>
              copyIdToClipboard(
                'Message copied',
                item?.entity?.content?.body,
                false,
              )
            }
            customStyles={{
              optionWrapper: {...optionWrapperStyle, borderBottomWidth: 0},
            }}>
            <View style={styles.menuOptionConatiner}>
              <MaterialCommunityIcons
                name="content-copy"
                color={colors.dark}
                size={hp(22)}
              />
              <Text style={styles.menuOptionText}>Copy Message ID</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>

      {/* forward modal  */}
      <ForwardModal
        closeFowardModal={CloseForward}
        showForwardModal={showForwardModal}
      />
    </>
  );
};

export default ChatBubble;

const optionWrapperStyle = {
  paddingVertical: hp(10),
  borderBottomColor: colors.lightGray,
  borderBottomWidth: 1,
};

const optionWrapper = {};

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
    fontSize: FontSize.MediumText,
    marginRight: hp(10),
  },
  messageDate: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.SmallText,
  },

  menuOptionConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  menuOptionText: {
    fontSize: FontSize.MediumText,
    color: colors.dark,
    marginLeft: hp(10),
  },
});
