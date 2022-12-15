import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resquestFcmPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //     console.log('Auth status', authStatus);

    getFcmToken();
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');

  //   console.log('old fcm token generated', fcmToken);

  if (!fcmToken) {
    try {
      const newfcmToken = await messaging().getToken();
      if (newfcmToken) {
        //    console.log('new fcm token generated', newfcmToken);
        AsyncStorage.setItem('fcmToken', newfcmToken);
      }
    } catch (error) {
      console.log('get token error', error);
    }
  }
};
