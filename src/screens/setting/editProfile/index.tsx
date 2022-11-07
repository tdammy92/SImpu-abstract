import React, {useState, useEffect, useRef} from 'react';
import {Text, Input, Avatar} from '@ui-kitten/components';
import {
  Image,
  Pressable,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// import mime from "mime";
import styles from './styles';
import {globalStyles} from 'src/styles';
import CameraIcon from '../../../assets/images/camera.svg';
import FloatLabel from 'src/components/common/FloatLabel';
import ArrowRight from '../../../assets/images/Arrow_Right.svg';
import {MainStackParamList, SCREEN_NAME} from 'src/navigation/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {addUser, updateUser, logOutUser} from 'src/store/user/userReducer';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Avatar as avatar} from 'src/constants/general';
import {useDispatch, useSelector} from 'react-redux';

import BottomSheet from 'src/components/common/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreState} from 'src/@types/store';
import {DEMO_API, SECERET_KEY} from '@env';
import {updateProfile} from 'src/services/profile';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';
// const mime = require('mime');

interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.settings> {}

const EditProfile = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const {profile: user, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {setOptions} = useNavigation();
  const {navigation} = props;
  const [firstName, setFirstName] = useState<string>(user?.first_name);
  const [lastName, setLastName] = useState<string>(user?.last_name);

  //update user profile
  const profileUpdate = useMutation(
    value =>
      updateProfile(value, {Auth: token, organisationId: organisation.id}),
    {},
  );

  const bottomSheetRef = useRef<any>(null);

  //open camera code
  const Snap = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(image => {
        if (image.sourceURL) {
          updateImage(image.sourceURL);
          closeSheet();
        }
      })
      .catch(err => {
        console.log(err);
        closeSheet();
      });
  };

  //open gallery code
  const Gallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      // includeBase64: false,
      mediaType: 'photo',
    })
      .then(image => {
        if (image) {
          updateImage(image);

          closeSheet();
        }
      })
      .catch(err => {
        console.log(err);
        closeSheet();
      });
  };

  //function to handle update image
  const updateImage = async (image: any) => {
    // const imagePath= Platform.OS==='android'? image.path : image.sourceURL;
    // const imageType = mime.getType(imagePath);

    let imageupload = new FormData();

    imageupload.append('image', {
      uri: image.path,
      type: image.mime,
      name: image.filename,
    });

    try {
      Alert.alert(
        'Update',
        `Profile picture updated successfuly`,
        [
          {
            text: 'Close',
            onPress: () => console.log('cancled'),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log('cancled'),
        },
      );
    } catch (error) {
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
      console.log(error);
    }
  };

  const openSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  const closeSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  //handle update profile name
  const HandleSaveProfile = async () => {
    const payload = JSON.stringify({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      purpose: '',
      onboard_role: '',
      onboard_stage: '',
    });

    //@ts-ignore
    const profileupdate = await profileUpdate.mutateAsync(payload);

    console.log(profileupdate);
  };

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return <HeaderNextBtn btnText="Done" handlePres={HandleSaveProfile} />;
      },
    });
  }, [firstName, lastName]);

  return (
    <>
      <View style={styles.container}>
        <View style={[globalStyles.rowBetween, styles.profileContainer]}>
          <Pressable onPress={openSheet}>
            <View style={styles.overLay}>
              <Avatar
                style={styles.imageStyle}
                size="giant"
                source={{uri: user?.image || avatar}}
              />
              <View style={styles.cameraStyle}>
                <CameraIcon />
              </View>
            </View>
          </Pressable>

          <View style={styles.inputContainer}>
            <View style={globalStyles.addedBorder}>
              <Input
                style={styles.inputStyle}
                textStyle={styles.textStyle}
                value={firstName}
                placeholderTextColor="#C7C7CC"
                placeholder="First Name"
                selectionColor={'#3525E6'}
                keyboardType="default"
                onChangeText={nextValue => setFirstName(nextValue)}
              />
            </View>
            <View>
              <Input
                style={styles.inputStyle}
                textStyle={styles.textStyle}
                value={lastName}
                placeholder="Last Name"
                placeholderTextColor="#C7C7CC"
                selectionColor={'#3525E6'}
                keyboardType="default"
                onChangeText={nextValue => setLastName(nextValue)}
              />
            </View>
          </View>
        </View>
        <Text style={styles.nameText}>
          Enter your name and add an optional profile photo.
        </Text>
        <View style={styles.card}>
          {/* <FloatLabel
            onPress={() => navigation.navigate(SCREEN_NAME.changePhoneNumber)}
            text2={
              user?.country_code || user?.phone
                ? `+${user?.country_code || ''}${user?.phone || ''}`
                : 'Nil'
            }
            icon2={<ArrowRight />}
            text="Change Number"
          /> */}

          <FloatLabel
            border
            // onPress={() => navigation.navigate(SCREEN_NAME.changeEmail)}
            // text2=""
            text2={`${user?.email || ''}`}
            // icon2={<ArrowRight />}
            text="Email"
          />
          {/* <FloatLabel
          border
          text2={`${user?.email || ''}`}
          // icon2={<ArrowRight />}
          text="Username"
        /> */}
        </View>
        {/* <View style={styles.card}>
          <FloatLabel
            onPress={() => navigation.navigate(SCREEN_NAME.changeEmail)}
            // text2=""
            text2={`${user?.email || ''}`}
            icon2={<ArrowRight />}
            text="Change Email"
          />
          <FloatLabel
          border
          text2=""
          icon2={<ArrowRight />}
          text="Change Email Address"
        />
        </View> */}
        <View style={styles.card}>
          <FloatLabel
            onPress={() => navigation.navigate(SCREEN_NAME.resetPassword)}
            // text2=""
            // text2={`${user?.email || ''}`}
            icon2={<ArrowRight />}
            text="Change Password"
          />
        </View>

        {/* <Pressable onPress={handleLogout}>
          <View style={[styles.card, globalStyles.rowCenter]}>
            <Text style={styles.logOut}>Logout</Text>
          </View>
        </Pressable> */}

        <BottomSheet Gallery={Gallery} Snap={Snap} ref={bottomSheetRef} />
      </View>
    </>
  );
};

export default EditProfile;
