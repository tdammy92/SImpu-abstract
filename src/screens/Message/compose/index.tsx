import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from '@ui-kitten/components';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {colors, FONTS} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from 'src/utils';
import {StoreState} from 'src/@types/store';

const Compose = () => {
  const navigation = useNavigation();
  const user = useSelector((state: StoreState) => state.user.profile);
  const richText = useRef<RichEditor | undefined>();
  const {width} = Dimensions.get('screen');

  const [mail, setmail] = useState({
    from: `${user.email}`,
    to: '',
    subject: '',
    message: '',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, {}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={28} color={colors.dark} />
          </TouchableOpacity>
          <Text style={styles.messageText}>New Message</Text>
        </View>

        <TouchableOpacity onPress={() => console.log('Send message')}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <KeyboardAwareScrollView customStyle={{paddingHorizontal: 0}}>
        <View style={styles.formWrapper}>
          {/* from */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>From:</Text>
            <TextInput
              style={[styles.inputStyle, {color: 'gray'}]}
              value={mail.from}
            />
          </View>
          <Divider />

          {/* To */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>To:</Text>
            <TextInput style={styles.inputStyle} value={mail.to} />
          </View>
          <Divider />

          {/* Subject */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>Subject:</Text>
            <TextInput style={styles.inputStyle} value={mail.subject} />
          </View>
          <Divider />

          {/* Message */}
          <View
            style={{
              height: hp(200),
              paddingTop: hp(10),
              flex: 1,
            }}>
            {/* <TextInput
                placeholder="Type your email"
                placeholderTextColor={'#b3b3b3'}
              /> */}

            <RichEditor
              placeholder="Type your mail"
              androidLayerType="software"
              //     editorStyle={{backgroundColor: '#f5f5f5'}}
              //@ts-ignore
              ref={richText}
              onChange={descriptionText => {
                console.log('descriptionText:', descriptionText);
                setmail({...mail, message: descriptionText});
              }}
            />
            <View style={styles.signatureWrapper}>
              <View style={styles.signatureLine} />
              <Text
                style={
                  styles.signatureText
                }>{`${user.first_name} ${user.last_name}`}</Text>
              <Text style={{color: 'gray'}}>
                Sent from{' '}
                <Text style={{fontFamily: FONTS.TEXT_SEMI_BOLD}}>Simpu</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Editor Toolbar component */}
      <View style={{paddingVertical: hp(15), backgroundColor: '#f4f4f4'}}>
        <RichToolbar
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
      </View>
    </View>
  );
};

export default Compose;

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

  messageText: {
    marginLeft: hp(20),
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(18),
    color: colors.dark,
  },

  sendText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(18),
  },

  //   formConatiner: {},
  formWrapper: {
    flex: 1,
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
    fontSize: hp(18),
    marginRight: wp(5),
  },

  inputStyle: {
    flex: 1,
    fontSize: hp(18),
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
