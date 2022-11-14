import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useMutation, useQuery} from 'react-query';
import FloatLabel from 'src/components/common/FloatLabel';
import {globalStyles} from 'src/styles';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StoreState} from 'src/@types/store';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';
import {changePassword} from 'src/services/profile';
import {logOutUser} from 'src/store/user/userReducer';
import {SCREEN_NAME} from 'src/navigation/constants';
import {queryClient} from 'src/index';
import Loader from 'src/components/common/Loader';

//form schema validation
const ValidationShema = yup.object({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup.string().required('New Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords do not match'),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {setOptions} = useNavigation();
  const navigation = useNavigation();
  const {token} = useSelector((state: StoreState) => state.user);
  const submitRef = useRef();

  //update user profile
  const changePasswordMutation = useMutation(
    value =>
      changePassword(value, {
        Auth: token,
      }),
    {},
  );

  // inital values
  const InitialPasswordvalue = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  //handle logout function
  const handleLogout = () => {
    dispatch(logOutUser());
    queryClient.clear();
    //@ts-ignore
    navigation.reset({index: 0, routes: [{name: SCREEN_NAME.auth}]});
  };

  //handle update email function
  const handleChangePassword = async (params: any) => {
    const payload = JSON.stringify({
      old_password: params.oldPassword,
      new_password: params.newPassword,
    });

    //@ts-ignore
    await changePasswordMutation.mutateAsync(payload, {
      onSuccess: (data, variables, context) => {
        handleLogout();
      },
    });
  };

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <HeaderNextBtn
            btnText="Reset"
            handlePres={() => {
              //@ts-ignore
              submitRef.current.handleSubmit();
            }}
          />
        );
      },
    });
  }, []);

  if (changePasswordMutation.isLoading) {
    return <Loader />;
  }
  if (changePasswordMutation.isError) {
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={InitialPasswordvalue}
        validationSchema={ValidationShema}
        //@ts-ignore
        innerRef={submitRef}
        onSubmit={values => handleChangePassword(values)}>
        {({
          values: {oldPassword, newPassword, confirmPassword},
          errors,
          handleChange,
          touched,
          handleSubmit,
        }) => {
          return (
            <>
              <View style={styles.card}>
                <View style={[globalStyles.addedBorder, styles.textConatiner]}>
                  <Text style={styles.textStyle}>Enter old Pasword</Text>
                  {errors.oldPassword && touched.oldPassword && (
                    <Text
                      style={styles.errorText}>{`${errors.oldPassword}`}</Text>
                  )}
                </View>

                <View>
                  <Input
                    style={styles.inputStyle}
                    textStyle={styles.textStyle}
                    // @ts-ignore
                    value={oldPassword}
                    secureTextEntry={true}
                    placeholder="old Password"
                    placeholderTextColor="#C7C7CC"
                    selectionColor={'#3525E6'}
                    keyboardType="default"
                    onChangeText={handleChange('oldPassword')}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <View style={[globalStyles.addedBorder, styles.textConatiner]}>
                  <Text style={styles.textStyle}>New Password</Text>
                  {errors.newPassword && touched.newPassword && (
                    <Text
                      style={styles.errorText}>{`${errors.newPassword}`}</Text>
                  )}
                </View>

                <View>
                  <Input
                    style={styles.inputStyle}
                    textStyle={styles.textStyle}
                    value={newPassword}
                    placeholder="New Password"
                    placeholderTextColor="#C7C7CC"
                    selectionColor={'#3525E6'}
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={handleChange('newPassword')}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <View style={[globalStyles.addedBorder, styles.textConatiner]}>
                  <Text style={styles.textStyle}>Confirm Password</Text>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text
                      style={
                        styles.errorText
                      }>{`${errors.confirmPassword}`}</Text>
                  )}
                </View>

                <View>
                  <Input
                    style={styles.inputStyle}
                    textStyle={styles.textStyle}
                    value={confirmPassword}
                    placeholder="Confirm password"
                    placeholderTextColor="#C7C7CC"
                    selectionColor={'#3525E6'}
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={handleChange('confirmPassword')}
                  />
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default ResetPassword;
