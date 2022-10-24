import {View, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Divider} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useMutation} from 'react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import styles from './styles';
import Simpu from 'src/assets/images/SimpuIcon.svg';
import Google from 'src/assets/images/Google.svg';
import {Button} from 'src/components/common/Button';
import {hp, wp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import AuthInput from './component/AuthInput';
import {addToken, addUser} from 'src/store/user/userReducer';
import {FONTS} from 'src/constants';
import {loginUser} from 'src/services/auth';
import AppModal from 'src/components/common/Modal';
import {useProfile} from 'src/services/queries';

//form schema validation
const ValidationShema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();

  //login user mutation
  const {isError, data, error, isLoading, isSuccess, mutateAsync} =
    useMutation(loginUser);

  //fetch user profile query
  const profile = useProfile(
    'profile',
    {
      organisationId: data?.data?.organisations[0].id,
      Auth: data?.data?.token,
    },
    {
      enabled: !!data?.data?.token,
    },
  );

  // inital values
  const loginInfo = {
    email: '',
    password: '',
  };

  //handle login function
  const handleLogin = async (values: any) => {
    const payload = {
      username: values.email,
      password: values.password,
    };
    const response = await mutateAsync(JSON.stringify(payload));

    console.log('resss', response.data.token);

    dispatch(addToken(response.data.token));

    // navigation.reset({index: 0, routes: [{name: SCREEN_NAME.main}]});
  };

  // if (isLoading) {
  //   return (
  //     <AppModal showModal={isError} message={'loading'} isALoader={true} />
  //   );
  // }

  // if (isError) {
  //   return <AppModal showModal={isLoading} message={error} isALoader={false} />;
  // }

  if (profile.isSuccess) {
    // console.log(profile?.data?.data?.profile);
    dispatch(addUser(profile?.data?.data?.profile));
    navigation.reset({index: 0, routes: [{name: SCREEN_NAME.main}]});
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <Text style={styles.headerText}>Login</Text>
            <Text style={styles.InfoText}>
              Enter your email address and password to access your account
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.inputConatiner}>
              {/* Form container */}
              <Formik
                initialValues={loginInfo}
                validationSchema={ValidationShema}
                onSubmit={values => handleLogin(values)}>
                {({
                  values: {email, password},
                  errors,
                  handleChange,
                  touched,
                  handleSubmit,
                }) => {
                  return (
                    <>
                      <AuthInput
                        label="Email"
                        type="email"
                        value={email}
                        onChangeText={handleChange('email')}
                        error={errors.email && touched.email && errors.email}
                      />

                      <View style={{height: 7}} />
                      <AuthInput
                        label="Password"
                        error={
                          errors.password && touched.password && errors.password
                        }
                        value={password}
                        onChangeText={handleChange('password')}
                        isPassword={true}
                      />

                      <View
                        style={{
                          width: '100%',
                          paddingBottom: hp(20),
                          paddingHorizontal: wp(10),
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(SCREEN_NAME.forgotPassword)
                          }>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#276EF1',
                              fontFamily: FONTS.AVERTA_REGULAR,
                            }}>
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Button
                        title="Login"
                        onPress={handleSubmit}
                        style={{marginTop: hp(8)}}
                      />
                    </>
                  );
                }}
              </Formik>
            </View>
          </View>

          <View style={{position: 'relative', flex: 0.5, width: '100%'}}>
            {/* bottoms link */}
          </View>
          {/* <View style={styles.footerLinkContainer}>
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
          </View> */}
        </View>
      </KeyboardAwareScrollView>
      <AppModal
        showModal={isLoading}
        //  setShoModal

        isALoader={true}
      />
      <AppModal
        showModal={isError}
        //@ts-ignore
        message={error?.message}
        Icon={() => (
          <AntDesign name="checkcircleo" size={hp(60)} color="#276EF1" />
        )}
        isALoader={false}
      />
    </View>
  );
};

export default Login;
