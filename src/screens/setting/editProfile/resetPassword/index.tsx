import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
// import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import FloatLabel from 'src/components/common/FloatLabel';
import {globalStyles} from 'src/styles';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {updateUser} from 'src/store/user/userReducer';
// import {Spinner} from '@nghinv/react-native-loading';
import {StoreState} from 'src/@types/store';
import {DEMO_API} from '@env';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {setOptions} = useNavigation();
  const user = useSelector((state: StoreState) => state.user.profile);
  // const token = useSelector((state: StoreState) => state.auth.token);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [fetchUserProfile, setfetchUserProfile] = useState(false);

  //handle update email function
  const updateEmail = async () => {
    try {
      // if (updatedMail.status === 200) {
      //   setfetchUserProfile(true);
      //   Alert.alert(
      //     'Update',
      //     `Email updated successfuly`,
      //     [
      //       {
      //         text: 'Close',
      //         onPress: () => console.log('cancled'),
      //       },
      //     ],
      //     {
      //       cancelable: true,
      //       onDismiss: () => console.log('cancled'),
      //     },
      //   );
      // }
    } catch (error) {
      console.log(error);

      Alert.alert(
        'An error occured',
        `${error}`,
        [
          {
            text: 'cancle',
            onPress: () => console.log('cancled'),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log('cancled'),
        },
      );
    }
  };

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <HeaderNextBtn
            btnText="Reset"
            handlePres={() => {
              console.log('Password rest');
            }}
          />
        );
      },
    });
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>Enter old Pasword</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            // @ts-ignore
            value={password.oldPassword}
            placeholder="old Password"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            // onChangeText={text=>setPassword('')}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>New Password</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            value={password.newPassword}
            placeholder="New Password"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            // onChangeText={nextValue => setNewEmail(nextValue)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>Confirm Password</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            value={password.confirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            // onChangeText={nextValue => setNewEmail(nextValue)}
          />
        </View>
      </View>

      {/* <TouchableOpacity onPress={updateEmail}>
        <View
          style={[styles.card, styles.saveContainer, globalStyles.rowCenter]}>
          <Text style={styles.save}>Save</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ResetPassword;
