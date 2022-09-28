import {View, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';

import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import styles from './styles';
import Simpu from 'src/assets/images/SimpuIcon.svg';
import Google from 'src/assets/images/Google.svg';
import {Button} from 'src/components/common/Button';
import {hp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import AuthInput from './component/AuthInput';
import {addUser} from 'src/store/user/userReducer';

const modelUser = {
  id: '5ab8b23be39f11ea937086d35ec4f76b',
  organisation_id: '5ab71f75e39f11ea937086d35ec4f76b',
  user_id: '5ab599aee39f11ea937086d35ec4f76b',
  first_name: 'Developer',
  last_name: 'Simpu',
  country_code: +234,
  phone: 7057216653,
  email: 'Dev@simpu.co',
  created_datetime: '2020-08-21T11:13:34Z',
  updated_datetime: '2021-10-07T13:56:45.601Z',
  image:
    'https://res.cloudinary.com/simpu-inc/image/upload/v1633364389/vifv2aqnhhzvd5nfxaaw.jpg',
  permissions: ['*'],
  page_access: ['*'],
};

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(addUser(modelUser));

    navigation.reset({index: 0, routes: [{name: SCREEN_NAME.main}]});
  };

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
              onPress={handleLogin}
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
