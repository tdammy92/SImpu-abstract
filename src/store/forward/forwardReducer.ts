import {forwardStoreState} from './../../@types/store';
import {replyStoreState} from '../../@types/store';
import {replyType} from '../../@types/inbox';
import {deviceStore, deviceType} from '../../@types/profile';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const forwardSlice = createSlice({
  name: 'forward',
  initialState,
  reducers: {
    addToForward: (
      state: forwardStoreState,
      {payload}: PayloadAction<replyType>,
    ) => {
      state.forward = payload;
      state.forwardIsActive = true;
    },

    removeForward: (state: forwardStoreState) => {
      state.forward = null;
      state.forwardIsActive = false;
    },
  },
});

export const {addToForward, removeForward} = forwardSlice.actions;

export default forwardSlice.reducer;
