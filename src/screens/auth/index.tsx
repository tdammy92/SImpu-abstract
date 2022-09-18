import {StyleSheet, View, Linking, TextInput} from 'react-native';
import React from 'react';
import {Text} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import styles from './styles';
import Simpu from 'src/assets/images/SimpuIcon.svg';
import Google from 'src/assets/images/Google.svg';

import {Button} from 'src/components/common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {hp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import AuthInput from './component/AuthInput';

const Login = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <Simpu width={80} height={80} />
            <Text style={styles.headerText}>Login to Simpu</Text>
          </View>
          <View style={styles.btnContainer}>
            {/* <TouchableOpacity style={[styles.googleButton]}>
              <Google width={20} height={20} />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity> */}

            <View style={styles.inputConatiner}>
              <AuthInput
                label="Email address"
                // error="Please enter email"
              />
              <AuthInput
                label="Password"
                error="Please enter password"
                isPassword={true}
              />
            </View>

            <Button
              title="Continue with email"
              onPress={() => navigation.navigate(SCREEN_NAME.main)}
              style={{marginTop: hp(8)}}
            />
          </View>

          <View style={{position: 'relative', flex: 0.5, width: '100%'}}>
            {/* <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: hp(16)}}>
                Looking to create an account instead?
              </Text>
              <TouchableOpacity>
                <Text
                  style={{color: '#026AE8', marginLeft: 5, fontSize: hp(16)}}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* bottoms link */}
          </View>
          <View style={styles.footerLinkContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://simpu.co/')}>
              <Text style={styles.linkText}>© Simpu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://app.simpu.co/terms-conditions')
              }>
              <Text style={styles.linkText}>Privacy & Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://simpu.co/sales')}>
              <Text style={styles.linkText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
