import {messageType} from './../../@types/inbox';
import {messageStoreState} from './../../@types/store';
import {replyStoreState} from '../../@types/store';
import {replyType} from '../../@types/inbox';
import {deviceStore, deviceType} from '../../@types/profile';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const messagSlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    setMessage: (state: messageStoreState, {payload}: PayloadAction<any>) => {
      state.message = payload.message;
      state.messageType = payload.messageType;
      state.receiver = payload.receiver;
    },

    removeMessage: (state: messageStoreState) => {
      state.message = undefined;
      state.messageType = 'reply';
      state.receiver = '';
    },
  },
});

export const {setMessage, removeMessage} = messagSlice.actions;

export default messagSlice.reducer;
