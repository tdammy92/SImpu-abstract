import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {user, Profile, UserStore} from 'src/@types/store';
import initialState from './initial-state';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state: UserStore, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },

    addProfile: (state: UserStore, {payload}: PayloadAction<Profile>) => {
      state.profile = payload;
      state.isloggedIn = true;
      state.onFirstLaunch = true;
    },

    addUser: (state: UserStore, {payload}: PayloadAction<user>) => {
      state.user = payload;
    },

    updateProfile: (state: UserStore, {payload}: PayloadAction<Profile>) => {
      state.profile = payload;
    },

    updateImage: (state: UserStore, {payload}: PayloadAction<string>) => {
      state.profile.image = payload;
    },

    logOutUser: (state: UserStore) => {
      // state=initialState
      state.isloggedIn = false;
    },
  },
});

export const {
  addToken,
  addUser,
  updateImage,
  addProfile,
  updateProfile,
  logOutUser,
} = userSlice.actions;

export default userSlice.reducer;
