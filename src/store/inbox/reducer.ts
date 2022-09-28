import { Payload } from './../../services/authService';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InboxStoreState, InboxId,Channel} from 'src/@types/store';
import initialState from './initial-stats';

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    addInboxDetails: (state: InboxStoreState, {payload}: PayloadAction<InboxId>) => {
      state.inbox=payload;
    },
    getAllChannels:(state:InboxStoreState,{payload}:PayloadAction<Channel[]>)=>{
        state.channels=payload
    }

 
  },
});

export const {addInboxDetails} = inboxSlice.actions;

export default inboxSlice.reducer;
