import {organisation} from 'src/@types/profile';
import {StoreState} from 'src/@types/store';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useQueryClient} from 'react-query';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

import {pusher} from '../index';

export const useInboxWebsocket = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {profile} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const organisation_id = organisation?.id ?? '';
  const profile_id = profile?.id;

  useEffect(() => {
    if (!(organisation_id && profile_id && pusher)) {
      return;
    }

    // subscribeToPusher();
  }, [organisation_id, profile_id, pusher]);
};
