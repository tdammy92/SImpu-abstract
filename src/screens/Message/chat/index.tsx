import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageURISource,
  NativeScrollEvent,
} from 'react-native';

import React, {useState, useCallback, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {Chat, MessageType, defaultTheme} from '@flyerhq/react-native-chat-ui';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import HeaderOption from './component/chatHeaderOption';
import {SCREEN_NAME} from 'src/navigation/constants';
import {StoreState} from 'src/@types/store';
import {useMessageListQuery, useThreadInfo} from 'src/services/query/queries';
import {Avatar} from 'src/constants/general';
import {hp} from 'src/utils';
import ChatHeader from './component/chatHeader';
import ChatMessage from './component/chatList/chatMessage';
import ChatInput from './component/chatInput/chatInput';
import {colors} from 'src/constants';
import {FlatList} from 'react-native-gesture-handler';
import {removeReply} from 'src/store/reply/replyReducer';
import {useNavigation} from '@react-navigation/native';

const scrollLimit = 70;

const ChatBox = ({route}: any) => {
  // console.log('message Type', MessageType);

  const navigation = useNavigation();
  const {threadId} = route.params;
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );
  const [threadDetail, setThreadDetail] = useState<any>();
  const [messageTrail, setMessageTrail] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);
  const [showScrollTobottom, setshowScrollTobottom] = useState(false);
  // const [reply, setReply] = useState<any>();
  // const [isMyUser, setIsMyUser] = useState(false);

  const dispatch = useDispatch();
  const chatOptionRef = useRef<any>(null);
  const chatListRef = useRef<FlatList>(null);

  const myUser = {id: profile?.id};

  //fetch message info
  const {data: messageInfo, isLoading: infoLoading} = useThreadInfo(
    {
      threadID: threadId,
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        setThreadDetail(data?.data);
      },
      onError(error: any, variables: any, context: any) {
        console.log('message info error', error);
      },
    },
  );

  //fetch all messages
  const {
    data: messageData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useMessageListQuery(
    {
      threadID: threadId,
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

        // console.log('2222', JSON.stringify(messageList, null, 2));

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

  const scrollToChatBottom = () => {
    chatListRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });
  };

  const Onscroll = (event: any) => {
    const offSetY = event?.nativeEvent?.contentOffset?.y;

    if (offSetY > scrollLimit) {
      setshowScrollTobottom(true);
    } else {
      setshowScrollTobottom(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(removeReply());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        {/* chat header */}
        {!infoLoading && threadDetail?.thread && (
          <ChatHeader threadDetail={threadDetail} openSheet={openSheet} />
        )}

        {/* chat component */}
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          {/* chat messages */}

          <ChatMessage
            data={messageTrail}
            chatListRef={chatListRef}
            Onscroll={Onscroll}
            fetchNextPage={fetchNextPage}
            // handleSwipeToReply={handleSwipeToReply}
          />
          {/* chat input */}
          <ChatInput
            credentitalId={threadDetail?.receiver_id}
            threadId={threadDetail?.uuid}
            name={threadDetail?.name1 ?? threadDetail?.name2}
            setMessageTrail={setMessageTrail}
            members={members}
            // reply={reply}
            // closeReply={closeReply}
          />
        </View>
        {showScrollTobottom && (
          <TouchableOpacity onPress={scrollToChatBottom}>
            <Animated.View
              style={styles.floatingDownBtn}
              entering={ZoomIn.duration(400)}
              exiting={ZoomOut.duration(400)}>
              <Feather
                name="chevrons-down"
                size={hp(20)}
                color={colors.darkGray}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
      <HeaderOption ref={chatOptionRef} />
    </>
  );
};

export default ChatBox;
