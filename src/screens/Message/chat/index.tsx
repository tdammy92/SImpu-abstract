import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageURISource,
  NativeScrollEvent,
  KeyboardAvoidingView,
} from 'react-native';

import React, {useState, useCallback, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import HeaderOption from '../threadDetails/component/messageHeaderOption';
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
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useMutation} from 'react-query';
import {markThreadAsRead} from 'src/services/mutations/inbox';
import ChatLoader from 'src/components/Loaders/chatLoader';

const scrollLimit = 80;

const ChatBox = ({route}: any) => {
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

  // console.log('organisation ID', organisation.id);

  const dispatch = useDispatch();
  // const chatOptionRef = useRef<any>(null);
  const chatListRef = useRef<FlatList>(null);

  const myUser = {id: profile?.id};

  //Mark conversation as read
  const markAsReadMutation = useMutation(
    () =>
      markThreadAsRead({
        Auth: token,
        organisationId: organisation?.id,
        threadId,
      }),
    {
      onSuccess(data, variables, context) {
        // console.log('was sucessfull marked as read');
      },
      onError(error, variables, context) {
        // console.log('error from mark as reead', error);
      },
    },
  );

  const markAsRead = async () => {
    markAsReadMutation.mutate();
  };

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

  // console.log('thread from chat', threadId);

  //fetch all messages
  const {
    data: messageData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: messageLoading,
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

    markAsRead();

    return unsubscribe;
  }, [navigation]);

  const isResolved =
    threadDetail?.thread?.state === 'resolved' ||
    threadDetail?.thread?.state === 'closed';

  const isGroup = threadDetail?.thread?.type === 'group' ? true : false;

  // console.log(
  //   'thread details++++++++++++++++++++++',
  //   JSON.stringify(threadDetail?.thread, null, 2),
  //   '--------------------------------',
  // );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        {/* chat header */}

        <ChatHeader threadDetail={threadDetail} infoLoading={infoLoading} />

        {/* chat component */}
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          {/* chat messages */}

          {messageLoading ? (
            <ChatLoader />
          ) : (
            <ChatMessage
              data={messageTrail}
              chatListRef={chatListRef}
              Onscroll={Onscroll}
              fetchNextPage={fetchNextPage}
              isGroup={isGroup}
            />
          )}
          {/* chat input */}
          {!isResolved && (
            <ChatInput
              scrollToChatBottom={scrollToChatBottom}
              credentialId={threadDetail?.thread?.receiver_id}
              threadId={threadDetail?.thread?.uuid}
              name={
                threadDetail?.thread?.sender?.platform_name ??
                threadDetail?.thread?.sender?.platform_nick
              }
              setMessageTrail={setMessageTrail}
              members={members}
            />
          )}
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
    </KeyboardAvoidingView>
  );
};

export default ChatBox;
