import React, {useCallback, useEffect, useRef} from 'react';
import {LogBox, Linking, StatusBar, Platform} from 'react-native';

import * as eva from '@eva-design/eva';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './themes/theme.json';

import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ApplicationProvider as UIKittenProvider} from '@ui-kitten/components';
import {Provider} from 'react-redux';
// import {QueryClientProvider, QueryClient} from 'react-query';
import {persistor, store} from 'src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {MainStackParamList} from './navigation/constants';
import {RootStack} from './navigation';
// import Loader from './components/common/Loader';

export default (): JSX.Element => {
  const navigationRef =
    useRef<NavigationContainerRef<MainStackParamList>>(null);
  const routeNameRef = useRef<string>();

  LogBox.ignoreAllLogs();

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, [routeNameRef, navigationRef]);

  // const queryClient = new QueryClient();

  useEffect(() => {
    const init = async () => {
      return true;
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        {/* <QueryClientProvider client={queryClient}> */}
        <IconRegistry icons={[EvaIconsPack]} />
        <PersistGate persistor={persistor}>
          <UIKittenProvider {...eva} theme={{...eva.light, ...theme}}>
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
          </UIKittenProvider>
        </PersistGate>
        {/* </QueryClientProvider> */}
      </Provider>
    </>
  );
};
