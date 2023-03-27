import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useMemo, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withDelay,
  interpolate,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import {useNavigation, StackActions} from '@react-navigation/native';
import {hp, messsageToast, wp} from 'src/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS, FontSize, colors} from 'src/constants';
import {Divider, IndexPath, Select, SelectItem} from '@ui-kitten/components';
//@ts-ignore
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useSearchCustomers} from 'src/services/query/queries';
import useDebounce from 'src/Hooks/useDebounce';
import {removeEmoji} from 'src/utils/string-utils/string';
import {customerType} from 'src/@types/inbox';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useMutation} from 'react-query';
import {startConversation} from 'src/services/mutations/inbox';
import {SCREEN_NAME} from 'src/navigation/constants';
import {buildConversationUrl} from 'src/services/api/api-client';
import {uploadFile} from 'src/services/upload/attchments';
import Attachament from './component/attachament';

const {width, height} = Dimensions.get('screen');

const ComposeSocial = ({route}: any) => {
  const {channel, connectedChannels} = route.params;
  const navigation = useNavigation();

  const [SelectedChannel, setSelectedChannel] = useState<any>(() => channel);

  const channels = useMemo(() => {
    return connectedChannels?.filter(
      (item: any) => item?.channel_id === SelectedChannel?.channel_id,
    );
  }, [channel, connectedChannels]);

  // console.log(JSON.stringify(channel, null, 2));

  const indexOfSelectedChannel = useMemo(
    () =>
      channels.findIndex(
        (val: any) => val?.platform_nick === channel?.platform_nick,
      ),
    [channel, connectedChannels],
  );

  const contactInputref = useRef(null);

  const {token, profile} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const [message, setMessage] = useState('');

  // channel state
  const [ShowChannels, setShowChannels] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(indexOfSelectedChannel),
  );

  //contact states
  const [SelectedContact, setSelectedContact] = useState<string>('');

  const [value, setValue] = useState('');
  const [CustomerList, setCustomerList] = useState<customerType[]>([]);

  //attachment state
  const [attachmentDetials, setAttachmentDetials] = useState<any>(null);
  const [attachemntId, setAttachemntId] = useState<any>([]);
  const [uploading, setuploading] = useState(false);

  const debounceValue = useDebounce(value, 400);

  //send message mutation
  const StartConversationMutation = useMutation(startConversation, {
    onSuccess(data, variables, context) {
      if (data?.thread_id) {
        navigation.dispatch(
          StackActions.replace(SCREEN_NAME.chat, {
            threadId: data?.thread_id,
          }),
        );
      }
    },
    onError(error, variables, context) {
      console.log('error from compose message', error);
      messsageToast({message: `${error}`, type: 'danger'});
    },
  });

  //search customer query
  const SearchCustomerQuery = useSearchCustomers(
    {
      searchQuery: debounceValue,
      page: 1,
      channelId: channels[selectedIndex?.row]?.channel_id,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!debounceValue,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchCustomerResults = data?.pages
          ?.map((res: any) => res?.customers?.map((r: any) => r))
          .flat(2);
        setCustomerList(searchCustomerResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);

        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  const rotateProgrss = useSharedValue(0);

  const sendAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${interpolate(rotateProgrss.value, [0, 1], [0, -90])}deg`},
      ],
    };
  });

  // console.log('slected channel', JSON.stringify(SelectedChannel, null, 2));
  // console.log('all channels', JSON.stringify(connectedChannels, null, 2));

  //send message handler
  const sendMessage = async () => {
    if (!SelectedContact) {
      messsageToast({message: `Select a recipent`, type: 'warning'});
      return;
    }

    const payload = {
      message: {
        type: 'message',
        body: message,
        attachment_ids: attachemntId,
        user_nick: SelectedContact,
      },

      credentialId: channels[selectedIndex?.row]?.uuid,
      Auth: token,
      organisationId: organisation?.id,
    };

    // console.log('message payload', JSON.stringify(payload, null, 2));

    try {
      setMessage('');
      await StartConversationMutation.mutateAsync(payload);
    } catch (e) {
      console.log();
    }
  };

  // const handleSelectedChannel = (item: any) => {
  //   setSelectedChannel(item);
  //   setShowChannels(false);
  // };

  const handleSelectedContact = (item: string) => {
    setSelectedContact(item);
    setCustomerList([]);
    setValue('');
  };

  const removeAttachment = () => {
    setAttachemntId([]);
    setAttachmentDetials(null);
    setuploading(false);
  };

  const removeSelectedContact = () => {
    setSelectedContact('');
  };

  const addInput = () => {
    setSelectedContact(value);
    setValue('');
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
        `upload/${channels[selectedIndex?.row]?.uuid}`,
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

        setAttachemntId(attach);

        setuploading(false);
      } catch (e) {
        console.log('error from upload', e);
        setuploading(false);
      }
    } catch (error) {
      // console.log('file picker catch error', error);
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      rotateProgrss.value = withDelay(200, withSpring(1));
    } else {
      rotateProgrss.value = withDelay(200, withSpring(0));
    }
  }, [message]);
  // console.log('new height', height);
  // console.log('selected Item', SelectedChannel);
  // console.log('selected Contact', JSON.stringify(SelectedContact, null, 2));
  // console.log('selected Item', JSON.stringify(channel, null, 2));
  // console.log('attachment id ', JSON.stringify(attachemntId, null, 2));
  // console.log('from upload state', attachemntId);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors?.light}}>
        <View style={[styles.Container, {zIndex: 10}]}>
          {/* header section */}
          <View style={[styles.header, {zIndex: 20}]}>
            {/* close/back icon */}
            <TouchableOpacity
              style={{marginHorizontal: wp(15)}}
              onPress={() => navigation.goBack()}>
              <AntDesign
                name="close"
                color={colors.secondaryBg}
                size={hp(24)}
              />
            </TouchableOpacity>
            {/* from/to container  */}
            <View
              style={{
                marginTop: hp(10),
                justifyContent: 'center',
                position: 'relative',
                zIndex: 30,
              }}>
              <View style={[styles.headerSecion, {zIndex: 40}]}>
                <Text style={styles.labelText}>From:</Text>

                <Select
                  style={{
                    width: '85%',
                    marginLeft: wp(4),
                    // borderWidth: 0,
                    // borderColor: 'transparent',
                    // backgroundColor: 'red',
                  }}
                  placeholder={'Default'}
                  selectedIndex={selectedIndex}
                  value={() => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <ChannelIcon
                        name={channels[selectedIndex?.row]?.channel_name}
                        height={23}
                        width={23}
                      />
                      <Text
                        style={{
                          marginLeft: wp(3),
                          fontSize: FontSize.MediumText,
                          fontFamily: FONTS.TEXT_REGULAR,
                          color: colors.dark,
                        }}>
                        {channels[selectedIndex?.row]?.platform_nick}
                      </Text>
                    </View>
                  )}
                  //@ts-ignore
                  onSelect={index => setSelectedIndex(index)}>
                  {channels?.map((item: any, i: number) => (
                    <SelectItem
                      key={`${i}`}
                      accessoryRight={() => (
                        <>
                          {i === selectedIndex?.row && (
                            <AntDesign
                              name={'check'}
                              color={colors.darkGray}
                              size={hp(16)}
                            />
                          )}
                        </>
                      )}
                      title={evaProps => (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <ChannelIcon
                            name={item?.channel_name}
                            height={25}
                            width={25}
                          />
                          <Text
                            style={{
                              marginLeft: wp(3),
                              fontSize: FontSize.MediumText,
                              fontFamily: FONTS.TEXT_REGULAR,
                              color: colors.dark,
                            }}>
                            {item?.platform_nick}
                          </Text>
                        </View>
                      )}
                    />
                  ))}
                </Select>

                {/* <TouchableOpacity
                  onPress={() => setShowChannels(prev => !prev)}
                  style={[styles.textInputContainer, {marginLeft: wp(5)}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ChannelIcon
                      name={SelectedChannel?.channel_name}
                      height={25}
                      width={25}
                    />
                    <Text
                      style={{
                        fontSize: FontSize.MediumText,
                        fontFamily: FONTS.TEXT_REGULAR,
                        color: colors.dark,
                      }}>
                      {SelectedChannel?.platform_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      right: wp(20),
                      padding: hp(5),
                    }}>
                    <AntDesign
                      name={ShowChannels ? 'up' : 'down'}
                      color={colors.darkGray}
                      size={hp(16)}
                    />
                  </View>
                </TouchableOpacity>

                {ShowChannels && channels?.length > 0 && (
                  <Animated.ScrollView
                    entering={FadeIn.duration(400)}
                    style={{
                      position: 'absolute',
                      backgroundColor: colors.light,
                      maxHeight: hp(300),
                      width: width * 0.7,
                      top: hp(Platform.OS === 'android' ? 45 : 35),
                      right: wp(20),
                      borderBottomStartRadius: hp(10),
                      borderBottomEndRadius: hp(10),
                    }}>
                    {channels?.map((item: any, indx: number) => {
                      return (
                        <TouchableOpacity
                          key={`${indx}`}
                          onPress={() => handleSelectedChannel(item)}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: hp(10),
                            paddingHorizontal: wp(10),
                            borderBottomColor: colors.lightGray,
                            borderBottomWidth: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <ChannelIcon
                              name={item?.channel_name}
                              height={25}
                              width={25}
                            />
                            <Text
                              style={{
                                marginLeft: wp(4),
                                color: colors.dark,
                                fontSize: FontSize.MediumText,
                                fontFamily: FONTS.TEXT_REGULAR,
                              }}>
                              {item?.platform_name ?? item?.platform_nick}
                            </Text>
                          </View>
                          {item?.uuid === SelectedChannel?.uuid && (
                            <AntDesign
                              name={'check'}
                              color={colors.darkGray}
                              size={hp(18)}
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </Animated.ScrollView>
                )} */}
              </View>
              <View
                style={{
                  backgroundColor: colors.lightGray,
                  width: '100%',
                  height: 1,
                }}
              />

              <View>
                <View style={[styles.headerSecion, {paddingTop: hp(5)}]}>
                  <Text style={styles.labelText}>To:</Text>
                  <View style={styles.textInputContainer}>
                    {!SelectedContact && (
                      <TextInput
                        ref={contactInputref}
                        style={styles.searchInput}
                        value={value}
                        onChangeText={text => setValue(text)}
                        placeholder="Search contacts with name or number"
                      />
                    )}

                    {SelectedContact && (
                      <View
                        style={{
                          marginLeft: wp(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: wp(10),
                          paddingVertical: hp(4),
                          backgroundColor: colors.lightGray,
                          borderRadius: hp(20),
                        }}>
                        <Text
                          style={{
                            marginLeft: wp(4),
                            color: colors.dark,
                            fontSize: FontSize.MediumText,
                            fontFamily: FONTS.TEXT_REGULAR,
                          }}>
                          {SelectedContact}
                        </Text>
                      </View>
                    )}

                    {/* show close button only when there is a selected item */}
                    {SelectedContact ? (
                      <TouchableOpacity
                        onPress={removeSelectedContact}
                        style={{
                          position: 'absolute',
                          right: wp(-10),
                          padding: hp(5),
                        }}>
                        <AntDesign
                          name="closecircleo"
                          color={colors.darkGray}
                          size={hp(18)}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={addInput}
                        style={{
                          position: 'absolute',
                          right: wp(-10),
                          padding: hp(5),
                        }}>
                        <AntDesign
                          name="pluscircleo"
                          color={colors.darkGray}
                          size={hp(18)}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* show list when searching contact */}
                </View>
                {value !== '' && CustomerList?.length > 0 && (
                  <Animated.ScrollView
                    entering={FadeIn.duration(400)}
                    style={{
                      // position: 'absolute',
                      backgroundColor: colors.light,
                      maxHeight: hp(400),
                      paddingHorizontal: wp(10),
                      // width: width,
                      // top: hp(Platform.OS === 'android' ? 55 : 45),
                      // right: wp(20),
                      // borderBottomStartRadius: hp(10),
                      // borderBottomEndRadius: hp(10),
                    }}>
                    {CustomerList?.map((item: any, indx) => {
                      return (
                        <TouchableOpacity
                          key={`${indx}`}
                          onPress={() =>
                            handleSelectedContact(item?.platform_nick)
                          }
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: hp(45),
                            paddingHorizontal: wp(10),
                            // borderBottomColor: colors.lightGray,
                            // borderBottomWidth: 1,
                          }}>
                          <UserAvatar
                            size={hp(24)}
                            style={{height: hp(24), width: hp(24)}}
                            borderRadius={hp(24 * 0.5)}
                            name={removeEmoji(
                              item?.platform_name ?? item?.platform_nick,
                            )}
                            src={item?.image_url}
                          />
                          <Text
                            style={{
                              marginLeft: wp(4),
                              color: colors.dark,
                              fontSize: FontSize.MediumText,
                              fontFamily: FONTS.TEXT_REGULAR,
                            }}>
                            {item?.platform_name ?? item?.platform_nick}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </Animated.ScrollView>
                )}
              </View>
            </View>
          </View>
          <View style={{backgroundColor: colors.lightGray, height: 1}} />
          {/* attachment container */}
          {attachmentDetials && (
            <View style={{paddingHorizontal: wp(15), marginTop: hp(10)}}>
              <Attachament
                attachmentDetials={attachmentDetials}
                uploading={uploading}
                removeAttachment={removeAttachment}
              />
            </View>
          )}
          {/* input section */}
          <View
            style={{
              flex: 1,
            }}>
            <Animated.View style={[styles.inputWrapper]}>
              <View style={styles.innerContainer}>
                <View style={styles.inputAndMicrophone}>
                  <AutoGrowingTextInput
                    value={message}
                    onChangeText={(text: React.SetStateAction<string>) =>
                      setMessage(text)
                    }
                    style={[styles.input]}
                    placeholder={'Type your message...'}
                    placeholderTextColor={colors.dark}
                    maxHeight={120}
                    minHeight={40}
                    enableScrollToCaret
                  />

                  <TouchableOpacity
                    style={styles.rightIconButtonStyle}
                    onPress={attachFile}>
                    <Entypo
                      name="attachment"
                      size={23}
                      color={colors.inputBg}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={message === '' ? true : false}>
                  <Animated.View
                    style={[styles.sendButton, sendAnimationStyle]}>
                    <Ionicons name={'send'} size={20} color={colors.light} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ComposeSocial;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    paddingVertical: hp(10),
  },
  headerSecion: {
    paddingHorizontal: wp(15),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginVertical: hp(5),
  },
  labelText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.MediumText,
    color: colors.dark,
    marginVertical: wp(5),
    marginLeft: wp(5),
  },
  textInputContainer: {
    //     height: hp(45),
    //     padding: hp(5),
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  searchInput: {
    fontSize: FontSize.MediumText,
    minHeight: hp(30),
    color: colors?.dark,
    // paddingVertical: hp(8),
  },

  inputWrapper: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    bottom: hp(-5),
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
    backgroundColor: colors.lightGray,
    borderColor: colors.secondaryBg,
    // borderWidth: 1,
    flex: 3,
    marginRight: wp(10),
    paddingVertical: Platform.OS === 'ios' ? 20 : 5,
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    paddingVertical: hp(10),
    color: colors.dark,
    flex: 3,
    fontSize: FontSize.MediumText,
    // height: hp(40),
    maxheight: hp(80),
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    // paddingLeft: 10,
    // borderLeftWidth: 1,
    // backgroundColor: colors.darkGray,
    // borderLeftColor: colors.inputBg,
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
