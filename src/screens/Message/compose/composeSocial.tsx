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
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from 'src/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
import {FONTS, colors} from 'src/constants';
import {Divider} from '@ui-kitten/components';
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

const {width, height} = Dimensions.get('screen');

const ComposeSocial = ({route}: any) => {
  const {channel, connectedChannels} = route.params;
  const navigation = useNavigation();

  const contactInputref = useRef(null);

  const {token, profile} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const [message, setMessage] = useState('');

  // channel state
  const [ShowChannels, setShowChannels] = useState(false);
  const [SelectedChannel, setSelectedChannel] = useState<any>(() => channel);

  //contact states
  const [SelectedContact, setSelectedContact] = useState<customerType | null>(
    null,
  );
  const [SearchContact, setSearchContact] = useState('');
  const [CustomerList, setCustomerList] = useState<customerType[]>([]);

  const debounceValue = useDebounce(SearchContact, 400);

  //search customer query
  const SearchCustomerQuery = useSearchCustomers(
    {
      searchQuery: debounceValue,
      page: 1,
      channelId: channel?.channel_id,
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

  // console.log('slected channel', JSON.stringify(channel, null, 2));
  // console.log('all channels', JSON.stringify(connectedChannels, null, 2));

  const channels = useMemo(() => {
    return connectedChannels?.filter(
      (item: any) => item?.channel_name === channel?.channel_name,
    );
  }, [channel, connectedChannels]);

  //send message handler
  const sendMessage = async () => {
    // scrollToChatBottom();
    const data = {
      message: {
        type: 'message',
        body: message,
        attachment_ids: [],
      },
      params: {
        // threadId,
        // messageId: replyIsActive ? reply?.uuid : '',
        Auth: token,
        organisationId: organisation?.id,
      },
    };

    setMessage('');
    // await sendMessageMutation.mutateAsync(data);
    // }
  };

  const handleSelectedChannel = (item: any) => {
    setSelectedChannel(item);
    setShowChannels(false);
  };
  const handleSelectedContact = (item: customerType) => {
    setSelectedContact(item);
    setCustomerList([]);
    setSearchContact('');
  };

  const removeSelectedContact = () => {
    setSelectedContact(null);
  };

  //send file handler
  const sendFile = async () => {
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

      //   const file = {
      //     uri: res[0]?.uri,
      //     type: res[0]?.type,
      //     name: res[0]?.name,
      //   };

      //   const data = {type: 'message'};
      //   const header = {token, organisationId: organisation?.id};
      //   const url = buildConversationUrl(`upload/${credentialId}`);

      //   Alert.alert('', `Send ${file?.name}  to ${name}`, [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {
      //       text: 'Send',
      //       onPress: async () => {
      //         // setMessageTrail((prev: any) => [tempMessage, ...prev]);

      //         const attachmentId = await uploadFile({
      //           url,
      //           file,
      //           fileName: 'files',
      //           data,
      //           header,
      //           // onProgress,
      //         });
      //         const mutatePayload = {
      //           message: {
      //             body: message,
      //             attachment_ids: attachmentId?.upload_ids,
      //           },
      //           params: {
      //             threadId,
      //             Auth: token,
      //             organisationId: organisation?.id,
      //           },
      //         };
      //         await sendMessageMutation.mutateAsync(mutatePayload);
      //       },
      //     },
      //   ]);
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
  // console.log('selected Item', JSON.stringify(channel, null, 2));
  // console.log('connected channels', JSON.stringify(channels, null, 2));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{marginHorizontal: wp(15)}}
              onPress={() => navigation.goBack()}>
              <AntDesign
                name="close"
                color={colors.secondaryBg}
                size={hp(24)}
              />
            </TouchableOpacity>
            <View
              style={{
                marginTop: hp(10),
                justifyContent: 'center',
                position: 'relative',
              }}>
              <View style={styles.headerSecion}>
                <Text style={styles.labelText}>From:</Text>

                <TouchableOpacity
                  onPress={() => setShowChannels(prev => !prev)}
                  style={[styles.textInputContainer, {marginLeft: wp(5)}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ChannelIcon name={SelectedChannel?.channel_name} />
                    <Text style={{fontSize: hp(16), color: colors.dark}}>
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
                      size={hp(18)}
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
                      // height: hp(100),
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
                            paddingVertical: hp(10),
                            paddingHorizontal: wp(5),
                            borderBottomColor: colors.lightGray,
                            borderBottomWidth: 1,
                          }}>
                          <ChannelIcon name={item?.channel_name} />
                          <Text
                            style={{
                              marginLeft: wp(4),
                              color: colors.dark,
                              fontSize: hp(14),
                            }}>
                            {item?.platform_name ?? item?.platform_nick}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </Animated.ScrollView>
                )}
              </View>
              <View style={{backgroundColor: colors.lightGray, height: 1}} />
              <View style={[styles.headerSecion, {paddingTop: hp(5)}]}>
                <Text style={styles.labelText}>To:</Text>
                <View style={styles.textInputContainer}>
                  {!SelectedContact && (
                    <TextInput
                      ref={contactInputref}
                      style={styles.searchInput}
                      value={SearchContact}
                      onChangeText={text => setSearchContact(text)}
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
                        borderRadius: hp(10),
                      }}>
                      <UserAvatar
                        size={hp(24)}
                        style={{height: hp(24), width: hp(24)}}
                        borderRadius={hp(24 * 0.5)}
                        name={removeEmoji(
                          SelectedContact?.platform_name ??
                            SelectedContact?.platform_nick,
                        )}
                        src={SelectedContact?.image_url}
                      />
                      <Text
                        style={{
                          marginLeft: wp(4),
                          color: colors.dark,
                          fontSize: hp(16),
                        }}>
                        {SelectedContact?.platform_name ??
                          SelectedContact?.platform_nick}
                      </Text>
                    </View>
                  )}

                  {/* show close button only when there is a selected item */}
                  {SelectedContact && (
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
                  )}
                </View>

                {/* show list when searching cotact */}
                {!SelectedContact &&
                  SearchContact !== '' &&
                  CustomerList?.length > 0 && (
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
                      {CustomerList?.map((item: any, indx) => {
                        return (
                          <TouchableOpacity
                            key={`${indx}`}
                            onPress={() => handleSelectedContact(item)}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: hp(10),
                              paddingHorizontal: wp(5),
                              borderBottomColor: colors.lightGray,
                              borderBottomWidth: 1,
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
                                fontSize: hp(14),
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
                    placeholder={'Type something...'}
                    placeholderTextColor={colors.dark}
                    maxHeight={120}
                    minHeight={40}
                    enableScrollToCaret
                  />

                  <TouchableOpacity
                    style={styles.rightIconButtonStyle}
                    onPress={sendFile}>
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
    paddingHorizontal: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginVertical: hp(5),
  },
  labelText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(18),
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
    fontSize: hp(16),
    minHeight: hp(30),
    // paddingVertical: hp(8),
  },

  inputWrapper: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    bottom: hp(-5),
  },

  title: {
    marginTop: 5,
    fontWeight: 'bold',
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
    fontSize: 16,
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
