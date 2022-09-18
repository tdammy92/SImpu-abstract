import {Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';

export enum SCREEN_NAME {
  onboard = 'app.screen.onboard',
  auth = 'app.screen.auth',
  welcome = 'app.screen.auth.welcome',
  profile = 'app.screen.auth.profile',
  social = 'app.screen.social',
  assigned = 'app.screen.assigned',
  unassigned = 'app.screen.unassigned',
  mentions = 'app.screen.mentions',
  closed = 'app.screen.closed',
  draft = 'app.screen.draft',
  teaminbox = 'app.screen.teaminbox',
  search = 'app.screen.search',
  notification = 'app.screen.notification',
  main = 'app.screen.main',
  settings = 'app.screen.settings',
  editprofile = 'app.screen.editprofile',
  changePhoneNumber = 'app.screen.changephonenumber',
  changeEmail = 'app.screen.changeemail',
  privacy = 'app.screen.privacy',
  datastorage = 'app.screen.datastorage',
  quickreplies = 'app.screen.quickreplies',
  chat = 'app.screen.chat',
}

export type MainStackParamList = {
  [SCREEN_NAME.onboard]: undefined;
  [SCREEN_NAME.auth]: undefined;
  [SCREEN_NAME.search]: undefined;
  [SCREEN_NAME.notification]: undefined;
  [SCREEN_NAME.welcome]: undefined;
  [SCREEN_NAME.assigned]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.closed]: undefined;
  [SCREEN_NAME.draft]: undefined;
  [SCREEN_NAME.mentions]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.teaminbox]: undefined;
  [SCREEN_NAME.profile]: undefined;
  [SCREEN_NAME.main]: undefined;
  [SCREEN_NAME.settings]: undefined;
  [SCREEN_NAME.chat]: {user: any};
  // [SCREEN_NAME.chat]: {
  //   name: string;
  //   channel: string;
  //   avatar: string;
  //   threadId: string;
  //   chat: []; //remove line when making api calls
  // };

  [SCREEN_NAME.editprofile]: undefined;
  [SCREEN_NAME.changePhoneNumber]: undefined;
  [SCREEN_NAME.changeEmail]: undefined;
  [SCREEN_NAME.privacy]: undefined;
  [SCREEN_NAME.datastorage]: undefined;
  [SCREEN_NAME.quickreplies]: undefined;
};
export type SocialScreenRouteProp = RouteProp<MainStackParamList>;

export const isLargeScreen = Dimensions.get('window').height > 700;
