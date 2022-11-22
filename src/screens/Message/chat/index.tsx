import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageURISource,
} from 'react-native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {GiftedChat, Bubble, IMessage} from 'react-native-gifted-chat';

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
import {useMessageListQuery} from 'src/services/queries';
import {Avatar} from 'src/constants/general';
import {hp} from 'src/utils';

const ChatBox = ({route, navigation}: any) => {
  // console.log('message Type', MessageType);
  const {threadDetails} = route.params;
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );
  const [User, setUser] = useState<any>(threadDetails);
  const [messageTrail, setMessageTrail] = useState<any>();
  const chatOptionRef = useRef<any>(null);

  const myUser = {id: profile?.id};

  const {
    data: messageData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useMessageListQuery(
    {
      threadID: User?.uuid,
      type: 'message',
      page: 1,
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //This snippet flattens the array
  const messageList = messageData?.pages
    ?.map((res: any) => res?.data?.messages?.map((r: any) => r))
    .flat(2);

  // console.log('List', messageList);

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

  // author: user,
  //     createdAt: Date.now(),
  //     id: uuidv4(),
  //     text: message.text,
  //     type: 'text',

  //formating messsage
  // const buildChatObject = async () => {
  //   let message = [];

  //   message = await data?.data?.messages
  //     ?.filter((chat: any) => chat?.type?.includes('message'))
  //     .map((chat: any) => {
  //       return {
  //         author: {id: chat?.author_id},
  //         id: chat?.uuid,
  //         createdAt: chat?.created_datetime,
  //         text: chat?.entity?.content.body,
  //         type: 'text',
  //       };
  //     });

  //   // console.log(message);
  //   setMessages(message);
  // };

  const formatMessage = (messageList: any) => {
    return messageList?.map((msg: any) => {
      // const cheker = profile?.id === msg?.author_id ? true : false;
      // console.log('checker', cheker, [profile?.id, msg?.author_id]);
      console.log('Msg Object', msg);

      return {
        author: {
          id: msg?.author_id,
          imageUrl: msg?.author?.image_url ?? Avatar,
          firstName: msg?.author?.name,
        },
        id: msg?.uuid,
        createdAt: msg?.created_datetime,
        text: msg?.entity?.content?.body,
        type: 'text',
        imageUrl: msg?.author?.image_url ?? Avatar,
        status: 'delivered',
      };
    });
  };

  useEffect(() => {
    const msg = formatMessage(messageList);

    setMessageTrail(msg);
  }, [navigation, messageData]);

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
    setMessageTrail([message, ...messageTrail]);
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
                      size={hp(40)}
                      style={{height: hp(40), width: hp(40)}}
                      borderRadius={hp(40 * 0.5)}
                      name={User?.name2}
                      src={User?.image}
                    />
                  )}
                </View>
              </TouchableOpacity>
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
            messages={messageTrail ?? []}
            sendButtonVisibilityMode="always"
            onAttachmentPress={handleAttachmentPress}
            // onMessagePress={handleMessagePress}
            // onPreviewDataFetched={handlePreviewDataFetched}
            onSendPress={handleSendPress}
            user={myUser}
            showUserAvatars={true}
            showUserNames={true}
            enableAnimation={true}
            theme={{
              ...defaultTheme,
              colors: {
                ...defaultTheme.colors,
                inputBackground: '#e4e4e4',
                sentMessageDocumentIcon: colors.secondaryBg,
              },

              borders: {
                inputBorderRadius: 30,
                messageBorderRadius: 20,
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
