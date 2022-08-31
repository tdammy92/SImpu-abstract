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
import {Spinner, LoadingView} from '@nghinv/react-native-loading';
import {BaseUrl} from 'src/services/api/BaseApi';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Avatar as avatar} from 'src/constants/general';
import {useDispatch, useSelector} from 'react-redux';

import BottomSheet from 'src/components/common/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreState} from 'src/@types/store';
import {DEMO_API, SECERET_KEY} from '@env';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';
const mime = require('mime');

interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.settings> {}

// const formatedImage=(photo:any,body={}  as any)=>{

//   const data = new FormData();

//   console.log(photo);

//   data.append(
//     'image',{
//       name:photo.filename,
//       type:photo.mime,
//       uri:photo.path
//     }
//   );

//   Object.keys(body).forEach((key)=>{
//     data.append(key,body[key]);
//   })

//   return data
// }

const EditProfile = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user.profile);
  const token = useSelector((state: StoreState) => state.auth.token);

  const {setOptions} = useNavigation();
  const {navigation} = props;
  const [firstName, setFirstName] = useState<string>(user?.first_name);
  const [lastName, setLastName] = useState<string>(user?.last_name);

  const bottomSheetRef = useRef<any>(null);

  const axiosConfig: any = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`,
      organisationID: `${user?.organisation_id}`,
    },
  };

  const axiosImageConfig: any = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `${token}`,
      organisationID: `${user?.organisation_id}`,
    },
  };

  const savePhoto = async (payload: any) =>
    axios
      .post(`${DEMO_API}/profile/save_image`, payload, axiosImageConfig)
      .then(res => res.data);

  const saveProfile = async (payload: any) =>
    axios
      .patch(`${DEMO_API}/profile/save`, payload, axiosConfig)
      .then(res => res.data);

  const photoUpdate = useMutation(savePhoto);
  const profileUpdate = useMutation(saveProfile);

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
    Spinner.show({indicatorColor: 'gray'});

    // const imagePath= Platform.OS==='android'? image.path : image.sourceURL;
    // const imageType = mime.getType(imagePath);

    let imageupload = new FormData();

    imageupload.append('image', {
      uri: image.path,
      type: image.mime,
      name: image.filename,
    });

    // console.log(JSON.stringify(imageupload));
    // console.log(imageupload);

    try {
      const photo = await photoUpdate.mutateAsync(imageupload);

      dispatch(updateUser(photo?.data?.profile));
      Spinner.hide();

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
      Spinner.hide();

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
    //uncomment when making api calls
    // Spinner.show({indicatorColor: 'gray'});
    // const payload = JSON.stringify({
    //   first_name: firstName.trim(),
    //   last_name: lastName.trim(),
    //   country_code: `${user.country_code}`,
    //   phone: `${user.phone}`,
    // });
    // try {
    //   const profileupdate = await profileUpdate.mutateAsync(payload);
    //   dispatch(updateUser(profileupdate?.data?.profile));
    //   Spinner.hide();
    //   Alert.alert(
    //     'Update',
    //     `Name updated`,
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
    // } catch (error) {
    //   Spinner.hide();
    //   Alert.alert(
    //     'An error occured',
    //     `${error}`,
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
    //   console.log(error);
    // }
  };

  //handle logout function
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout?',
      'Are you sure you want to logout ?',
      [
        {
          text: 'cancle',
          onPress: () => console.log('cancled logot '),
        },
        {
          text: 'yes',
          onPress: () => {
            dispatch(logOutUser()),
              navigation.reset({index: 0, routes: [{name: SCREEN_NAME.login}]});
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('cancled'),
      },
    );
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
          <FloatLabel
            // onPress={() => navigation.navigate(SCREEN_NAME.changePhoneNumber)}
            text2={`${user?.country_code || ''}${user?.phone || ''}`}
            icon2={<ArrowRight />}
            text="Change Number"
          />
          {/* <FloatLabel
          border
          text2={`${user?.email || ''}`}
          // icon2={<ArrowRight />}
          text="Username"
        /> */}
        </View>
        <View style={styles.card}>
          <FloatLabel
            onPress={() => navigation.navigate(SCREEN_NAME.changeEmail)}
            // text2=""
            text2={`${user?.email || ''}`}
            icon2={<ArrowRight />}
            text="Change Email"
          />
          {/* <FloatLabel
          border
          text2=""
          icon2={<ArrowRight />}
          text="Change Email Address"
        /> */}
        </View>

        <Pressable onPress={handleLogout}>
          <View style={[styles.card, globalStyles.rowCenter]}>
            <Text style={styles.logOut}>Logout</Text>
          </View>
        </Pressable>

        <BottomSheet Gallery={Gallery} Snap={Snap} ref={bottomSheetRef} />
      </View>
    </>
  );
};

export default EditProfile;
