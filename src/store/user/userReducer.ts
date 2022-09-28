import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserStore} from 'src/@types/store';
import initialState from './initial-state';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state: UserStore, {payload}: PayloadAction<User>) => {
      state.profile = payload;
      state.isloggedIn = true;
      // state.token=payload.token;
    },

    updateUser: (state: UserStore, {payload}: PayloadAction<User>) => {
      state.profile = payload;
    },

    logOutUser: (state: UserStore) => {
      // state=initialState
      state.isloggedIn = false;
    },
  },
});

export const {addUser, updateUser, logOutUser} = userSlice.actions;

export default userSlice.reducer;
