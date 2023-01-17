import {replyStoreState} from './../../@types/store';
import {replyType} from './../../@types/inbox';
import {deviceStore, deviceType} from './../../@types/profile';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const replySlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    addReply: (state: replyStoreState, {payload}: PayloadAction<replyType>) => {
      state.reply = payload;
      state.replyIsActive = true;
    },

    removeReply: (state: replyStoreState) => {
      state.reply = null;
      state.replyIsActive = false;
    },
  },
});

export const {addReply, removeReply} = replySlice.actions;

export default replySlice.reducer;
