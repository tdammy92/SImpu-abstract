import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import styles from './style';
import {colors, FONTS, FontSize} from 'src/constants';
import {hp, wp} from 'src/utils';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useMessageListQuery, useThreadInfo} from 'src/services/query/queries';
import EmailCard from './components/Email';
import MailHeader from './components/mailHeader';
import EmptyInbox from 'src/components/common/EmptyInbox';
import MailLoader from '../../../components/Loaders/MailLoader';

const Mail = ({route}: any) => {
  const {threadId} = route.params;
  const navigation = useNavigation();

  //   items from redux store
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  //local state
  const [threadDetail, setThreadDetail] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [InputHeight, setInputHeight] = useState(hp(100));
  const [Focused, setFocused] = useState(false);
  const [EnableSend, setEnableSend] = useState(false);
  const [comment, setcomment] = useState('');

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
        // console.log('thread info', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('message info error', error);
      },
    },
  );

  //fetch messages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: messageLoading,
  } = useMessageListQuery(
    {
      threadID: threadId,
      type: 'all',
      // type: 'message',
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

        setMessages(messageList);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
      },
    },
  );

  // console.log('From param', User);
  const handleInputHeight = (e: number) => {
    if (InputHeight >= hp(150)) return;
    setInputHeight(e);
  };

  const renderItem = ({item: {item}, receiver}: any) => {
    // console.log('receiver', receiver);
    // console.log('item', item);
    return <EmailCard data={item} receiver={receiver} />;
  };

  const receiver = threadDetail?.thread?.receiver?.user?.platform_nick;

  // console.log('thread detail', JSON.stringify(receiver, null, 2));
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          {/* chat header */}

          <MailHeader threadDetail={threadDetail} loading={infoLoading} />

          <Divider />

          {messageLoading ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {Array(2)
                .fill(1)
                .map((_, i) => {
                  return <MailLoader key={`${i}`} />;
                })}
            </ScrollView>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item, i) => i.toString()}
              renderItem={item => renderItem({item, receiver})}
              contentContainerStyle={{
                paddingVertical: hp(15),
                paddingBottom: hp(60),
              }}
              contentInset={{bottom: hp(15)}}
              ListEmptyComponent={<EmptyInbox />}
            />
          )}

          <View
            style={{
              position: 'absolute',
              zIndex: 3,
              elevation: 3,
              bottom: 1,
              width: '100%',
              height: hp(75),
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: wp(20),
              // borderTopLeftRadius: 15,
              // borderTopRightRadius: 15,
            }}>
            {/* <Divider /> */}

            {/* message input container */}
            <View
              style={{
                backgroundColor: colors.bootomHeaderBg,
                borderRadius: 10,
                flexDirection: 'row',
                position: 'relative',
                height: '60%',
                // maxHeight: InputHeight,
                paddingHorizontal: hp(10),
                borderColor: colors.darkGray,
                borderWidth: Focused ? 1 : 0,
              }}>
              <TextInput
                multiline={true}
                value={comment}
                onChangeText={text => setcomment(text)}
                placeholder="Type an Internal comment"
                placeholderTextColor={colors.darkGray}
                // onContentSizeChange={e =>
                //   handleInputHeight(e.nativeEvent.contentSize.height)
                // }
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                style={{
                  width: '80%',
                  fontSize: FontSize.MediumText,
                  fontFamily: FONTS.TEXT_REGULAR,

                  color: colors.dark,
                  justifyContent: 'center',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: hp(10),
                }}>
                {/* <TouchableOpacity style={{paddingLeft: hp(5)}}>
                  <Feather name="at-sign" size={22} color={colors.dark} />
                </TouchableOpacity> */}
                <TouchableOpacity style={{}}>
                  <Ionicons name="attach" size={28} color={colors.darkGray} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} disabled={comment === ''}>
                  <Feather
                    name="navigation"
                    size={22}
                    color={
                      comment !== '' ? colors.secondaryBg : colors.darkGray
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Mail;
