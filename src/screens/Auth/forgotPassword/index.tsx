import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {Button} from 'src/components/common/Button';
import AuthInput from '../component/AuthInput';
import HeaderBack from 'src/navigation/HeaderBack';
import AppModal from 'src/components/common/Modal';

const ForgotPassword = () => {
  const [Email, setEmail] = useState('');
  const [ShoModal, setShoModal] = useState(false);

  const HandleSubmit = () => {
    setShoModal(true);
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
                Enter your email address to proceed
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
                    fontFamily: FONTS.AVERTA_REGULAR,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity> */}
              </View>
              <Button
                title="Reset Password"
                onPress={HandleSubmit}
                style={{marginTop: hp(8)}}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <AppModal
        showModal={ShoModal}
        setShoModal={setShoModal}
        message={
          'We just sent you an email with a  link to reset your passsword.'
        }
      />
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
    //     flex: 0.9,
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
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(24),
    color: '#000',
    paddingVertical: hp(15),
  },
  InfoText: {
    color: '#959898',
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(17),
    textAlign: 'left',
    width: '80%',
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
});
