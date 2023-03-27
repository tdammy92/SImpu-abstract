import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, FC, useMemo} from 'react';
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
import {hp, messsageToast, wp} from 'src/utils';
import {useSelector, useDispatch} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {
  useMemberList,
  useMessageListQuery,
  useTeamsList,
  useThreadInfo,
} from 'src/services/query/queries';
import EmailCard from './components/Email';
import MailHeader from './components/mailHeader';
import EmptyInbox from 'src/components/common/EmptyInbox';
import MailLoader from '../../../components/Loaders/MailLoader';
import {
  MentionInput,
  parseValue,
  MentionSuggestionsProps,
  replaceMentionValues,
} from 'react-native-controlled-mentions';
import DocumentPicker, {types} from 'react-native-document-picker';
import {MemberType, TeamType, uploadFileType} from 'src/@types/inbox';
import {useMutation} from 'react-query';
import {sendComment} from 'src/services/mutations/inbox';
import {queryClient} from 'src/index';
import Reply from '../chat/component/chatInput/reply';
import {removeReply} from 'src/store/reply/replyReducer';
import {buildConversationUrl} from 'src/services/api/api-client';
import {uploadFile} from 'src/services/upload/attchments';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
import AttachmentComment from 'src/screens/Message/comment/attachment-comment';

const {width, height} = Dimensions.get('screen');

const platformBaseHeight: number = Platform.OS === 'ios' ? 0.085 : 0.1;
const suggestionBoxBottomMargin = height * platformBaseHeight;

