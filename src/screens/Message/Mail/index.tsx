import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
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
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useMessageListQuery, useThreadInfo} from 'src/services/query/queries';
import EmailCard from './components/Email';
import MailHeader from './components/mailHeader';

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
  const [messages, setMessages] = useState<any>();
  const [InputHeight, setInputHeight] = useState(hp(100));
  const [Focused, setFocused] = useState(false);
  const [EnableSend, setEnableSend] = useState(false);

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

  const {
    data: messageData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
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
        const messageList = messageData?.pages
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

  const renderItem = ({item}: any) => {
    // console.log(item);
    return <EmailCard data={item} />;
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          {/* chat header */}
          {!infoLoading && threadDetail?.thread && (
            <MailHeader threadDetail={threadDetail} />
          )}
          <Divider />

          <FlatList
            data={messages}
            keyExtractor={(item, i) => i.toString()}
            renderItem={renderItem}
            // style={{backgroundColor: 'yellow'}}
            contentContainerStyle={{
              paddingVertical: hp(15),
              paddingBottom: hp(60),
            }}
            contentInset={{bottom: hp(15)}}
          />

          <View
            style={{
              position: 'absolute',
              zIndex: 3,
              elevation: 3,
              bottom: 1,
              width: '100%',
              height: hp(75),
              backgroundColor: colors.bootomHeaderBg,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: wp(20),
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            {/* <Divider /> */}

            {/* message input container */}
            <View
              style={{
                backgroundColor: colors.light,
                borderRadius: 10,
                flexDirection: 'row',
                position: 'relative',
                height: '60%',
                // maxHeight: InputHeight,
                paddingHorizontal: hp(10),
                borderColor: colors.secondaryBg,
                borderWidth: Focused ? 1 : 0,
              }}>
              <TextInput
                multiline={true}
                placeholder="Type an Internal comment"
                placeholderTextColor={colors.dark}
                onContentSizeChange={e =>
                  handleInputHeight(e.nativeEvent.contentSize.height)
                }
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                style={{
                  width: '80%',
                  fontSize: 16,
                  fontFamily: FONTS.TEXT_REGULAR,
                  // height: InputHeight,
                  color: colors.dark,
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: hp(10),
                }}>
                <TouchableOpacity style={{paddingLeft: hp(5)}}>
                  <Feather name="at-sign" size={22} color={colors.dark} />
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                  <Ionicons name="attach" size={28} color={colors.dark} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} disabled={EnableSend}>
                  <Feather
                    name="navigation"
                    size={22}
                    color={EnableSend ? colors.secondaryBg : colors.dark}
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
