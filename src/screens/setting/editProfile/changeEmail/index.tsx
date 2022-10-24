import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
// import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import FloatLabel from 'src/components/common/FloatLabel';
import {globalStyles} from 'src/styles';
import styles from './styles';
import {updateUser} from 'src/store/user/userReducer';
// import {Spinner} from '@nghinv/react-native-loading';
import {StoreState} from 'src/@types/store';
import {DEMO_API} from '@env';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';

const ChangeEmail = () => {
  const {setOptions} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user.profile);
  // const token = useSelector((state: StoreState) => state.auth.token);
  const [newEmail, setNewEmail] = useState('');
  const [fetchUserProfile, setfetchUserProfile] = useState(false);

  //handle update email function
  const updateEmail = async () => {
    const payload = JSON.stringify({email: newEmail});

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

  // if (profile.isError) {
  //   Spinner.hide();

  //   Alert.alert(
  //     'An error occured',
  //     `${profile.error}`,
  //     [
  //       {
  //         text: 'cancle',
  //         onPress: () => console.log('cancled'),
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //       onDismiss: () => console.log('cancled'),
  //     },
  //   );
  // }

  // if (profile.isSuccess) {
  //   dispatch(updateUser(profile?.data?.data?.profile));
  //   Spinner.hide();
  //   //  setfetchUserProfile(false)
  // }

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <HeaderNextBtn
            btnText="Save"
            handlePres={() => {
              console.log('saved email');
            }}
          />
        );
      },
    });
  }, [newEmail]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>Old email</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={[styles.textStyle, {color: '#A5ACB8'}]}
            // @ts-ignore
            value={user.email}
            placeholder="old email"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            disabled={true}
            // onChangeText={nextValue => setOldPassword(nextValue)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>New email</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            value={newEmail}
            placeholder="Enter new email"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            onChangeText={nextValue => setNewEmail(nextValue)}
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

export default ChangeEmail;
