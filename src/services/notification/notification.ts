import PushNotification, {Importance} from 'react-native-push-notification';
import {removeHtmlTags, trimText} from 'src/utils/string-utils/string';
import {Notifications} from 'react-native-notifications';
import {Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {client, buildNotificationURL} from '../api/api-client';

import {
  DEMO_API,
  PRODUCTION_API,
  CONVERSATION_API_DEMO,
  INTEGRATIONS_API_DEMO,
  INTEGRATIONS_API_PRODUCTION,
} from '@env';
import {registerDeviceNotification} from '../query/notification';
import {requestNotificationType} from 'src/@types/inbox';

const registerNotification = async (params: requestNotificationType) => {
  console.log('notification endpoint was called', params);

  try {
    await registerDeviceNotification(params);
  } catch (error) {
    console.log('error from Simpu notification Api', error);
  }
};

// const showNotification = ({data}: any) => {
//   const formatedData = JSON.parse(data)?.messages;
//   const message = formatedData[0];
//   const file = message?.entity?.has_attachment;

//   console.log('*******************************************');
//   console.log(JSON.stringify(message, null, 2));
//   console.log('*******************************************');

//   // let localNotification = Notifications.postLocalNotification({
//   //   title: message?.author?.name ?? message?.author?.platform_name,
//   //   body:
//   //     trimText(removeHtmlTags(message?.entity?.content?.body), 20) ??
//   //     (file && '📄'),
//   //   sound: '',
//   //   //@ts-ignore
//   //   silent: 'false',
//   //   category: 'SimpuGo',
//   //   userInfo: {message},
//   //   fireDate: new Date(),
//   // });

//   // PushNotification.localNotification({
//   //   // channelId: 'SimpuGo',
//   //   channelId: message?.thread_id,
//   //   title: message?.author?.name ?? message?.author?.platform_name,
//   //   message:
//   //     trimText(removeHtmlTags(message?.entity?.content?.body), 20) ??
//   //     (file && '📄'),
//   //   largeIcon: message?.author?.image_url ?? 'ic_launcher',
//   //   invokeApp: true,
//   //   playSound: true, // (optional) default: true
//   //   soundName: 'default',
//   //   userInfo: message,
//   // });
// };

export {registerNotification};
