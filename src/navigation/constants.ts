import {Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';

export enum SCREEN_NAME {
  onboarding = 'app.screen.onboard',
  auth = 'app.screen.auth',
  welcome = 'app.screen.auth.welcome',
  unassigned = 'app.screen.unassigned',
  main = 'app.screen.main',
}

export type MainStackParamList = {
  [SCREEN_NAME.onboarding]: undefined;
  [SCREEN_NAME.auth]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.main]: undefined;
};
export type SocialScreenRouteProp = RouteProp<MainStackParamList>;

export const isLargeScreen = Dimensions.get('window').height > 700;
