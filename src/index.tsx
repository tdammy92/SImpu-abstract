import React, {createRef, useCallback, useEffect, useRef} from 'react';
import {LogBox, Linking, StatusBar, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import {
  DrawerActions,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './themes/theme.json';

import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import FlashMessage from 'react-native-flash-message';

import {ApplicationProvider as UIKittenProvider} from '@ui-kitten/components';
import {Provider} from 'react-redux';
import {QueryClientProvider, QueryClient, focusManager} from 'react-query';
import {persistor, store} from 'src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {MainStackParamList} from './navigation/constants';
import {MenuProvider} from 'react-native-popup-menu';
import {RootStack} from './navigation';

import {requestPermissions} from './services/notification/permission';
import {resquestFcmPermission} from './services/Firebase/firebase';

export const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

export const pusher = Pusher.getInstance();

// const navigationRef =create;

// export const navigationRef = createRef();
// export function openDrawer() {
//   //@ts-ignore
//   navigationRef?.current?.dispatch(DrawerActions.openDrawer());
// }

export default (): JSX.Element => {
  const navigationRef =
    useRef<NavigationContainerRef<MainStackParamList>>(null);

  const routeNameRef = useRef<string>();

  //@ts-ignore
  const ALART_PADDING_TOP = StatusBar.currentHeight * 2;

  LogBox.ignoreAllLogs();

  const onReady = useCallback(() => {
    //please remove ts ignore after testing
    //@ts-ignore
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, [routeNameRef, navigationRef]);

  useEffect(() => {
    const init = async () => {
      return true;
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      requestPermissions();
      resquestFcmPermission();
    });
  }, []);

  console.log('statusbar height', ALART_PADDING_TOP);
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <IconRegistry icons={[EvaIconsPack]} />
            <PersistGate persistor={persistor}>
              <UIKittenProvider {...eva} theme={{...eva.light, ...theme}}>
                <MenuProvider>
                  <>
                    <StatusBar
                      barStyle="dark-content"
                      translucent={true}
                      backgroundColor={'transparent'}
                    />

                    <NavigationContainer ref={navigationRef} onReady={onReady}>
                      <RootStack />
                    </NavigationContainer>
                  </>
                </MenuProvider>
              </UIKittenProvider>
            </PersistGate>
          </QueryClientProvider>
        </Provider>
        <FlashMessage
          statusBarHeight={ALART_PADDING_TOP}
          floating={true}
          position={'center'}
          style={{width: '80%'}}
        />
      </GestureHandlerRootView>
    </>
  );
};
