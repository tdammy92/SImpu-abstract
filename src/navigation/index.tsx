import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStackParamList, SCREEN_NAME} from './constants';
import {useQueryClient} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import RNBeep from 'react-native-a-beep';

//screens
import Login from 'src/screens/Auth';
import Unassigned from 'src/screens/Message';
import Onboarding from 'src/screens/onbording';

//redux
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';

//pusher imports
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {buildConversationUrl} from 'src/services/api/api-client';
import useNotification from 'src/Hooks/useNotification';
import Loader from 'src/components/common/Loader';

const Stack = createNativeStackNavigator<MainStackParamList>();

import {pusher} from 'src/index';
import {PUSHER_APP_CLUSTER, PUSHER_APP_KEY_DEMO} from '@env';

//Root navigators
export const RootStack = (): JSX.Element => {
  //store
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const {profile, token, isloggedIn, onFirstLaunch} = useSelector(
    (state: StoreState) => state.user,
  );
  const queryClient = useQueryClient();
  useNotification();

  //pusher configurations starts here
  const connect = async () => {
    try {
      await pusher.init({
        apiKey: PUSHER_APP_KEY_DEMO,
        cluster: PUSHER_APP_CLUSTER,
        authEndpoint: buildConversationUrl(
          `auth/websocket2?token=${token}&organisationID${organisation.id}`,
        ),

        onConnectionStateChange,
        onError,
        onEvent,
        onSubscriptionSucceeded,
      });

      // //subscribe to organisation
      const orgChannelName = `presence-organisation-${organisation?.id}`;
      const organisationChannel = await pusher.subscribe({
        channelName: orgChannelName,
        onEvent: event => {
          console.log(`org channel event:`, JSON.stringify(event, null, 2));
        },
      });

      // subscribe to live chat
      const liveChatChannelName = `presence-livechat-${organisation?.id}`;

      const LiveChatChannel = await pusher.subscribe({
        channelName: liveChatChannelName,
        onEvent: event => {
          console.log(
            `liveChat channel event:`,
            JSON.stringify(event, null, 2),
          );
        },
      });

      //subscribe to profile
      const userChannelName = `private-profile-${profile?.id}`;
      const userChannel = await pusher.subscribe({
        channelName: userChannelName,
        onEvent: event => {
          console.log(
            `userChanel channel event:`,
            JSON.stringify(event, null, 2),
          );
        },
      });

      await pusher.connect();
    } catch (error) {
      console.log('This is pusher error', error);
    }
  };

  const onConnectionStateChange = (
    currentState: string,
    previousState: string,
  ) => {
    console.log(
      `onConnectionStateChange. previousState=${previousState} newState=${currentState}`,
    );
  };

  const onError = (message: string, code: Number, error: any) => {};

  const onEvent = async (event: any) => {
    const data = await JSON.parse(event?.data);
    const eventName = await event?.eventName;

    if (eventName === 'message_new') {
      RNBeep?.beep();
      // RNBeep.PlaySysSound(1);
      await queryClient.invalidateQueries('conversations');
      await queryClient.invalidateQueries('threads');
      await queryClient.invalidateQueries('filters-unread-count');
    }

    await queryClient.invalidateQueries('notifications-outline');
  };

  const onSubscriptionSucceeded = async (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(
        data,
        null,
        2,
      )}`,
    );

    const channel: PusherChannel = pusher.getChannel(channelName);
    const me = channel.me;
  };

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, []);

  //effect to connect to pusher only when user login or changes organisation
  useEffect(() => {
    if (!!token && !!organisation?.id && isloggedIn) {
      connect();
    }
  }, [token, organisation?.id, profile?.id]);

  return (
    <>
      <Loader />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          !onFirstLaunch
            ? SCREEN_NAME.onboarding
            : isloggedIn
            ? SCREEN_NAME.main
            : SCREEN_NAME.auth
        }>
        <Stack.Screen
          name={SCREEN_NAME.onboarding}
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.auth}
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREEN_NAME.main}
          component={Unassigned}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
