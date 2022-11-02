import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {GiftedChat, Bubble, IMessage} from 'react-native-gifted-chat';

import {Chat, MessageType, defaultTheme} from '@flyerhq/react-native-chat-ui';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import {colors, FONTS} from 'src/constants';
import HeaderOption from './component/chatHeaderOption';
import {SCREEN_NAME} from 'src/navigation/constants';
import {StoreState} from 'src/@types/store';

const ChatBox = ({prop, route, navigation}: any) => {
  const {profile} = useSelector((state: StoreState) => state.user);
  const [User, setUser] = useState<any>({});
  const [messages, setMessages] = useState<any>();

  const user = {id: profile?.id};

  // console.log({}, profile, 2);

  const chatOptionRef = useRef<any>(null);

  //open sheet code
  const openSheet = () => {
    // setchannelName(channel);
    if (chatOptionRef.current) {
      chatOptionRef.current.open();
    }
  };

  //close sheet
  const closeSheet = () => {
    if (chatOptionRef.current) {
      chatOptionRef.current.close();
    }
  };

  //formating messsage
  const formatMessage = (chatUser: any) => {
    return chatUser?.chats?.map((msg: any) => {
      return {
        _id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: msg.author.id,
          name: chatUser.name,
          avatar: chatUser.avatar,
        },
      };
    });
  };

  useEffect(() => {
    const res = route.params;

    setUser(res.user);
    const msg = formatMessage(res.user);
    setMessages(msg);
  }, [navigation]);

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: '' + Date.now(),
      text: message.text,
      type: 'text',
    };
    addMessage(textMessage);
  };

  const handleAttachmentPress = () => {
    // showActionSheetWithOptions(
    //   {
    //     options: ['Photo', 'File', 'Cancel'],
    //     cancelButtonIndex: 2,
    //   },
    //   (buttonIndex) => {
    //     switch (buttonIndex) {
    //       case 0:
    //         handleImageSelection()
    //         break
    //       case 1:
    //         handleFileSelection()
    //         break
    //     }
    //   }
    // )
  };

  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
  };

  return (
    <>
      <View style={styles.container}>
        {/* chat header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.userDetails}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                // onPress={() => navigation.navigate(SCREEN_NAME.main)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="arrow-back-sharp"
                  size={22}
                  color={colors.secondaryBg}
                />
                <View style={{marginLeft: 5}}>
                  {/* @ts-ignore */}
                  {User?.name2 && (
                    //@ts-ignore
                    <UserAvatar
                      size={40}
                      name={User?.name2}
                      src={User?.image}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* @ts-ignore */}
              <Text style={styles.usernameText}>{User?.name1}</Text>
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

        {/* chat component */}
        <View style={{flex: 1}}>
          <Chat
            messages={messages ?? []}
            sendButtonVisibilityMode="always"
            onAttachmentPress={handleAttachmentPress}
            // onMessagePress={handleMessagePress}
            // onPreviewDataFetched={handlePreviewDataFetched}
            onSendPress={handleSendPress}
            user={user}
            showUserAvatars={true}
            showUserNames={true}
            enableAnimation={true}
            theme={{
              ...defaultTheme,
              colors: {
                ...defaultTheme.colors,
                inputBackground: '#026AE8',
              },
              borders: {
                inputBorderRadius: 10,
                messageBorderRadius: 10,
              },
            }}
          />
        </View>
      </View>
      <HeaderOption ref={chatOptionRef} />
    </>
  );
};

export default ChatBox;
