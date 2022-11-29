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
  ActivityIndicator,
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
import {addUser, updateProfile, logOutUser} from 'src/store/user/userReducer';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import BottomSheet from 'src/components/common/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreState} from 'src/@types/store';
import {DEMO_API, SECERET_KEY} from '@env';
import {updateProfiles, updateProfileImage} from 'src/services/query/profile';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';
import {hp} from 'src/utils';
import Loader from 'src/components/common/Loader';
const mime = require('mime');

interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.settings> {}

const EditProfile = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const {setOptions} = useNavigation();
  const {navigation} = props;
  const [firstName, setFirstName] = useState<string>(profile?.first_name);
  const [lastName, setLastName] = useState<string>(profile?.last_name);

  //update user profile
  const profileUpdate = useMutation(
    value =>
      updateProfiles(value, {
        Auth: token,
        organisationId: profile.organisation_id,
      }),
    {},
  );

  //update user profile Image
  const profileImageUpdate = useMutation(
    value =>
      updateProfileImage(value, {
        Auth: token,
        organisationId: profile.organisation_id,
      }),
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
      includeBase64: false,
      mediaType: 'photo',
    })
      .then(image => {
        if (image) {
          updateImage(image);
        }
        closeSheet();
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
      includeBase64: false,
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
    console.log('Selected Image', image);
    const imagePath = Platform.OS === 'android' ? image.path : image.sourceURL;
    const imageType = mime.getType(imagePath);
    const imageName =
      Platform.OS === 'android' ? Date.now().toString() : image.filename;

    // console.log(imagePath, imageType, imageName, 'passed into mutate');

    const imageData = {
      uri: imagePath,
      type: imageType,
      name: imageName,
    };

    let imageupload = new FormData();

    imageupload.append('image', imageData);

    try {
      //@ts-ignore
      await profileImageUpdate.mutateAsync(imageupload, {
        onSuccess: (data, variables, context) => {
          dispatch(updateProfile(data?.profile));
        },
        onError: (error, variables, context) => {
          console.log('from onError', error);
        },
      });
    } catch (error) {}
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
    });

    try {
      //@ts-ignore
      await profileUpdate.mutateAsync(payload, {
        onSuccess: (data, variables, context) => {
          dispatch(updateProfile(data?.profile));
        },
      });
    } catch (error) {}
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
              <UserAvatar
                size={hp(76)}
                style={{height: hp(70), width: hp(70)}}
                borderRadius={hp(70 * 0.5)}
                name={`${profile?.first_name} ${profile?.last_name}`}
                src={profile.image}
              />

              <View style={styles.cameraStyle}>
                {!profileImageUpdate.isLoading ? (
                  <CameraIcon />
                ) : (
                  <ActivityIndicator color={'gray'} size={40} />
                )}
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
            border
            text2={`${profile?.email?.toLowerCase()}`}
            text="Email"
          />
        </View>

        <View style={styles.card}>
          <FloatLabel
            onPress={() => navigation.navigate(SCREEN_NAME.resetPassword)}
            icon2={<ArrowRight />}
            text="Change Password"
          />
        </View>

        <BottomSheet Gallery={Gallery} Snap={Snap} ref={bottomSheetRef} />
      </View>
    </>
  );
};

export default EditProfile;
