import {View, Linking, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useMutation} from 'react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import styles from './styles';
import Simpu from 'src/assets/images/SimpuIcon.svg';
import Google from 'src/assets/images/Google.svg';
import {Button} from 'src/components/common/Button';
import {hp, wp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import AuthInput from './component/AuthInput';
import {addProfile, addToken, addUser} from 'src/store/user/userReducer';
import {addOrganisation} from 'src/store/organisation/organisationReducer';
import {colors, FONTS} from 'src/constants';
import {loginUser} from 'src/services/query/auth';
import AppModal from 'src/components/common/Modal';
import {useProfile} from 'src/services/query/queries';
import Loader from 'src/components/common/Loader';
import {connect} from 'src/services/notification/pusher';
import {StoreState} from 'src/@types/store';
import {requestNotificationType} from 'src/@types/inbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resquestFcmPermission} from 'src/services/Firebase/firebase';
import {registerNotification} from 'src/services/notification/notification';
import useDeviceDetails from 'src/Hooks/useDeviceDetails';
import {registerDeviceNotification} from 'src/services/query/notification';

//form schema validation
const ValidationShema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();

  const DeviceDetails = useDeviceDetails();

  const {token} = useSelector((state: StoreState) => state.user);

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
      retryOnMount: false,
      refetchOnMount: false,
      keepPreviousData: false,
      onSuccess: async (data: any) => {
        try {
          const Auth = token;
          const res = await registerDeviceNotification({DeviceDetails, Auth});
          console.log("response from yomi's API", res);

          dispatch(addProfile(data?.data?.profile));

          //update user
          dispatch(addUser(data?.data?.user));

          //update organisation
          dispatch(
            addOrganisation({
              id: data?.data?.profile?.organisation_id,
              name: 'default',
            }),
          );

          navigation.reset({index: 0, routes: [{name: SCREEN_NAME.main}]});
        } catch (error) {
          console.log("error from yomi's API", error);
        }
        // console.log('device detials', DeviceDetails);
        // console.log('zzzzzzz', JSON.stringify(data?.data?.profile, null, 2));
        //@ts-ignore
        // await connect(token, data?.data?.profile, data?.data?.profile?.id);
        //update profile
      },
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

    // console.log('Auth response', response);
    dispatch(addToken(response.data.token));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
  }

  if (profile.isLoading) {
    return <Loader />;
  }

  // console.log('device details', DeviceDetails);

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
                        keyboardType="email-address"
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
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{width: '40%'}}
                          onPress={() =>
                            navigation.navigate(SCREEN_NAME.forgotPassword)
                          }>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: `${colors.secondaryBg}`,
                              fontFamily: FONTS.TEXT_REGULAR,
                            }}>
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <Button
                        title="Login"
                        //@ts-ignore
                        onPress={handleSubmit}
                        style={{marginTop: hp(8), width: '100%'}}
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
        </View>
      </KeyboardAwareScrollView>

      {isError && (
        <AppModal
          btnTitle="Close"
          //@ts-ignore
          message={error ?? 'Unable to login'}
          showModal={isError}
          Icon={() => (
            <MaterialIcons
              name="error-outline"
              size={60}
              color={colors.secondaryBg}
            />
          )}
        />
      )}
    </View>
  );
};

export default Login;
