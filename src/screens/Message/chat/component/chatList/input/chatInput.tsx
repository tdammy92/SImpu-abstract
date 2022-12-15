import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colors} from 'src/constants';
import {hp, wp} from 'src/utils';
// import EmojiPicker from "./emojis/EmojiPicker";

// import { useKeyboard } from "@react-native-community/hooks";

// import { theme } from "../../theme";

const ChatInput = ({reply, closeReply, isLeft, username}: any) => {
  const [message, setMessage] = useState('');
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);

  // useEffect(() => {
  // 	if (showEmojiPicker) {
  // 		height.value = withTiming(400);
  // 	} else {
  // 		height.value = reply ? withSpring(130) : withSpring(70);
  // 	}
  // }, [showEmojiPicker]);

  //   useEffect(() => {
  //     if (reply) {
  //       height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
  //     } else {
  //       height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
  //     }
  //   }, [reply]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {reply ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <AntDesign name="close" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Response to {isLeft ? username : 'Me'}
          </Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      ) : null}
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          {/* <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker(value => !value)}>
            <Icon
              name={showEmojiPicker ? 'close' : 'emoticon-outline'}
              size={23}
              color={theme.colors.description}
            />
          </TouchableOpacity> */}
          <TextInput
            multiline
            placeholder={'Type something...'}
            placeholderTextColor={colors.light}
            style={styles.input}
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Entypo name="attachment" size={23} color={colors.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <AntDesign name="camera" size={23} color={colors.light} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name={'send'} size={20} color={colors.light} />
        </TouchableOpacity>
      </View>
      {/* <EmojiPicker /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //     backgroundColor: colors.light,
    backgroundColor: 'transparent',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: wp(10),
    marginHorizontal: wp(10),
    marginBottom: Platform.OS === 'ios' ? hp(15) : hp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(10),
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: colors.darkGray,
    borderColor: colors.darkGray,
    flex: 3,
    marginRight: wp(10),
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: colors.light,
    flex: 3,
    fontSize: 15,
    height: hp(40),
    maxheight: hp(60),
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.light,
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: colors.dark,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  // recordingTime: {
  // 	color: theme.colors.description,
  // 	fontSize: 20,
  // 	marginLeft: 5,
  // },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: wp(60),
    alignItems: 'center',
    borderTopLeftRadius: hp(30),
    borderTopRightRadius: hp(30),
    height: hp(130),
    paddingTop: hp(20),
  },
  sendButton: {
    backgroundColor: colors.secondaryBg,
    borderRadius: hp(40),
    height: hp(40),
    width: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
