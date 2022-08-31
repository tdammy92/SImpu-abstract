import {Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';

export enum SCREEN_NAME {
  onboard = 'app.screen.onboard',
  auth = 'app.screen.auth',
  welcome = 'app.screen.auth.welcome',
  profile = 'app.screen.auth.profile',
  inbox = 'app.screen.inbox',
  assigned = 'app.screen.assigned',
  unassigned = 'app.screen.unassigned',
  mentions = 'app.screen.mentions',
  closed = 'app.screen.closed',

  login = 'app.screen.login',
  phoneLogin = 'app.screen.login.phone',
  otpLogin = 'app.screen.login.otp',
  main = 'app.screen.main',
  inner = 'app.screen.inner',
  contact = 'app.screen.contact',
  options = 'app.screen.options',
  settings = 'app.screen.settings',
  simpupay = 'app.screen.simpupay',
  reviewpay = 'app.screen.reviewpay',
  request = 'app.screen.request',
  editprofile = 'app.screen.editprofile',
  changePhoneNumber = 'app.screen.changephonenumber',
  changeEmail = 'app.screen.changeemail',
  privacy = 'app.screen.privacy',
  datastorage = 'app.screen.datastorage',
  managesocials = 'app.screen.managesocials',
  connectsocials = 'app.screen.connectsocials',
  socialWeb = 'app.screen.webview',
  quickreplies = 'app.screen.quickreplies',
  channel = 'app.screen.inbox.channel',
  chat = 'app.screen.inbox.chat',
}

export type MainStackParamList = {
  [SCREEN_NAME.onboard]: undefined;
  [SCREEN_NAME.auth]: undefined;
  [SCREEN_NAME.welcome]: undefined;
  [SCREEN_NAME.assigned]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.closed]: undefined;
  [SCREEN_NAME.mentions]: undefined;
  [SCREEN_NAME.unassigned]: undefined;
  [SCREEN_NAME.profile]: undefined;

  [SCREEN_NAME.login]: undefined;
  [SCREEN_NAME.phoneLogin]: undefined;
  [SCREEN_NAME.otpLogin]: {PhoneNumber: string; transaction_id: string};
  [SCREEN_NAME.main]: undefined;
  [SCREEN_NAME.inner]: undefined;
  [SCREEN_NAME.contact]: undefined;
  [SCREEN_NAME.inbox]: undefined;
  [SCREEN_NAME.options]: undefined;
  [SCREEN_NAME.settings]: undefined;
  [SCREEN_NAME.simpupay]: undefined;
  [SCREEN_NAME.channel]: undefined;
  [SCREEN_NAME.chat]: {
    name: string;
    channel: string;
    avatar: string;
    threadId: string;
    chat: []; //remove line when making api calls
  };
  [SCREEN_NAME.request]: undefined;
  [SCREEN_NAME.reviewpay]: undefined;
  [SCREEN_NAME.editprofile]: undefined;
  [SCREEN_NAME.changePhoneNumber]: undefined;
  [SCREEN_NAME.changeEmail]: undefined;
  [SCREEN_NAME.privacy]: undefined;
  [SCREEN_NAME.datastorage]: undefined;
  [SCREEN_NAME.managesocials]: undefined;
  [SCREEN_NAME.connectsocials]: {
    name: string;
  };
  [SCREEN_NAME.socialWeb]: {
    name?: string;
    channel_id?: string;
  };
  [SCREEN_NAME.quickreplies]: undefined;
};
export type SocialScreenRouteProp = RouteProp<
  MainStackParamList,
  SCREEN_NAME.connectsocials
>;

export const isLargeScreen = Dimensions.get('window').height > 700;
