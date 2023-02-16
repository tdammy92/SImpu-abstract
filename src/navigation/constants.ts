import {Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';

export enum SCREEN_NAME {
  onboarding = 'app.screen.onboard',
  auth = 'app.screen.auth',
  welcome = 'app.screen.auth.welcome',
  forgotPassword = 'app.screen.auth.forgotpassword',
  profile = 'app.screen.auth.profile',
  social = 'app.screen.social',
  assigned = 'app.screen.assigned',
  unassigned = 'app.screen.unassigned',
  mentions = 'app.screen.mentions',
  closed = 'app.screen.closed',
  draft = 'app.screen.draft',
  teaminbox = 'app.screen.teaminbox',
  search = 'app.screen.search',
  customerThreads = 'app.screen.customerthreads',
  notification = 'app.screen.notification',
  composeSocial = 'app.screen.composesocial',
  composeMail = 'app.screen.composemail',
  main = 'app.screen.main',
  config = 'app.screen.config',
  settings = 'app.screen.settings',
  about = 'app.screen.about',
  editprofile = 'app.screen.editprofile',
  changePhoneNumber = 'app.screen.changephonenumber',
  changeEmail = 'app.screen.changeemail',
  resetPassword = 'app.screen.resetpassword',
  privacy = 'app.screen.privacy',
  datastorage = 'app.screen.datastorage',
  quickreplies = 'app.screen.quickreplies',
  chat = 'app.screen.chat',
  camera = 'app.screen.camera',
  conversationDetails = 'app.screen.conversationdetails',
  imageView = 'app.screen.imageview',
  mail = 'app.screen.mail',
  mailBox = 'app.screen.mailBox',
}

export type MainStackParamList = {
  [SCREEN_NAME.onboarding]: undefined;
  [SCREEN_NAME.auth]: undefined;
  [SCREEN_NAME.forgotPassword]: undefined;
  [SCREEN_NAME.search]: undefined;
  [SCREEN_NAME.customerThreads]: {customerDetails: {}};
  [SCREEN_NAME.notification]: undefined;
  [SCREEN_NAME.welcome]: undefined;
  [SCREEN_NAME.assigned]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.closed]: undefined;
  [SCREEN_NAME.draft]: undefined;
  [SCREEN_NAME.mentions]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.teaminbox]: undefined;
  [SCREEN_NAME.composeMail]: {channel: {}};
  [SCREEN_NAME.composeSocial]: {channel: {}};
  [SCREEN_NAME.profile]: undefined;
  [SCREEN_NAME.main]: undefined;
  [SCREEN_NAME.config]: undefined;
  [SCREEN_NAME.settings]: undefined;
  [SCREEN_NAME.about]: undefined;
  [SCREEN_NAME.chat]: {threadId: {}};
  [SCREEN_NAME.conversationDetails]: {thread: any};
  [SCREEN_NAME.camera]: {user: any};
  [SCREEN_NAME.imageView]: {image: any};
  [SCREEN_NAME.mail]: {user: any};
  [SCREEN_NAME.mailBox]: undefined;
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
  [SCREEN_NAME.resetPassword]: undefined;
  [SCREEN_NAME.privacy]: undefined;
  [SCREEN_NAME.datastorage]: undefined;
  [SCREEN_NAME.quickreplies]: undefined;
};
export type SocialScreenRouteProp = RouteProp<MainStackParamList>;

export const isLargeScreen = Dimensions.get('window').height > 700;
