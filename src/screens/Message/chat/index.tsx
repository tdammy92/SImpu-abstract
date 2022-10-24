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
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import {colors, FONTS} from 'src/constants';
import {messgeTimeFormater} from 'src/utils';
import HeaderOption from './component/chatHeaderOption';
import {SCREEN_NAME} from 'src/navigation/constants';

const Chat = ({prop, route, navigation}: any) => {
  const [User, setUser] = useState<any>({});
  const [messages, setMessages] = useState<any>();

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

  const onSend = useCallback((messages: any) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    //     <SafeAreaView>

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
                  {User?.name && (
                    //@ts-ignore
                    <UserAvatar
                      size={40}
                      name={User?.name}
                      src={User?.avatar}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* @ts-ignore */}
              <Text style={styles.usernameText}>{User?.name}</Text>
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
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: '1234',
              name: 'Collins Tompson',
            }}
            renderChatEmpty={() => {
              return (
                <Text style={{fontFamily: FONTS.AVERTA_REGULAR}}>
                  No message
                </Text>
              );
            }}
            //   showUserAvatar={false}
            isTyping={true}
            // inverted={false}
            // renderBubble={() => <Bubble {...prop} />}
          />
        </View>
      </View>
      <HeaderOption ref={chatOptionRef} />
    </>
    //     </SafeAreaView>
  );
};

export default Chat;
