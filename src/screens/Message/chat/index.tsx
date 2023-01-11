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
  const [threadDetail, setUser] = useState<any>(threadDetails);
  const [messageTrail, setMessageTrail] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);

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
      threadID: threadDetail?.uuid,
      type: 'message',
      page: 1,
      Auth: token,
      organisationId: organisation?.id,
    },

    {
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const messageList = data?.pages
          ?.map((res: any) => res?.data?.messages?.map((r: any) => r))
          .flat(2);

        setMessageTrail(messageList);

        //extract members from message thread excluding the sender
        const member = messageList
          .map((item: any) => {
            return {
              authorId: item?.author_id,
              name:
                item?.author?.name ||
                item?.author?.platform_name ||
                item?.author?.platform_nick,
              imageUrl: item?.author?.image_url,
            };
          })
          .filter((item: any) => profile?.id !== item?.authorId);

        //filtering mutiple entries of the member
        const members = [
          ...new Set(member.map((item: any) => JSON.stringify(item))),
        ].map((item2: any) => JSON.parse(item2));

        setMembers(members.length > 2 ? members : []);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
        // messsageToast({message: 'Profile updated', type: 'success'});
        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

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
  // console.log(JSON.stringify(threadDetail, null, 2));
  return (
    <>
      <View style={styles.container}>
        {/* chat header */}
        <ChatHeader
          imageUrl={threadDetail?.name2}
          name={threadDetail?.name1}
          openSheet={openSheet}
        />

        {/* chat component */}
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          {/* chat messages */}

          <ChatMessage data={messageTrail} />
          {/* chat input */}
          <ChatInput
            credentitalId={threadDetail?.receiver_id}
            threadId={threadDetail?.uuid}
            name={threadDetail?.name1 ?? threadDetail?.name2}
            setMessageTrail={setMessageTrail}
            members={members}
          />
        </View>
      </View>
      <HeaderOption ref={chatOptionRef} />
    </>
  );
};

export default ChatBox;
