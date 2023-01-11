import {deviceStore, deviceType} from './../../@types/profile';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const deviceSlice = createSlice({
  name: 'Device',
  initialState,
  reducers: {
    addDevice: (state: deviceStore, {payload}: PayloadAction<deviceType>) => {
      state.details = payload;
    },

    removeDevice: (
      state: deviceStore,
      {payload}: PayloadAction<deviceType>,
    ) => {
      state.details = payload;
    },
  },
});

export const {addDevice, removeDevice} = deviceSlice.actions;

export default deviceSlice.reducer;
