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
import {hp, messsageToast, wp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import AuthInput from './component/AuthInput';
import {
  addProfile,
  logInUser,
  addToken,
  addUser,
} from 'src/store/user/userReducer';
import {showLoader, hideLoader} from 'src/store/Loader/index';
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
import useDeviceDetails from 'src/Hooks/useDeviceDetails';
import {registerDeviceNotification} from 'src/services/query/notification';
import {addDevice} from 'src/store/device/deviceReducer';

// inital values
const loginInfo = {
  email: '',
  password: '',
};

//form schema validation
const ValidationShema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();

  const DeviceDetails = useDeviceDetails();
  const {token} = useSelector((state: StoreState) => state.user);
  const {Isloading} = useSelector((state: StoreState) => state.loader);

  //login user mutation
  const loginMutation = useMutation(loginUser, {
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {
      dispatch(hideLoader());
    },
  });

  // console.log('login mutation data response', loginMutation.data);

  //fetch user profile query
  const profileQuery = useProfile(
    'profile',
    {
      organisationId: loginMutation?.data?.data?.organisations[0].id,
      Auth: loginMutation?.data?.data?.token,
    },
    {
      enabled: !!loginMutation?.data?.data?.token,
      retryOnMount: false,
      refetchOnMount: false,
      keepPreviousData: false,

      onSuccess: async (data: any) => {
        await deviceMutation.mutateAsync({DeviceDetails, Auth: token});

        /*
         update user profile
        */
        dispatch(addProfile(data?.data?.profile));

        /*
         update user details
        */
        dispatch(addUser(data?.data?.user));

        /*
         update organisation
        */
        dispatch(
          addOrganisation({
            id: data?.data?.profile?.organisation_id,
            name: 'default',
          }),
        );

        /*
        dispatch user login to true
        */
        dispatch(logInUser());

        navigation.reset({index: 0, routes: [{name: SCREEN_NAME.main}]});

        //@ts-ignore
        // await connect(token, data?.data?.profile, data?.data?.profile?.id);
        //update profile
      },
      onError: (error: Error) => {
        dispatch(hideLoader());
      },
    },
  );
  const deviceMutation = useMutation(registerDeviceNotification, {
    onSuccess(data, variables, context) {
      console.log('Yomi API response', data);
      dispatch(addDevice(data?.data));
      dispatch(hideLoader());
    },
    onError(error, variables, context) {
      //@ts-ignore
      messsageToast({message: `${error?.message}`, type: 'danger'});
      dispatch(hideLoader());
    },
  });

  //handle login function
  const handleLogin = async (values: any) => {
    dispatch(showLoader());
    const payload = {
      username: values.email,
      password: values.password,
    };
    const response = await loginMutation.mutateAsync(JSON.stringify(payload));

    // console.log('Auth response', response);
    dispatch(addToken(response.data.token));
  };

  if (loginMutation.isLoading) {
    // return <Loader />;
  }

  if (loginMutation.isError) {
    console.log(loginMutation.error);
  }

  if (profileQuery.isLoading) {
    // return <Loader />;
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

      {loginMutation?.isError && (
        <AppModal
          btnTitle="Close"
          //@ts-ignore
          message={loginMutation?.error ?? 'Unable to login'}
          showModal={loginMutation.isError}
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
