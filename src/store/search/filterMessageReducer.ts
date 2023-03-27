import {FilterMesageStore} from './../../@types/store';

import {filterType} from '../../@types/inbox';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const filterMessageType = createSlice({
  name: 'filterMessageBy',
  initialState,
  reducers: {
    addSelectedFilter: (
      state: FilterMesageStore,
      {payload}: PayloadAction<filterType>,
    ) => {
      // state.reply = payload;
      state.selectedFilter = payload;
    },

    removeSelectedFilter: (state: FilterMesageStore) => {
      state.selectedFilter = null;
      // state.replyIsActive = false;
    },
  },
});

export const {addSelectedFilter, removeSelectedFilter} =
  filterMessageType.actions;

export default filterMessageType.reducer;
