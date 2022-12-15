import {organisation} from './../../@types/profile';
import {pusher} from 'src/index';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {buildConversationUrl} from '../api/api-client';
import {
  DEMO_API,
  PRODUCTION_API,
  CONVERSATION_API_DEMO,
  INTEGRATIONS_API_DEMO,
  INTEGRATIONS_API_PRODUCTION,
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY_DEMO,
} from '@env';

//pusher configurations
const connect = async (
  token: string,
  organisationID: string,
  profileID: string,
) => {
  try {
    await pusher.init({
      apiKey: PUSHER_APP_KEY_DEMO,
      cluster: PUSHER_APP_CLUSTER,
      authEndpoint: buildConversationUrl(
        `auth/websocket2?token=${token}&organisationID${organisationID}`,
      ),

      onConnectionStateChange,
      onError,
      onEvent,
      onSubscriptionSucceeded,
    });

    await pusher.connect();

    // //subscribe to organisation
    const orgChannelName = `presence-organisation-${organisationID}`;
    const organisationChannel = await pusher.subscribe({
      channelName: orgChannelName,
      onEvent: event => {
        console.log(`org channel event:`, JSON.stringify(event, null, 2));
      },
    });

    // subscribe to live chat
    const liveChatChannelName = `presence-livechat-${organisationID}`;
    const LiveChatChannel = await pusher.subscribe({
      channelName: liveChatChannelName,
      onEvent: event => {
        console.log(`liveChat channel event:`, JSON.stringify(event, null, 2));
      },
    });

    //subscribe to profile
    const userChannelName = `private-profile-${profileID}`;
    const userChannel = await pusher.subscribe({
      channelName: userChannelName,
      onEvent: event => {
        console.log(
          `userChanel channel event:`,
          JSON.stringify(event, null, 2),
        );
      },
    });
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

const onError = (message: string, code: Number, error: any) => {
  console.log(`onError: ${message} code: ${code} exception: ${error}`);
};

const onEvent = async (event: any) => {
  console.log('event como', JSON.stringify(event, null, 2));
  // const thread_id = await JSON.parse(event?.data)?.thread_id;
  // queryClient.invalidateQueries(['threads', `${thread_id}`]);
  // queryClient.invalidateQueries([`${thread_id}`]);
  // console.log('event got to phone', JSON.stringify(thread_id, null, 2));
  // showNotification(event);
};

const onSubscriptionSucceeded = (channelName: string, data: any) => {
  console.log(
    `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(
      data,
      null,
      2,
    )}`,
  );

  const channel: PusherChannel = pusher.getChannel(channelName);
  const me = channel.me;

  console.log('Me from channel', JSON.stringify(me, null, 2));
};

export {connect};
