import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef, useMemo} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider} from '@ui-kitten/components';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useDispatch, useSelector} from 'react-redux';

import {colors, FONTS, FontSize} from 'src/constants';
import {StackActions, useNavigation} from '@react-navigation/native';
import {hp, messsageToast, wp} from 'src/utils';
import {StoreState} from 'src/@types/store';
import {buildConversationUrl} from 'src/services/api/api-client';
import {uploadFile} from 'src/services/upload/attchments';
import ChannelIcon from 'src/components/common/ChannelIcon';
import AddMail from './component/addMailAddress';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useMutation} from 'react-query';
import Attachament from '../compose-social/component/attachament';
import {startConversation} from 'src/services/mutations/inbox';
import {SCREEN_NAME} from 'src/navigation/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('screen');

const ComposeMail = ({route}: any) => {
  const {channel, connectedChannels} = route.params;
  const navigation = useNavigation();

  const {token, profile} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  // channel state
  const [ShowChannels, setShowChannels] = useState(false);
  const [SelectedChannel, setSelectedChannel] = useState<any>(() => channel);

  //To(recipient)  state
  const [To, setTo] = useState<string[]>([]);

  //CC state
  const [showCC, setshowCC] = useState(false);
  const [CC, setCC] = useState<string[]>([]);

  //Bcc state
  const [showBCC, setshowBCC] = useState(false);
  const [BCC, setBCC] = useState<string[]>([]);

  const richText = useRef<RichEditor | undefined>();

  const channels = useMemo(() => {
    return connectedChannels?.filter(
      (item: any) => item?.channel_id === SelectedChannel?.channel_id,
    );
  }, [channel, connectedChannels]);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  //attachment sate
  const [attachmentDetials, setAttachmentDetials] = useState<any>(null);
  const [attachemntId, setAttachemntId] = useState<any>([]);
  const [uploading, setuploading] = useState(false);

  const handleSelectedChannel = (item: any) => {
    setSelectedChannel(item);
    setShowChannels(false);
  };

  const StartConversationMutation = useMutation(startConversation, {
    onSuccess(data, variables, context) {
      if (data?.thread_id) {
        navigation.dispatch(
          StackActions.replace(SCREEN_NAME.mail, {
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
      const url = buildConversationUrl(`upload/${SelectedChannel?.uuid}`);
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

  //remove added attachemt
  const removeAttachment = () => {
    setAttachemntId([]);
    setAttachmentDetials(null);
    setuploading(false);
  };

  //send message handler
  const sendMessage = async () => {
    if (To.length < 1) {
      messsageToast({message: `add a recipent`, type: 'warning'});
      return;
    }

    const payload = {
      message: {
        type: 'message',
        subject,
        to: To,
        cc: CC,
        bcc: BCC,
        body_html: message,
        attachment_ids: attachemntId,
        // user_nick: SelectedContact?.platform_nick,
      },

      credentialId: SelectedChannel?.uuid,
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

  // console.log('selected Item', JSON.stringify(channel, null, 2));
  // console.log('connected channels', JSON.stringify(channels, null, 2));

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, {}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="close" size={28} color={colors.dark} />
            </TouchableOpacity>
            <Text style={styles.messageText}>New Mail</Text>
          </View>

          <TouchableOpacity onPress={sendMessage}>
            <MaterialIcons
              name="send"
              size={hp(25)}
              color={
                To?.length < 1 && message === ''
                  ? colors.darkGray
                  : colors?.dark
              }
            />
          </TouchableOpacity>
        </View>
        <Divider />

        <View style={styles.formWrapper}>
          {/* from */}
          <View
            style={[styles.inputWrapper, {zIndex: 50, overflow: 'visible'}]}>
            {/* <View style={[styles.headerSecion, {zIndex: 40}]}> */}
            <Text style={styles.labelText}>From:</Text>

            <TouchableOpacity
              onPress={() => setShowChannels(prev => !prev)}
              style={[
                styles.textInputContainer,
                {
                  marginLeft: wp(5),
                  // zIndex: 30
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ChannelIcon name={SelectedChannel?.channel_name} />
                <Text style={{fontSize: FontSize.BigText, color: colors.dark}}>
                  {SelectedChannel?.platform_name ??
                    SelectedChannel?.platform_nick}
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
                  maxHeight: hp(200),
                  width: width * 0.8,
                  // top: hp(Platform.OS === 'android' ? 45 : 35),
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
                        zIndex: 60,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // zIndex: 70,
                        }}>
                        <ChannelIcon name={item?.channel_name} />
                        <Text
                          style={{
                            marginLeft: wp(4),
                            color: colors.dark,
                            fontSize: FontSize.BigText,
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
            )}
          </View>
          {/* </View> */}
          <Divider />

          {/* To */}
          <AddMail
            SelectedChannel={SelectedChannel}
            title="To"
            placeholder="Add recipient"
            valueArr={To}
            setValueArr={setTo}
            zIndex={40}
            showSearchCustomer={true}
          />
          <Divider />

          {/* CC*/}
          {showCC && (
            <>
              <AddMail
                SelectedChannel={SelectedChannel}
                title="CC"
                placeholder="Add CC"
                valueArr={CC}
                setValueArr={setCC}
                zIndex={30}
                showSearchCustomer={true}
              />
              <Divider />
            </>
          )}

          {/* BCC*/}
          {showBCC && (
            <>
              <AddMail
                SelectedChannel={SelectedChannel}
                title="BCC"
                placeholder="Add BCC"
                valueArr={BCC}
                setValueArr={setBCC}
                zIndex={20}
                showSearchCustomer={true}
              />
              <Divider />
            </>
          )}

          {/* Subject */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>Subject:</Text>
            <TextInput
              placeholder="Add a Subject"
              style={styles.inputStyle}
              value={subject}
              onChangeText={text => setSubject(text)}
            />
          </View>
          <Divider />

          {/* Message */}
          <View
            style={{
              height: hp(200),
              paddingTop: hp(10),
              flex: 1,
            }}>
            <RichEditor
              placeholder="Type your mail"
              androidLayerType="software"
              style={{zIndex: -20}}
              //@ts-ignore
              ref={richText}
              onChange={descriptionText => {
                // console.log('descriptionText:', descriptionText);
                setMessage(descriptionText);
              }}
            />
            {/* <View style={styles.signatureWrapper}>
              <View style={styles.signatureLine} />
              <Text
                style={
                  styles.signatureText
                }>{`${profile.first_name} ${profile.last_name}`}</Text>
              <Text style={{color: 'gray'}}>
                Sent from{' '}
                <Text style={{fontFamily: FONTS.TEXT_SEMI_BOLD}}>Simpu</Text>
              </Text>
            </View> */}
          </View>
          {attachmentDetials && (
            <View style={{paddingHorizontal: wp(15), marginVertical: hp(10)}}>
              <Attachament
                attachmentDetials={attachmentDetials}
                uploading={uploading}
                removeAttachment={removeAttachment}
              />
            </View>
          )}
        </View>

        {/* Editor Toolbar component */}
        <View
          style={{
            paddingVertical: hp(15),
            backgroundColor: colors.bootomHeaderBg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => setshowCC(!showCC)}>
            <Text style={styles.inputToggle}>CC</Text>
          </TouchableOpacity>
          <View style={{width: wp(10)}} />
          <TouchableOpacity onPress={() => setshowBCC(!showBCC)}>
            <Text style={styles.inputToggle}>BCC</Text>
          </TouchableOpacity>
          <View style={{width: wp(10)}} />
          <RichToolbar
            style={{backgroundColor: 'transparent'}}
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              //  actions.insertLink,
            ]}
          />
          <View style={{width: wp(10)}} />
          <TouchableOpacity onPress={attachFile}>
            <Entypo name="attachment" color={colors.darkGray} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ComposeMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    height: hp(80),
    paddingTop: hp(25),
    paddingHorizontal: wp(15),
    justifyContent: 'space-between',
    elevation: 2,
    zIndex: 2,
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
    fontSize: FontSize.BigText,
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

  messageText: {
    marginLeft: hp(20),
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
    color: colors.dark,
  },

  sendText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
  },

  //   formConatiner: {},
  formWrapper: {
    flex: 1,
    zIndex: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(60),
    paddingHorizontal: wp(10),
  },
  inputLabelText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
    marginRight: wp(5),
  },

  inputStyle: {
    flex: 1,
    fontSize: FontSize.BigText,
  },

  inputToggle: {
    fontSize: hp(20),
    color: colors.darkGray,
  },
  signatureWrapper: {
    position: 'absolute',
    bottom: 15,
    left: 5,
    paddingHorizontal: wp(8),
  },

  signatureLine: {
    width: wp(20),
    height: hp(2),
    backgroundColor: '#000',
    marginVertical: hp(10),
  },
  signatureText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(16),
  },
});
