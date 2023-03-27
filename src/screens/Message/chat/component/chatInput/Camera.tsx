import {
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  PermissionsAndroid,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from 'src/constants';
import {
  getFileType,
  hp,
  messsageToast,
  splitLastOccurrence,
  wp,
} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import RNHeicConverter from 'react-native-heic-converter';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import ImagePicker from 'react-native-image-crop-picker';
import {toFormData, uploadFile} from 'src/services/upload/attchments';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {buildConversationUrl} from 'src/services/api/api-client';
import {sendMessageSocials} from 'src/services/mutations/inbox';
import {useMutation, useQueryClient} from 'react-query';
import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from 'src/Hooks/useIsForeground';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const CameraInput = ({route}: any) => {
  const {threadId, credentialId} = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  // console.log(threadId, credentialId);

  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const [Loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ImageGalary, setImageGalary] = useState([]);
  const [FlipCame, setFlipCamera] = useState<'back' | 'front'>('back');
  const [torch, setorch] = useState<'off' | 'on'>('off');
  const devices = useCameraDevices();

  const [SampleImageUrl, setSampleImageUrl] = useState<string | undefined>('');

  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const device = devices[FlipCame];
  const cameraRef = useRef<Camera>(null);

  //send message mutation
  const sendMessageMutation = useMutation(sendMessageSocials, {
    onSuccess(data, variables, context) {
      //inavlid query conversations
      setLoading(false);
      setProgress(0);
      navigation.goBack();
    },
    onError(error, variables, context) {
      console.log('post message error', error);

      // queryClient.invalidateQueries('conversations');
      //@ts-ignore
      messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });

  // const hasAndroidPermission = useCallback(async () => {
  //   const permission =
  //     Platform.Version >= 33
  //       ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
  //       : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }

  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // }, []);

  const getAllImages = useCallback(async () => {
    CameraRoll.getPhotos({first: 30, assetType: 'Photos'})
      .then(photos => {
        const image = photos?.edges?.map(item => item?.node);
        // setImageGalary(image);
      })
      .catch(err => console.log(err));
  }, []);

  //flip the camera to front || back
  const flipCamera = () => {
    FlipCame === 'back' ? setFlipCamera('front') : setFlipCamera('back');
  };

  //handle torch on || off
  const handleTorch = () => {
    torch === 'off' ? setorch('on') : setorch('off');
  };

  const onProgress = (percentage: number) => {
    // console.log('percatge of the upload', percentage);
    setProgress(percentage);
  };

  //post image to api
  const postImage = async (file: {
    uri: string | undefined;
    type: string | undefined;
    name: string | undefined;
  }) => {
    const data = {type: 'message'};
    const header = {token, organisationId: organisation?.id};
    const url = buildConversationUrl(`upload/${credentialId}`);

    const attachmentId = await uploadFile({
      url,
      file,
      fileName: 'files',
      data,
      header,
      onProgress,
    });

    const mutatePayload = {
      message: {
        // body: '',
        attachment_ids: attachmentId?.upload_ids,
      },
      params: {
        threadId,
        Auth: token,
        organisationId: organisation?.id,
      },
    };
    await sendMessageMutation.mutateAsync(mutatePayload);
  };

  //select image from image picker
  const sendFile = async () => {
    setLoading(true);
    try {
      const res = await ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        forceJpg: true,
      });

      setSampleImageUrl(Platform.OS === 'android' ? res?.path : res?.sourceURL);
      if (res) {
        const file = {
          uri: Platform.OS === 'android' ? res?.path : `file:///${res?.path}`,
          type: getFileType(res?.path),
          name:
            Platform.OS === 'android' ? Date.now().toString() : res?.filename,
        };

        await postImage(file);
      }
    } catch (error) {
      // console.log('file picker catch error', error);
      setLoading(false);
      setProgress(0);
    }
  };

  //select image from camera roll
  const sendPhoto = async (item: any) => {
    console.log('selected Item', JSON.stringify(item, null, 2));
    // setLoading(true);
    // setSampleImageUrl(item?.image?.uri);

    // try {
    if (item) {
      if (Platform.OS === 'ios') {
        RNHeicConverter.convert({path: item?.image?.uri})
          .then((res: any) => console.log('res from converter', res))
          .catch((err: any) => console.log('error from convter', err));
      }

      // const file = {
      //   uri: item?.image?.uri,

      //   type: mime.contentType(item?.image?.filename),
      //   name:
      //     Platform.OS === 'android'
      //       ? Date.now().toString()
      //       : item?.image?.filename,
      // };
      // console.log(
      //   `photo camera roll  ${Platform.OS}`,
      //   JSON.stringify(file, null, 2),
      // );
      // await postImage(file);
    }
    // } catch (error) {
    //   console.log('error from catch block converter', error);
    //   // setLoading(false);
    //   // setProgress(0);
    // }
  };

  //from camera snapp
  const snap = async () => {
    setLoading(true);
    const photo = await cameraRef?.current?.takePhoto({
      // flash: 'on',
    });

    if (photo) {
      setSampleImageUrl(`file://${photo?.path}`);

      const file = {
        uri: `file://${photo?.path}`,
        type: mime.lookup(photo?.path),
        name: splitLastOccurrence(photo?.path, '/'),
      };
      // console.log('photo camera roll', JSON.stringify(file, null, 2));
      await postImage(file);
    }
  };

  useEffect(() => {
    // hasAndroidPermission();
    getAllImages();
  }, []);

  function Reseter() {
    setLoading(false);
    setProgress(0);
    setSampleImageUrl('');
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      // do something
      Reseter();
      // queryClient.invalidateQueries('conversations');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar hidden={true} showHideTransition={'slide'} />

      <View style={[StyleSheet.absoluteFill, {flex: 1}]}>
        {/* camera header component */}
        <View style={styles.cameraHeader}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.headerIconWrapper}>
            <AntDesign name="close" size={hp(25)} color={colors.lightGray} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIconWrapper}
            onPress={handleTorch}>
            <MaterialCommunityIcons
              name={torch === 'on' ? 'flash' : 'flash-off'}
              size={hp(25)}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        </View>
        {device != null && (
          <Camera
            style={{width: DEVICE_WIDTH, height: DEVICE_HEIGHT}}
            device={device}
            isActive={isActive}
            video={false}
            photo={true}
            torch={torch}
            ref={cameraRef}
          />
        )}
        {/* </View> */}

        {/* camera controls */}
        <View
          style={[
            styles.cameraControlsWrapper,
            {
              height:
                ImageGalary?.length > 0
                  ? DEVICE_HEIGHT * 0.12
                  : // ? DEVICE_HEIGHT * 0.18
                    DEVICE_HEIGHT * 0.08,
            },
          ]}>
          {/* {ImageGalary?.length !== 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{}}
              contentContainerStyle={styles.thumbNailContainer}>
              {ImageGalary?.map((item: any, i: number) => {
                return (
                  <TouchableOpacity
                    key={`${i}`}
                    onPress={() => sendPhoto(item)}
                    style={[
                      styles.thumbnail,
                      {marginLeft: i === 0 ? wp(3) : 0},
                    ]}>
                    <Image
                      source={{uri: item?.image?.uri}}
                      style={{
                        height: hp(70),
                        width: hp(60),
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null} */}

          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.CaptureIconWrapper}
              onPress={sendFile}>
              <MaterialCommunityIcons
                name={'image-outline'}
                size={hp(30)}
                color={colors.lightGray}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.CaptureIconWrapper} onPress={snap}>
              <MaterialCommunityIcons
                name={'circle-slice-8'}
                size={hp(65)}
                color={colors.light}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CaptureIconWrapper}
              onPress={flipCamera}>
              <MaterialCommunityIcons
                name={'camera-flip-outline'}
                size={hp(30)}
                color={colors.lightGray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {Loading && SampleImageUrl !== '' && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.6)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Image
            source={{uri: SampleImageUrl}}
            resizeMode="contain"
            style={{height: '100%', width: DEVICE_WIDTH}}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.light} />
          </View>
        </View>
      )}
    </>
  );
};

export default CameraInput;

const styles = StyleSheet.create({
  cameraHeader: {
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  cameraControlsWrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: hp(0),
    left: 0,
    right: 0,
    zIndex: 5,
    elevation: 2,
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingBottom: hp(4),
  },

  thumbNailContainer: {
    padding: 0,
    paddingVertical: hp(5),
  },

  thumbnail: {
    marginRight: wp(2),
  },
  headerIconWrapper: {
    padding: hp(10),
  },

  bottomControls: {
    position: 'absolute',
    paddingHorizontal: wp(15),
    paddingVertical: hp(4),
    width: DEVICE_WIDTH,
    bottom: hp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CaptureIconWrapper: {
    padding: hp(5),
  },
});
