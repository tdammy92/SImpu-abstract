import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {hp, wp} from 'src/utils';
import {FONTS, FontSize, colors} from 'src/constants';
import {Button} from 'src/components/common/Button';
import AuthInput from '../component/AuthInput';
import HeaderBack from 'src/navigation/HeaderBack';
import AppModal from 'src/components/common/AppModal';
import {useMutation} from 'react-query';
import {RequestPasswordReset} from 'src/services/mutations/profile';
import CloseIcon from 'src/assets/images/Close_Icon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_NAME} from 'src/navigation/constants';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [ShoModal, setShoModal] = useState<boolean>(false);

  const ForgotPasswordMutation = useMutation(RequestPasswordReset, {
    onSuccess: async (data, variables, context) => {
      // console.log('response from reset', JSON.stringify(data, null, 2));
      await openModal();
      setShoModal(true);
      // console.log('his got fireddd');
    },
    onError(error, variables, context) {
      console.log('failed');
      //@ts-ignore
      messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });

  const HandleSubmit = async () => {
    const payload = {
      email: Email,
      link: 'https://demo.simpu.co/reset-password/{{token}}',
    };

    ForgotPasswordMutation.mutate(payload);
  };

  async function openModal() {
    setEmail('');

    setTimeout(() => {
      setShoModal(true);
    }, 200);
  }

  const handleCloseModal = () => {
    setEmail('');
    setShoModal(false);

    setTimeout(
      //@ts-ignore
      () => navigation.reset({index: 0, routes: [{name: SCREEN_NAME.auth}]}),
      300,
    );
  };

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{paddingVertical: hp(20)}}>
            <HeaderBack />
          </View>
          <View style={styles.content}>
            <View style={styles.topContainer}>
              <Text style={styles.headerText}>Forgot Password</Text>
              <Text style={styles.InfoText}>
                Enter the email addresss associated with your account and we'll
                send you a link to reset your password
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.inputConatiner}>
                <AuthInput
                  label="Email"
                  Value={Email}
                  onChangeText={(text: any) => setEmail(text)}
                  // error="Please enter email"
                />
              </View>
              <View
                style={{
                  width: '100%',
                  paddingBottom: hp(20),
                  paddingHorizontal: wp(10),
                }}>
                {/* <TouchableOpacity
                onPress={() => navigation.navigate(SCREEN_NAME.forgotPassword)}>
                <Text
                  style={{
                    textAlign: 'right',
                    color: '#276EF1',
                    fontFamily: FONTS.TEXT_REGULAR,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity> */}
              </View>
              <Button
                disabled={Email === ''}
                title="Reset"
                onPress={HandleSubmit}
                style={{marginTop: hp(8)}}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <Modal
        isVisible={ForgotPasswordMutation?.isLoading}
        animationIn="zoomIn"
        backdropOpacity={0.6}
        style={{}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: FontSize.BigText,
              fontFamily: FONTS.TEXT_BOLD,
              color: colors.light,
              marginVertical: hp(5),
            }}>
            Processing...
          </Text>
          <ActivityIndicator size="large" color={colors.light} />
        </View>
      </Modal>

      <Modal
        isVisible={ShoModal}
        animationIn="zoomIn"
        style={styles.modalStyle}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{position: 'absolute', top: 15, right: 12}}>
            <CloseIcon
              style={{elevation: 2, zIndex: 2}}
              height={hp(30)}
              width={hp(30)}
            />
          </TouchableOpacity>

          <>
            <View style={styles.messageContainer}>
              <View
                style={{
                  height: hp(60),
                  width: hp(60),
                  borderRadius: hp(60 * 0.5),
                  backgroundColor: colors.bootomHeaderBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="email-fast-outline"
                  size={hp(30)}
                  color={colors.secondaryBg}
                />
              </View>
              <Text style={styles.messageText}>
                We just sent you an email with a link to reset your passsword
              </Text>
            </View>
          </>
        </View>
      </Modal>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: hp(30),
    paddingVertical: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  topContainer: {
    width: '100%',
    paddingHorizontal: wp(10),
  },
  headerText: {
    textAlign: 'left',
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.BigText,
    color: colors.dark,
    paddingVertical: hp(15),
  },
  InfoText: {
    color: colors.darkGray,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    textAlign: 'auto',
    width: '90%',
  },
  btnContainer: {
    marginTop: hp(30),
    marginVertical: hp(25),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputConatiner: {
    width: '100%',
  },

  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: colors.light,
    height: '30%',
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageContainer: {paddingVertical: hp(15), alignItems: 'center'},
  messageText: {
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
  },
});
