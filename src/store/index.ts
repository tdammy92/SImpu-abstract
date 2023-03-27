import storage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {Middleware, combineReducers} from 'redux';
// import createFlipperDebug from 'redux-flipper';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import {StoreState} from 'src/@types/store';

import userSlice from 'src/store/user/userReducer';
import inboxSlice from 'src/store/inbox/reducer';
import loadingSlice from './Loader';
import organisationSlice from 'src/store/organisation/organisationReducer';
import deviceSlice from 'src/store/device/deviceReducer';
import replySlice from 'src/store/reply/replyReducer';
import forwardSlice from './forward/forwardReducer';
import messageSlice from './message/message';
import filterMessageSlice from './search/filterMessageReducer';

export const reducers = combineReducers<StoreState>({
  user: userSlice,
  device: deviceSlice,
  inbox: inboxSlice,
  organisation: organisationSlice,
  loader: loadingSlice,
  reply: replySlice,
  forward: forwardSlice,
  message: messageSlice,
  filterMessageBy: filterMessageSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['loader', 'reply', 'forward', 'message', 'filterMessageBy'],
};

const middlewares: Middleware[] = [
  /* other middlewares */
];

// if (__DEV__ && !process.env.JEST_WORKER_ID) {
//   middlewares.push(createFlipperDebug());
// }

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

// export const persistor = persistStore(store);

export type StoreDispatch = typeof store.dispatch;

export const persistor = persistStore(store, {}, () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const state = store.getState() as StoreState;
  //   if (state.session.user?.phone) {
  //     setUserPhone(state.session.user.phone);
  //   }

  //   if (state.session.user?.email) {
  //     UserLeap.setEmailAddress(state.session.user?.email);
  //   }

  //   const token = getToken(state);
  //   if (token && token.accessToken) {
  //     setApiToken(token.accessToken);
  //   }
});
