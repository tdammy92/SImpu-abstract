import {organisationStore} from './../../@types/profile';
import {organisation} from '../../@types/profile';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './initial-state';

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    addOrganisation: (
      state: organisationStore,
      {payload}: PayloadAction<organisation>,
    ) => {
      state.details = payload;
    },

    updateOrganisation: (
      state: organisationStore,
      {payload}: PayloadAction<organisation>,
    ) => {
      state.details = payload;
    },

    clearOrganisation: () => {},
  },
});

export const {addOrganisation, updateOrganisation, clearOrganisation} =
  organisationSlice.actions;

export default organisationSlice.reducer;
