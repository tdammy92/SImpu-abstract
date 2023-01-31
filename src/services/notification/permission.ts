import {
  check,
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
  checkNotifications,
} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';

export const requestPermissions = () => {
  if (Platform.OS === 'ios') {
    return;
  } else {
    //check permission for storage, camera and media
    checkMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]).then(statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
          RESULTS.DENIED ||
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
          RESULTS.DENIED ||
        statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED ||
        statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.DENIED
      ) {
        // console.log('all was denied');
        requestMultiple([
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        ]).then(statuses => {
          // console.log(
          //   'External Storage',
          //   statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
          // );
          // console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
          // console.log('Media', statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]);
        });
      }
    });

    //check notification permission
    // checkNotifications()
    //   .then(({status, settings}) => {
    //     // …
    //     if (status === RESULTS.GRANTED) return;

    //     if (status === RESULTS.UNAVAILABLE) {
    //       Alert.alert(
    //         'Error',
    //         'Kindly note that notification is not supported on your device',
    //         [
    //           {
    //             text: 'Cancel',
    //             onPress: () => console.log('Cancel Pressed'),
    //             style: 'cancel',
    //           },
    //         ],
    //       );
    //     }

    //     //check if status id denied previously, request again
    //     if (status === RESULTS.DENIED) {
    //       requestNotifications(['alert', 'sound', 'badge'])
    //         .then(({status, settings}) => {})
    //         .catch(err => {});
    //     }

    //     //    console.log('notification checker', status);
    //     //    console.log('notification settings', settings);
    //   })
    //   .catch(err => console.log(err));
  }
};
