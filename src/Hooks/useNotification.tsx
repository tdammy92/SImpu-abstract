import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Notifications,
  NotificationAction,
  NotificationCategory,
  NotificationBackgroundFetchResult,
  Notification,
} from 'react-native-notifications';
import {useNavigation} from '@react-navigation/native';
import {
  removeEmoji,
  removeHtmlTags,
  trimText,
} from 'src/utils/string-utils/string';
import {messgeTimeFormater} from 'src/utils/date-utils/date';
import {SCREEN_NAME} from 'src/navigation/constants';
import {useQueryClient} from 'react-query';

export default function useNotification() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openedNotifications, setOpenedNotifications] = useState<
    Notification[]
  >([]);

  const registerNotificationEvents = () => {
    requestPermissionsIos({
      providesAppNotificationSettings: true,
      provisional: true,
      carPlay: true,
      criticalAlert: true,
    });
    requestPermissions();
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('notification received', notification);
        // setNotifications([...notifications, notification]);
        completion({
          alert: notification.payload.showAlert,
          sound: false,
          badge: false,
        });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('notification opened', notification);
        // setOpenedNotifications([notification, ...openedNotifications]);
        // queryClient.invalidateQueries('threads');
        // handleNotification(notification);
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('notification background', notification);
        completion(NotificationBackgroundFetchResult.NO_DATA);
      },
    );

    if (Platform.OS === 'ios') {
      Notifications.ios.events().appNotificationSettingsLinked(() => {
        console.warn('App Notification Settings Linked');
      });
    }
  };

  const requestPermissionsIos = (options: any) => {
    Notifications.ios.registerRemoteNotifications(
      options,
      // Object.fromEntries(options.map((opt: any) => [opt, true])),
    );
  };

  const requestPermissions = () => {
    Notifications.registerRemoteNotifications();
  };

  //navigate to thread based on chanel type
  const handleNavigate = (threadDetails: any) => {
    if (threadDetails.channelType === 'email') {
      console.log('mail');
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.mail as never, {threadDetails});
    } else {
      console.log('chat');
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.chat as never, {threadDetails});
    }
  };

  //this will handle the notification when clicked.
  const handleNotification = (data: any) => {
    const message = data?.payload?.userInfo?.message;

    console.log('notification was opened', JSON.stringify(message, null, 2));

    //formated data
    const threadDetails = {
      name1: trimText(
        message?.author?.platform_name ?? message?.author?.platform_nick,
        20,
      ),
      name2: removeEmoji(
        message?.author?.platform_name ?? message?.author?.platform_nick,
      ),
      // date: messgeTimeFormater(item?.updated_datetime),
      image: message?.author?.image_url,
      // message: !!item?.subject
      //   ? trimText(removeHtmlTags(item?.subject), 45)
      //   : trimText(removeHtmlTags(item?.last_message?.entity?.content?.body), 45),
      channelType: message?.author?.channel_name,
      uuid: message?.thread_id,
      ...message,
    };

    handleNavigate(threadDetails);
  };

  useEffect(() => {
    registerNotificationEvents();
    return () => {};
  }, []);

  return {};
}

const styles = StyleSheet.create({});
