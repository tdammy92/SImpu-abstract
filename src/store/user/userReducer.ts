import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserStore} from 'src/@types/store';
import initialState from './initial-state';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state: UserStore, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },

    addUser: (state: UserStore, {payload}: PayloadAction<User>) => {
      state.profile = payload;
      state.isloggedIn = true;
      state.onFirstLaunch = true;
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

export const {addToken, addUser, updateUser, logOutUser} = userSlice.actions;

export default userSlice.reducer;
