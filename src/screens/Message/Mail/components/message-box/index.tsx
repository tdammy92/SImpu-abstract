import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React, {
  useState,
  useRef,
  useMemo,
  memo,
  forwardRef,
  useEffect,
  useLayoutEffect,
} from 'react';
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

import DocumentPicker, {types} from 'react-native-document-picker';
import {useMutation} from 'react-query';
import Attachament from 'src/screens/Message/compose/compose-social';
import {
  forwardMessageMail,
  replyMessageMail,
  startConversation,
} from 'src/services/mutations/inbox';
import {queryClient} from 'src/index';

import {
  FormatText,
  removeHtmlTags,
  trimText,
} from 'src/utils/string-utils/string';
import AddMail from 'src/screens/Message/compose/compose-mail/component/addMailAddress';
import RBSheet from 'react-native-raw-bottom-sheet';
import {clearOrganisation} from 'src/store/organisation/organisationReducer';

import {SafeAreaView} from 'react-native-safe-area-context';
import {removeMessage} from 'src/store/message/message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('screen');
const estimateHeight = height * 0.8;

type messageBoxType = {
  closeOptions: any;
  mail: any;
  messageType: 'reply' | 'forward' | 'reply all';
  closeMessageBox: any;
  receiver: string;
  subject: string;
  sentFrom: Array<any>;
  sentTo: Array<any>;
};

