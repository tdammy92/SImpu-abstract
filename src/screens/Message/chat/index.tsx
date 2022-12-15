import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageURISource,
} from 'react-native';

import React, {useState, useCallback, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Chat, MessageType, defaultTheme} from '@flyerhq/react-native-chat-ui';

import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import HeaderOption from './component/chatHeaderOption';
import {SCREEN_NAME} from 'src/navigation/constants';
import {StoreState} from 'src/@types/store';
import {useMessageListQuery} from 'src/services/query/queries';
import {Avatar} from 'src/constants/general';
import {hp} from 'src/utils';
import ChatHeader from './component/chatHeader';
import ChatMessage from './component/chatList/chatMessage';
import ChatInput from './component/chatList/input/chatInput';

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

  // useEffect(() => {
  //   const msg = formatMessage(messageList);

  //   setMessageTrail(msg);
  // }, [navigation, messageData]);

  // const handleSendPress = (message: MessageType.PartialText) => {
  //   const textMessage: MessageType.Text = {
  //     author: user,
  //     createdAt: Date.now(),
  //     id: '' + Date.now(),
  //     text: message.text,
  //     type: 'text',
  //   };
  //   addMessage(textMessage);
  // };

  // const addMessage = (message: MessageType.Any) => {
  //   setMessageTrail([message, ...messageTrail]);
  // };

  return (
    <>
      <View style={styles.container}>
        {/* chat header */}
        <ChatHeader
          imageUrl={User?.name2}
          name={User?.name1}
          openSheet={openSheet}
        />

        {/* chat component */}
        <View style={{flex: 1}}>
          {/* chat messages */}

          <ChatMessage data={messageList} />
          {/* chat input */}
          <ChatInput />
        </View>
      </View>
      <HeaderOption ref={chatOptionRef} />
    </>
  );
};

export default ChatBox;