const Mail = ({route}: any) => {
  const {threadId} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //   items from redux store
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );
  const {reply, replyIsActive} = useSelector(
    (state: StoreState) => state.reply,
  );

  //attachment state
  const [attachmentDetials, setAttachmentDetials] = useState<any>();
  const [attchemntIds, setAttchemntIds] = useState<string[]>([]);
  const [uploading, setuploading] = useState(false);

  //local state
  const [threadDetail, setThreadDetail] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [InputHeight, setInputHeight] = useState(hp(100));
  const [Focused, setFocused] = useState(false);
  const [EnableSend, setEnableSend] = useState(false);
  const [mentionInputValue, setmentionInputValue] = useState('');
  const [comment, setcomment] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<
    (MemberType & TeamType)[]
  >([]);

  //comment mutation
  const sendCommentMutation = useMutation(sendComment, {
    onSuccess: async (data, variables, context) => {
      // console.log('data from post comment', data);
      resetFileds();
      removeAttachment();
      await queryClient.invalidateQueries([
        'conversations',
        threadDetail?.thread?.uuid,
      ]);
    },
    onError(error, variables, context) {
      //@ts-ignore
      messsageToast({message: error, type: 'danger'});
    },
  });

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
  //fetch memebrs
  const {data: membersData} = useMemberList(
    {
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //fetch Teams
  const {data: teamsData} = useTeamsList(
    {
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  // console.log('From param', User);
  const handleInputHeight = (e: number) => {
    if (InputHeight >= hp(150)) return;
    setInputHeight(e);
  };

  const renderItem = ({item: {item, index}, receiver}: any) => {
    // console.log('receiver', receiver);
    // console.log('item index', index);
    return <EmailCard data={item} receiver={receiver} index={index} />;
  };

  const receiver = threadDetail?.thread?.receiver?.user?.platform_nick;

  //filter out current user from member array
  const otherOrgMembers = membersData?.data?.members?.filter(
    (member: MemberType) => member.id !== profile?.id,
  );

  const members = useMemo((): (MemberType & TeamType)[] => {
    const mentionSuggestions = [
      ...(otherOrgMembers ?? [])?.map((item: MemberType) => ({
        id: item.id,
        type: 'user',
        avatar: item.image,
        name: `${item.first_name} ${item.last_name}`,
      })),
      ...(teamsData?.data?.teams ?? [])?.map((item: TeamType) => ({
        id: item.id,
        type: 'team',
        name: item.name,
      })),
    ];
    return mentionSuggestions;
  }, [membersData, teamsData]);

  //membersugestion component
  const renderSuggestions: FC<MentionSuggestionsProps> = ({
    keyword,
    onSuggestionPress,
  }) => {
    if (keyword == null) {
      return null;
    }

    return (
      <>
        {members?.length !== 0 && (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{flexGrow: 1}}
            style={{
              bottom: suggestionBoxBottomMargin,
              flex: 1,
              backgroundColor: colors.light,
              width: width * 0.77,
              maxHeight: hp(250),
              position: 'absolute',
              borderColor: colors.darkGray,
              borderWidth: 0.7,
              borderRadius: hp(15),
              // zIndex: 100,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.23,
              // shadowRadius: 2.62,

              // elevation: 4,
            }}>
            {members
              .filter((member: any) =>
                member?.name
                  .toLocaleLowerCase()
                  .includes(keyword.toLocaleLowerCase()),
              )
              .map((item: any, i: number) => (
                <Pressable
                  key={`${i}`}
                  onPress={() => onSuggestionPress(item)}
                  style={{
                    padding: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#e4e4e4',
                    borderBottomWidth: 1,
                  }}>
                  <UserAvatar
                    name={item?.name}
                    src={item?.imageUrl}
                    size={hp(30)}
                    style={{height: hp(30), width: hp(30)}}
                    borderRadius={hp(30 * 0.5)}
                  />
                  <View>
                    <Text style={{paddingLeft: hp(10), color: colors.dark}}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: hp(10),
                        color: colors.dark,
                        textTransform: 'capitalize',
                      }}>
                      {item?.type}
                    </Text>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        )}
      </>
    );
  };

  //effect to fire when a key is pressded in the comment
  useEffect(() => {
    //set the current input value to comment
    setcomment(replaceMentionValues(mentionInputValue, ({name}) => `@${name}`));

    //use the parseValue function to extract data from the selected mention
    const extractedValue = parseValue(mentionInputValue, [
      {
        isInsertSpaceAfterMention: true,
        trigger: '@', // Should be a single character like '@' or '#'
        renderSuggestions,
        textStyle: {color: colors.secondaryBg}, // The mention style in the input
        // textStyle: {fontWeight: 'bold', color: colors.secondaryBg}, // The mention style in the input
      },
    ]);

    //filter the data to select only Id
    const selectedMention = extractedValue?.parts
      ?.map(ite => ite?.data?.id)
      .filter(ite => ite !== undefined);

    //use id to filter and get the full participant object
    const participant = members?.filter(value =>
      selectedMention?.find(val => value?.id === val),
    );

    setSelectedParticipant(participant);

    // console.log('selected participants', JSON.stringify(participant, null, 2));

    // return () => {};
  }, [mentionInputValue]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(removeReply());
    });

    // markAsRead();

    return unsubscribe;
  }, [navigation]);

  //send comment function
  const send = async () => {
    const payload = {
      body: comment.trim(),
      participants: selectedParticipant,
      Auth: token,
      attachment_ids: attchemntIds,
      organisationId: organisation?.id,
      threadId: threadDetail?.thread?.uuid,
    };
    await sendCommentMutation.mutateAsync(payload);
  };

  const onProgress = (percentage: number) => {
    console.log('percatge of the upload', percentage);
  };
  //send file handler
  const attachFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [
          types.images,
          types.audio,
          types.video,
          types.doc,
          types.docx,
          types.pdf,
          types.xls,
          types.ppt,
        ],
      });

      // console.log(`file from ${Platform.OS}`, JSON.stringify(res, null, 2));

      const file = {
        uri: res[0]?.uri,
        type: res[0]?.type,
        name: res[0]?.name,
        size: res[0]?.size,
      };

      setAttachmentDetials(file);
      setuploading(true);

      const data = {type: 'message'};
      const header = {token, organisationId: organisation?.id};

      const url = buildConversationUrl(
        `upload/${threadDetail?.thread?.receiver_id}`,
      );
      try {
        const attachmentIds = await uploadFile({
          url,
          file,
          fileName: 'files',
          data,
          header,
          onProgress,
        });

        const attach = await attachmentIds?.upload_ids;

        setAttchemntIds(attach);

        setuploading(false);
      } catch (e) {
        console.log('error from upload', e);
        setuploading(false);
      }
    } catch (error) {
      // console.log('file picker catch error', error);
    }
  };

  function resetFileds(): void {
    setcomment('');
    setSelectedParticipant([]);
    setAttchemntIds([]);
    setmentionInputValue('');
  }
  const removeAttachment = () => {
    setAttchemntIds([]);
    setAttachmentDetials(null);
    setuploading(false);
  };

  // console.log(
  //   'thread mentionInputValue',
  //   JSON.stringify(mentionInputValue, null, 2),
  // );
  // console.log('thread comment', JSON.stringify(threadDetail, null, 2));
  // console.log('attach ids', JSON.stringify(attchemntIds, null, 2));
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
              bottom: hp(0),
              width: '100%',
              // height: hp(75),
              height: 'auto',
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: wp(20),
            }}>
            {/* <Divider /> */}

            {/* reply component */}
            {replyIsActive && <Reply />}

            {/* attachemnt component */}
            {attachmentDetials && (
              <AttachmentComment
                removeAttachment={removeAttachment}
                attachmentDetials={attachmentDetials}
                uploading={uploading}
              />
            )}

            {/* message input container */}
            <View
              style={{
                // backgroundColor: 'red',
                backgroundColor: colors.bootomHeaderBg,
                borderRadius: 10,
                flexDirection: 'row',
                position: 'relative',
                // height: '60%',
                maxHeight: hp(100),
                minHeight: hp(60),
                paddingHorizontal: hp(10),
                borderColor: colors.darkGray,
                borderWidth: Focused ? 1 : 0,
                marginBottom: hp(5),
                marginTop: hp(5),
              }}>
              <MentionInput
                multiline
                placeholder="Type an Internal comment"
                placeholderTextColor={colors.darkGray}
                // autoFocus={true}

                style={{
                  width: '100%',
                  maxHeight: hp(150),
                  minHeight: hp(50),
                  fontSize: FontSize.MediumText,
                  fontFamily: FONTS.TEXT_REGULAR,
                  color: colors.dark,
                  textAlignVertical: 'top',
                  // justifyContent: 'center',
                  // backgroundColor: 'yellow',
                }}
                value={mentionInputValue}
                onChange={setmentionInputValue}
                containerStyle={{
                  width: '85%',
                }}
                partTypes={[
                  {
                    isInsertSpaceAfterMention: true,
                    trigger: '@', // Should be a single character like '@' or '#'
                    renderSuggestions,
                    textStyle: {color: colors.secondaryBg}, // The mention style in the input
                  },
                ]}
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
                <TouchableOpacity style={{}} onPress={attachFile}>
                  <Ionicons name="attach" size={28} color={colors.darkGray} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={send}
                  style={{}}
                  disabled={comment === ''}>
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

{
  /* <TextInput
                multiline={true}
                value={comment}
                onChangeText={text => setcomment(text)}
                placeholder="Type an Internal comment"
                placeholderTextColor={colors.darkGray}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                style={{
                  width: '80%',
                  fontSize: FontSize.MediumText,
                  fontFamily: FONTS.TEXT_REGULAR,

                  color: colors.dark,
                  justifyContent: 'center',
                }}
              /> */
}