const MessageBox = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token, profile} = useSelector((state: StoreState) => state.user);

  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {
    message: mail,
    messageType,
    receiver,
  } = useSelector((state: StoreState) => state.message);

  // console.log('ddd', JSON.stringify(mail, null, 2));

  // channel state
  const [ShowChannels, setShowChannels] = useState(false);
  const [SelectedChannel, setSelectedChannel] = useState<any>();

  // const [mailData, setmailData] = useState<any>();
  // const formatedTo = useMemo(() => {
  //   return sentFrom?.map((from, i) => from?.platform_nick);
  // }, [sentFrom, messageType]);

  const formatedTo = useMemo(() => {
    return !!mail?.entity?.recipients?.from
      ? mail?.entity?.recipients?.from?.map((from: any) => from?.platform_nick)
      : [mail?.author?.platform_nick];
  }, [mail, messageType]);

  //To(recipient)  state
  // const [To, setTo] = useState<string[]>(() => formatedTo);
  const [To, setTo] = useState<string[]>(() => formatedTo);

  // console.log(
  //   'Sent To',
  //   JSON.stringify(mail?.entity?.recipients?.to, null, 2),
  // );
  // console.log(
  //   'Sent CC',
  //   JSON.stringify(mail?.entity?.recipients?.cc, null, 2),
  // );
  // console.log('Sent to', formatedTo);

  const formatedCC = useMemo(() => {
    const CC = !!mail?.entity?.recipients?.cc
      ? mail?.entity?.recipients?.cc?.map((ite: any) => ite?.platform_nick)
      : [];
    const TO = !!mail?.entity?.recipients?.to
      ? mail?.entity?.recipients?.to?.map((ite: any) => ite?.platform_nick)
      : [];

    return [...TO, ...CC]?.filter((mai, i) => mai !== receiver);
  }, [mail, messageType]);

  //CC state
  const [showCC, setshowCC] = useState(false);
  // const [CC, setCC] = useState<string[]>([]);
  const [CC, setCC] = useState<string[]>(() => formatedCC);

  //Bcc state
  const [showBCC, setshowBCC] = useState(false);
  const [BCC, setBCC] = useState<string[]>([]);

  const richText = useRef<RichEditor | undefined>();

  // console.log('message subject', mail?.entity?.content?.subject);
  const [message, setMessage] = useState('');
  const [subject, setsubject] = useState(() =>
    removeHtmlTags(mail?.entity?.content?.subject ?? ''),
  );

  //attachment sate
  const [attachmentDetials, setAttachmentDetials] = useState<any>(null);
  const [attachemntId, setAttachemntId] = useState<any>([]);
  const [uploading, setuploading] = useState(false);

  const replyConversationMutation = useMutation(replyMessageMail, {
    onSuccess(data, variables, context) {
      dispatch(removeMessage());
      queryClient.invalidateQueries(['conversations']);

      handleCloseBox();
    },
    onError(error, variables, context) {
      console.log('error from compose message', error);
      messsageToast({message: `${error}`, type: 'danger'});
    },
  });

  const ForwardConversationMutation = useMutation(forwardMessageMail, {
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {
      console.log('error from compose message', error);
      // messsageToast({message: `${error}`, type: 'danger'});
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

    if (messageType === 'reply') {
      const payload = {
        message: {
          type: 'message',
          // subject,
          to: To,
          cc: [],
          bcc: [],
          body_html: message,
          attachment_ids: attachemntId,
          // user_nick: SelectedContact?.platform_nick,
        },

        messageId: mail?.uuid,
        Auth: token,
        organisationId: organisation?.id,
      };

      try {
        setMessage('');
        // console.log('message payload', JSON.stringify(payload, null, 2));
        await replyConversationMutation.mutateAsync(payload);

        // await ForwardConversationMutation.mutateAsync(payload);
      } catch (e) {
        console.log();
      }
    }

    //reply all
    if (messageType === 'reply all') {
      const payload = {
        message: {
          type: 'message',
          // subject,
          to: To,
          cc: CC,
          bcc: BCC,
          body_html: message,
          attachment_ids: attachemntId,
          // user_nick: SelectedContact?.platform_nick,
        },

        messageId: mail?.uuid,
        Auth: token,
        organisationId: organisation?.id,
      };

      try {
        setMessage('');
        // console.log('message payload', JSON.stringify(payload, null, 2));
        await replyConversationMutation.mutateAsync(payload);

        // await ForwardConversationMutation.mutateAsync(payload);
      } catch (e) {
        console.log();
      }
    }

    //forward
    if (messageType === 'forward') {
      const payload = {
        message: {
          type: 'message',
          // subject,
          to: To,
          cc: CC,
          bcc: BCC,
          body_html: message,
          attachment_ids: attachemntId,
          // user_nick: SelectedContact?.platform_nick,
        },

        messageId: mail?.uuid,
        Auth: token,
        organisationId: organisation?.id,
      };

      try {
        setMessage('');
        // console.log('message payload', JSON.stringify(payload, null, 2));
        // await replyConversationMutation.mutateAsync(payload);

        await ForwardConversationMutation.mutateAsync(payload);
      } catch (e) {
        console.log();
      }
    }
  };

  console.log('zzzzzzz', JSON.stringify(mail, null, 2));
  // console.log('recipents', {To, CC, BCC});
  // console.log('subjecct', mail?.entity?.content?.subject);

  function handleCloseBox() {
    navigation.dispatch(StackActions.pop(1));
  }
  console.log('my receiver', receiver);
  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.container]}>
          {/* heading container */}
          <View style={[styles.headerContainer, {}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleCloseBox}>
                <AntDesign name="close" size={24} color={colors.dark} />
              </TouchableOpacity>

              <Text style={styles.messageText}>{FormatText(messageType)}</Text>
            </View>

            <TouchableOpacity
              disabled={To?.length < 1 && message === ''}
              onPress={sendMessage}>
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
              style={[
                styles.inputWrapper,
                {flexDirection: 'row', alignItems: 'flex-start'},
              ]}>
              <Text style={styles.labelText}>From:</Text>
              <Text style={styles.textStyle}>{receiver}</Text>
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
              showSearchCustomer={false}
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
                  showSearchCustomer={false}
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
                  showSearchCustomer={false}
                />
                <Divider />
              </>
            )}

            {/* Subject */}
            <View
              style={[
                styles.inputWrapper,
                {
                  alignItems: 'flex-start',
                },
              ]}>
              <Text
                style={[styles.inputLabelText, {width: '24%', marginRight: 0}]}>
                Subject:
              </Text>

              <TextInput
                multiline
                value={subject}
                maxLength={60}
                style={[
                  // styles.textStyle,
                  {
                    fontSize: FontSize.BigText,
                    color: colors.dark,
                    width: '75%',
                    margin: 0,
                    padding: 0,
                  },
                ]}
                editable={messageType === 'forward'}
                onChangeText={text => setsubject(text)}
              />
              {/* </View> */}
              {/* <Text style={styles.textStyle}>
                {mail?.entity?.content?.subject}
              </Text> */}
            </View>
            <Divider />

            {/* Message */}
            <View
              style={{
                maxHeight: hp(80),
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
              <View
                style={{
                  paddingHorizontal: wp(15),
                  marginVertical: hp(10),
                }}>
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
              ]}
            />
            <View style={{width: wp(10)}} />
            <TouchableOpacity onPress={attachFile}>
              <Entypo name="attachment" color={colors.darkGray} size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    width: width,
  },
  headerContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    height: hp(60),

    paddingHorizontal: wp(10),
    justifyContent: 'space-between',
    elevation: 1,
    zIndex: 1,
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
  },
  textInputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  messageText: {
    marginLeft: hp(10),
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
    color: colors.dark,
  },

  sendText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
  },

  formWrapper: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: wp(10),
    paddingVertical: wp(10),
  },
  inputLabelText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
    marginRight: wp(4),
  },

  inputStyle: {
    flex: 1,
    fontSize: FontSize.BigText,
  },
  textStyle: {
    textAlign: 'left',
    width: '80%',
    color: colors.darkGray,
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
