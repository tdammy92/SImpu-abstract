import {View, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
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
import {addToken, addUser} from 'src/store/user/userReducer';
import {
  addOrganisation,
  updateOrganisation,
} from 'src/store/organisation/organisationReducer';
import {FONTS} from 'src/constants';
import {loginUser} from 'src/services/auth';
import AppModal from 'src/components/common/Modal';
import {useProfile} from 'src/services/queries';
import Loader from 'src/components/common/Loader';

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
      retryOnMount: false,
      refetchOnMount: false,
      keepPreviousData: false,
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
    dispatch(addToken(response.data.token));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    // console.log({error});
  }

  if (profile.isLoading) {
    return <Loader />;
  }
  if (profile.isSuccess) {
    dispatch(addUser(profile?.data?.data?.profile));

    dispatch(
      addOrganisation({
        id: profile?.data?.data?.profile?.organisation_id,
        name: 'default',
      }),
    );
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
        </View>
      </KeyboardAwareScrollView>

      {isError && (
        <AppModal
          btnTitle="Close"
          //@ts-ignore
          message={error?.message}
          showModal={isError}
          Icon={() => (
            <MaterialIcons name="error-outline" size={50} color="#276EF1" />
          )}
        />
      )}
    </View>
  );
};

export default Login;
