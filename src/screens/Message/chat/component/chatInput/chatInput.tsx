import React, {useState, useEffect, useRef, memo, FC} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  MentionInput,
  replaceMentionValues,
  MentionSuggestionsProps,
} from 'react-native-controlled-mentions';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMutation, useQueryClient} from 'react-query';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colors} from 'src/constants';
import {hp, messsageToast, wp} from 'src/utils';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useMenberList} from 'src/services/query/queries';
import {
  replyMessageSocials,
  sendFiles,
  sendMessageSocials,
} from 'src/services/mutations/inbox';
import {previousDay} from 'date-fns';
import {appendFile} from 'react-native-fs';
import {toFormData, uploadFile} from 'src/services/upload/fileUpload';
import {buildConversationUrl} from 'src/services/api/api-client';
import BottomSheet from 'src/components/common/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {removeReply} from 'src/store/reply/replyReducer';
import Reply from './reply';
// import EmojiPicker from "./emojis/EmojiPicker";

// import { useKeyboard } from "@react-native-community/hooks";

const {width, height} = Dimensions.get('screen');

const suggestionBoxBottomMargin = height * 0.065;

const ChatInput = ({
  isLeft,
  username,
  name,
  credentitalId,
  threadId,
  members,
  setMessageTrail,
}: any) => {
  const {token, profile} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {reply, replyIsActive} = useSelector(
    (state: StoreState) => state.reply,
  );

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');

  //send File Mutation
  const sendFileMutation = useMutation(sendFiles, {
    onSuccess(data, variables, context) {
      console.log('data from file upload', data);
      setMessage('');
      queryClient.invalidateQueries('conversations');
    },
    onError(error, variables, context) {
      console.log('post message error', error);

      //@ts-ignore
      // messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });

  //send message mutation
  const sendMessageMutation = useMutation(sendMessageSocials, {
    onSuccess(data, variables, context) {
      //inavlid query conversations
      setMessage('');
      queryClient.invalidateQueries('conversations');
    },
    onError(error, variables, context) {
      console.log('post message error', error);

      queryClient.invalidateQueries('conversations');
      //@ts-ignore
      messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });
  //reply message mutation
  const replyMessageMutation = useMutation(replyMessageSocials, {
    onSuccess(data, variables, context) {
      //inavlid query conversations
      setMessage('');
      queryClient.invalidateQueries('conversations');
      // dispatch(removeReply());
    },
    onError(error, variables, context) {
      console.log('post message error', error);

      queryClient.invalidateQueries('conversations');
      //@ts-ignore
      messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const height = useSharedValue(70);

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
            style={{
              position: 'absolute',
              bottom: suggestionBoxBottomMargin,
              backgroundColor: colors.bootomHeaderBg,
              width: width * 0.77,

              borderColor: colors.darkGray,
              borderWidth: 0.7,
              borderRadius: hp(15),
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

                  <Text style={{paddingLeft: hp(10), color: colors.dark}}>
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        )}
      </>
    );
  };

  //send message handler
  const sendMessage = async () => {
    const data = {
      message: {
        type: 'message',
        body: message,
        attachment_ids: [],
      },
      params: {
        threadId,
        messageId: replyIsActive ? reply?.uuid : '',
        Auth: token,
        organisationId: organisation?.id,
      },
    };

    const tempMessage = {
      type: 'message/normal',
      author: {
        meta: {
          account_id: profile?.id,
          is_renewed: true,
        },
        image_url: '',
        platform_id: '',
        channel_name: '',
        name: `${profile?.first_name} ${profile?.last_name}`,
        id: 653085,
        platform_name: `${profile?.first_name} ${profile?.last_name}`,
        platform_nick: null,
        uuid: '',
        channel_id: '',
        is_valid: false,
      },
      entity: {
        content: {
          body: message,
        },
        id: '',
        pid: '',
        uuid: '',
        meta: {
          type: 'normal',
        },
        status: 'pending',
        quoted_id: null,
        author_id: profile?.id,
        attachments: [
          {
            id: '',
            data: {
              url: '',
              type: 'upload',
              width: 595,

              format: 'pdf',
              height: 841,
              api_key: '',
              version: 1673302788,
              asset_id: '',
              signature: '',
              version_id: '',
              placeholder: false,
              resource_type: 'image',
            },
            from: 'cloudinary',
            size: 538640,
            type: 'file',
            mimetype: 'application/pdf',
            created_datetime: new Date(),
          },
        ],
        mention_ids: null,
        recipient_ids: null,
      },

      id: 8054444,
      uuid: '44ec06df3d921e77d72d3e4c99988024',
      account_id: null,
      show_in_thread: null,
      created_datetime: new Date(),
      updated_datetime: null,
      author_id: profile?.id,
      author_type: '',
      content_id: '-m_g-',
      content_type: 'comm',
    };
    setMessageTrail((prev: any) => [tempMessage, ...prev]);

    if (replyIsActive) {
      console.log('reply action');
      await replyMessageMutation.mutateAsync(data);
      dispatch(removeReply());
    } else {
      console.log('send action');
      await sendMessageMutation.mutateAsync(data);
    }
  };

  //send file handler
  const sendFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [
          types.audio,
          types.video,
          types.doc,
          types.docx,
          types.pdf,
          types.xls,
          types.ppt,
          types.zip,
        ],
      });

      const file = {
        uri: res[0]?.uri,
        type: res[0]?.type,
        name: res[0]?.name,
      };

      const data = {type: 'message'};
      const header = {token, organisationId: organisation?.id};
      const url = buildConversationUrl(`upload/${credentitalId}`);

      Alert.alert('', `Send ${file?.name}  to ${name}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: async () => {
            // setMessageTrail((prev: any) => [tempMessage, ...prev]);
            const formData = await uploadFile({url, file, data, header});
            const mutatePayload = {
              message: {
                body: message,
                attachment_ids: formData,
              },
              params: {
                threadId,
                Auth: token,
                organisationId: organisation?.id,
              },
            };
            await sendMessageMutation.mutateAsync(mutatePayload);
          },
        },
      ]);
    } catch (error) {
      // console.log('file picker catch error', error);
    }
  };

  const bottomSheetRef = useRef<any>(null);

  const openSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  const closeSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  //open camera code
  const Snap = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: false,
      mediaType: 'photo',
    })
      .then(image => {
        if (image) {
          // updateImage(image);
        }
        closeSheet();
      })
      .catch(err => {
        console.log(err);
        closeSheet();
      });
  };

  //open gallery code
  const Gallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: false,
      mediaType: 'photo',
    })
      .then(image => {
        if (image) {
          // updateImage(image);

          closeSheet();
        }
      })
      .catch(err => {
        console.log(err);
        closeSheet();
      });
  };

  // useEffect(() => {
  // 	if (showEmojiPicker) {
  // 		height.value = withTiming(400);
  // 	} else {
  // 		height.value = reply ? withSpring(130) : withSpring(70);
  // 	}
  // }, [showEmojiPicker]);

  //   useEffect(() => {
  //     if (reply) {
  //       height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
  //     } else {
  //       height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
  //     }
  //   }, [reply]);

  const getTempMessage = (message: any, isReply: any) => {
    const temp = {
      type: 'message/normal',
      author: {
        meta: {
          account_id: profile?.id,
          is_renewed: true,
        },
        image_url: '',
        platform_id: '',
        channel_name: '',
        name: `${profile?.first_name} ${profile?.last_name}`,
        id: 0,
        platform_name: `${profile?.first_name} ${profile?.last_name}`,
        platform_nick: null,
        uuid: '',
        channel_id: '',
        is_valid: false,
      },
      entity: {
        content: null,
        id: '',
        pid: '',
        uuid: '',
        meta: {
          type: 'normal',
        },
        status: 'pending',
        quoted_id: null,
        author_id: profile?.id,
        attachments: [
          {
            id: '',
            data: {
              url: '',
              type: 'upload',
              width: 0,

              format: 'pdf',
              height: 0,
              api_key: '',
              version: 0,
              asset_id: '',
              signature: '',
              version_id: '',
              placeholder: false,
              resource_type: 'image',
            },
            from: 'cloudinary',
            size: 538640,
            type: 'file',
            mimetype: 'application/pdf',
            created_datetime: new Date(),
          },
        ],
        mention_ids: null,
        recipient_ids: null,
      },

      id: 0,
      uuid: '44ec06df3d921e77d72d3e4c99988024',
      account_id: null,
      show_in_thread: null,
      created_datetime: new Date(),
      updated_datetime: null,
      author_id: profile?.id,
      author_type: '',
      content_id: '-m_g-',
      content_type: 'comm',
    };

    return temp;
  };

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    // <KeyboardAwareScrollView>
    <Animated.View style={[styles.container]}>
      {replyIsActive && <Reply />}
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          {/* <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker(value => !value)}>
            <Icon
              name={showEmojiPicker ? 'close' : 'emoticon-outline'}
              size={23}
              color={theme.colors.description}
            />
          </TouchableOpacity> */}
          {/* <TextInput
              multiline
              placeholder={'Type something...'}
              placeholderTextColor={colors.light}
              style={styles.input}
              value={message}
              onChangeText={text => setMessage(text)}
            /> */}
          <MentionInput
            multiline
            placeholder={'Type something...'}
            placeholderTextColor={colors.light}
            // autoFocus={true}
            style={{
              backgroundColor: 'transparent',
              color: colors.light,
              flex: 3,
              fontSize: 15,
              // height: hp(40),
            }}
            value={message}
            onChange={text =>
              setMessage(replaceMentionValues(text, ({name}) => `@${name}`))
            }
            containerStyle={styles.input}
            partTypes={[
              {
                isInsertSpaceAfterMention: true,
                trigger: '@', // Should be a single character like '@' or '#'
                renderSuggestions,
                textStyle: {fontWeight: 'bold', color: colors.light}, // The mention style in the input
              },
            ]}
          />
          <TouchableOpacity
            style={styles.rightIconButtonStyle}
            onPress={sendFile}>
            <Entypo name="attachment" size={23} color={colors.light} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightIconButtonStyle}
            onPress={openSheet}>
            <AntDesign name="camera" size={23} color={colors.light} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={message === '' ? true : false}>
          <Ionicons name={'send'} size={20} color={colors.light} />
        </TouchableOpacity>
      </View>
      {/* <EmojiPicker /> */}
      {/* <BottomSheet
        Gallery={Gallery}
        Snap={Snap}
        ref={bottomSheetRef}
        title="Media option"
      /> */}
    </Animated.View>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    bottom: hp(-5),
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: wp(5),
    marginHorizontal: wp(10),
    marginBottom: Platform.OS === 'ios' ? hp(15) : hp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',

    // paddingVertical: hp(10),
    paddingTop: hp(2),
    paddingBottom: hp(5),
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
    borderColor: colors.darkGray,
    flex: 3,
    marginRight: wp(10),
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    color: colors.light,
    flex: 3,
    fontSize: 15,
    height: hp(40),
    maxheight: hp(60),
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.light,
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: colors.dark,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  // recordingTime: {
  // 	color: theme.colors.description,
  // 	fontSize: 20,
  // 	marginLeft: 5,
  // },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: wp(60),
    alignItems: 'center',
    borderTopLeftRadius: hp(30),
    borderTopRightRadius: hp(30),
    height: hp(130),
    paddingTop: hp(20),
  },
  sendButton: {
    backgroundColor: colors.secondaryBg,
    borderRadius: hp(50 * 0.5),
    height: hp(50),
    width: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
