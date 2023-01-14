import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackParamList, SCREEN_NAME} from './constants';
import {useQueryClient} from 'react-query';
import Payment from 'src/screens/payment';

import Setting from 'src/screens/setting';
import CustomDrawer from './CustomDrawer';

import FONTS from 'src/constants/fonts';
import {Avatar} from '@ui-kitten/components';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

import Login from 'src/screens/Auth';
import ForgotPassword from 'src/screens/Auth/forgotPassword';
import Social from 'src/screens/Message/PersonalInbox';
import Assigned from 'src/screens/Message/Assigned';
import Unassigned from 'src/screens/Message/Unassigned';
import Mentions from 'src/screens/Message/Mentions';
import Closed from 'src/screens/Message/Closed';
import Draft from 'src/screens/Message/draft';
import Settings from 'src/screens/setting/index';
import EditProfile from 'src/screens/setting/editProfile';
import ChatBox from 'src/screens/Message/chat';
import Search from 'src/screens/search';
import Notification from 'src/screens/Message/notification';
import Compose from 'src/screens/Message/compose';
import TeamInbox from 'src/screens/Message/teamInbox';
import Onboarding from 'src/screens/onbording';
import QuickReplies from 'src/screens/setting/quickReplies';
import Privacy from 'src/screens/setting/privacy';
import ChangeNumber from 'src/screens/setting/editProfile/changeNumber';
import ChangeEmail from 'src/screens/setting/editProfile/changeEmail';
import ResetPassword from 'src/screens/setting/editProfile/resetPassword';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Assign from 'src/assets/images/ssigned.svg';
import Unassign from 'src/assets/images/unassigned.svg';
import Close from 'src/assets/images/Closed.svg';
import Mention from 'src/assets/images/mentions.svg';
import Draf from 'src/assets/images/Draft.svg';

import {useTheme, useStyleSheet, StyleService} from '@ui-kitten/components';

import {useDispatch, useSelector} from 'react-redux';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {formatNumbers, hp, wp} from 'src/utils';
import {Avatar as avatar} from 'src/constants/general';
import {StoreState} from 'src/@types/store';
import {colors} from 'src/constants';
import {
  useSidebarInboxes,
  useSidebarUnreadCount,
} from 'src/services/query/queries';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {buildConversationUrl} from 'src/services/api/api-client';

import HeaderBack from './HeaderBack';
import About from 'src/screens/setting/about';
import {pusher} from 'src/index';
import {
  DEMO_API,
  PRODUCTION_API,
  CONVERSATION_API_DEMO,
  INTEGRATIONS_API_DEMO,
  INTEGRATIONS_API_PRODUCTION,
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY_DEMO,
} from '@env';
import Mail from 'src/screens/Message/Mail';
import useNotification from 'src/Hooks/useNotification';
import {Notifications} from 'react-native-notifications';
import ImageScreen from 'src/screens/Message/chat/component/chatList/bubble/imageViewer';
import Loader from 'src/components/common/Loader';
const Stack = createNativeStackNavigator<MainStackParamList>();

const Drawer = createDrawerNavigator();

const SettingsStack = createStackNavigator<MainStackParamList>();

//drawer navigator
function DrawerMenu() {
  const styles = useStyleSheet(themedStyles);
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {
    data: count,
    isError,
    isLoading,
    error,
    status,
  } = useSidebarUnreadCount({
    Auth: token,
    organisationId: organisation?.id,
  });

  //get personal inbox
  const {
    data: PersonalInbox,
    isFetching: isFecthingPersonal,
    isLoading: isLoadingPersonal,
    error: errorPersonal,
    isError: isErrorPersonal,
  } = useSidebarInboxes(
    {
      is_pinned: false,
      type: 'personal',
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  const personal = PersonalInbox?.inboxes[0];

  // console.log('Personaall', personal);
  // console.log('Count', typeof count.assigned);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} count={count} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: hp(-22)},
        drawerActiveBackgroundColor: '#F2F2F2',
        drawerActiveTintColor: colors.dark,
        drawerInactiveTintColor: 'gray',
        drawerType: 'front',
      }}>
      {!isLoadingPersonal && personal && (
        <Drawer.Screen
          options={{
            title: 'Personal Inbox',
            drawerItemStyle: [
              styles.drawItemStyle,
              {marginTop: 0, paddingTop: 0},
            ],
            drawerLabel: ({color, focused}) => {
              return (
                <View
                  style={[styles.selectedMenu, {marginTop: 0, paddingTop: 0}]}>
                  <View style={styles.menuLeft}>
                    <UserAvatar
                      size={hp(22)}
                      style={{height: hp(22), width: hp(22)}}
                      borderRadius={hp(22 * 0.5)}
                      name={`${profile?.first_name} ${profile?.last_name}`}
                      src={profile.image}
                    />
                    <Text
                      style={[
                        styles.titleText,
                        // {color: focused ? colors.dark : ''},
                      ]}>
                      {personal?.name}
                    </Text>
                  </View>

                  <View style={styles.menuRight}>
                    {count && (
                      <Text
                        style={[
                          styles.badgeText,
                          {color: focused ? colors.dark : ''},
                        ]}>
                        {count[personal?.uuid] > 0 &&
                          formatNumbers(count[personal?.uuid])}
                      </Text>
                    )}
                  </View>
                </View>
              );
            },
          }}
          name={SCREEN_NAME.social}
          component={Social}
        />
      )}

      <Drawer.Screen
        options={{
          title: 'Unassigned',

          drawerItemStyle: styles.drawItemStyle,
          drawerLabel: ({color, focused}) => {
            return (
              <View style={styles.selectedMenu}>
                <View style={styles.menuLeft}>
                  <Unassign width={20} height={20} color={color} />
                  <Text style={styles.titleText}>Unassigned</Text>
                </View>

                <View style={styles.menuRight}>
                  {count && (
                    <Text style={styles.badgeText}>
                      {count['queued'] > 0 && formatNumbers(count['queued'])}
                    </Text>
                  )}
                </View>
              </View>
            );
          },
        }}
        name={SCREEN_NAME.unassigned}
        component={Unassigned}
      />
      <Drawer.Screen
        options={{
          title: 'Assigned',
          drawerItemStyle: styles.drawItemStyle,
          drawerLabel: ({color, focused}) => {
            return (
              <View style={styles.selectedMenu}>
                <View style={styles.menuLeft}>
                  <Assign width={20} height={20} color={color} />
                  <Text style={styles.titleText}>Assigned</Text>
                </View>

                <View style={styles.menuRight}>
                  {count && (
                    <Text style={styles.badgeText}>
                      {count['assigned'] > 0 &&
                        formatNumbers(count['assigned'])}
                    </Text>
                  )}
                </View>
              </View>
            );
          },
        }}
        name={SCREEN_NAME.assigned}
        component={Assigned}
      />
      <Drawer.Screen
        options={{
          title: 'Mentions',

          drawerItemStyle: styles.drawItemStyle,
          drawerLabel: ({color, focused}) => {
            return (
              <View style={styles.selectedMenu}>
                <View style={styles.menuLeft}>
                  <Mention width={20} height={20} color={color} />
                  <Text style={styles.titleText}>Mentions</Text>
                </View>

                <View style={styles.menuRight}>
                  {count && (
                    <Text style={styles.badgeText}>
                      {count['mentioned'] > 0 &&
                        formatNumbers(count['mentioned'])}
                    </Text>
                  )}
                </View>
              </View>
            );
          },
        }}
        name={SCREEN_NAME.mentions}
        component={Mentions}
      />
      <Drawer.Screen
        options={{
          title: 'Closed',
          drawerItemStyle: styles.drawItemStyle,
          drawerLabel: ({color, focused}) => {
            return (
              <View style={styles.selectedMenu}>
                <View style={styles.menuLeft}>
                  <Close width={20} height={20} color={color} />
                  <Text style={styles.titleText}>Closed</Text>
                </View>

                <View style={styles.menuRight}>
                  {count && (
                    <Text style={styles.badgeText}>
                      {count['closed'] > 0 && formatNumbers(count['closed'])}
                    </Text>
                  )}
                </View>
              </View>
            );
          },
        }}
        name={SCREEN_NAME.closed}
        component={Closed}
      />
      <Drawer.Screen
        options={{
          title: 'Draft',

          drawerItemStyle: styles.drawItemStyle,
          drawerLabel: ({color, focused}) => {
            return (
              <View style={styles.selectedMenu}>
                <View style={styles.menuLeft}>
                  <Draf width={20} height={20} color={color} />
                  <Text style={styles.titleText}>Draft</Text>
                </View>

                <View style={styles.menuRight}>
                  {count && (
                    <Text style={styles.badgeText}>
                      {count['drafts'] > 0 && formatNumbers(count['drafts'])}
                    </Text>
                  )}
                </View>
              </View>
            );
          },
        }}
        name={SCREEN_NAME.draft}
        component={Draft}
      />
    </Drawer.Navigator>
  );
}

//settings navigator
const SettingsStackNavigator = (): JSX.Element => {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}>
      <SettingsStack.Screen
        name={SCREEN_NAME.settings}
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            color: colors.dark,
            fontFamily: FONTS.TEXT_SEMI_BOLD,
            fontSize: hp(18),
          },

          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={Settings}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.editprofile}
        options={{
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            color: colors.dark,
            fontFamily: FONTS.TEXT_SEMI_BOLD,
            fontSize: hp(18),
          },
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={EditProfile}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.about}
        options={{
          headerShown: false,
        }}
        component={About}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.changePhoneNumber}
        options={{
          title: 'Change Number',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            color: colors.dark,
            fontFamily: FONTS.TEXT_SEMI_BOLD,
            fontSize: hp(18),
          },
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={ChangeNumber}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.changeEmail}
        options={{
          title: 'Change Email',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            color: colors.dark,
            fontFamily: FONTS.TEXT_SEMI_BOLD,
            fontSize: hp(18),
          },
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={ChangeEmail}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.resetPassword}
        options={{
          title: 'Reset Password',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            color: colors.dark,
            fontFamily: FONTS.TEXT_SEMI_BOLD,
            fontSize: hp(18),
          },
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={ResetPassword}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.quickreplies}
        options={{
          title: 'Quick Replies',
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: colors.dark,
            fontFamily: FONTS.TEXT_REGULAR,
          },
        }}
        component={QuickReplies}
      />
      <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.privacy}
        options={{
          title: '',
          headerLeft: HeaderBack,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={Privacy}
      />
    </SettingsStack.Navigator>
  );
};

//Root navihgators
export const RootStack = (): JSX.Element => {
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const {profile, token, isloggedIn, onFirstLaunch} = useSelector(
    (state: StoreState) => state.user,
  );
  const queryClient = useQueryClient();

  useNotification();

  //pusher configurations
  const connect = async () => {
    try {
      await pusher.init({
        apiKey: PUSHER_APP_KEY_DEMO,
        cluster: PUSHER_APP_CLUSTER,
        authEndpoint: buildConversationUrl(
          `auth/websocket2?token=${token}&organisationID${organisation.id}`,
        ),

        onConnectionStateChange,
        onError,
        onEvent,
        onSubscriptionSucceeded,
      });

      // //subscribe to organisation
      const orgChannelName = `presence-organisation-${organisation?.id}`;
      const organisationChannel = await pusher.subscribe({
        channelName: orgChannelName,
        onEvent: event => {
          // console.log(`org channel event:`, JSON.stringify(event, null, 2));
        },
      });

      // subscribe to live chat
      const liveChatChannelName = `presence-livechat-${organisation?.id}`;
      const LiveChatChannel = await pusher.subscribe({
        channelName: liveChatChannelName,
        onEvent: event => {
          // console.log(
          //   `liveChat channel event:`,
          //   JSON.stringify(event, null, 2),
          // );
        },
      });

      //subscribe to profile
      const userChannelName = `private-profile-${profile?.id}`;
      const userChannel = await pusher.subscribe({
        channelName: userChannelName,
        onEvent: event => {
          // console.log(
          //   `userChanel channel event:`,
          //   JSON.stringify(event, null, 2),
          // );
        },
      });

      await pusher.connect();
    } catch (error) {
      console.log('This is pusher error', error);
    }
  };

  const onConnectionStateChange = (
    currentState: string,
    previousState: string,
  ) => {
    console.log(
      `onConnectionStateChange. previousState=${previousState} newState=${currentState}`,
    );
  };

  const onError = (message: string, code: Number, error: any) => {
    console.log(`onError: ${message} code: ${code} exception: ${error}`);
  };

  const onEvent = (event: any) => {
    // console.log('event fired', JSON.stringify(event, null, 2));

    // const thread_id = JSON.parse(event?.data)?.thread_id;

    queryClient.invalidateQueries('threads');
    queryClient.invalidateQueries('conversations');

    // showNotification(event);
  };

  const onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(
        data,
        null,
        2,
      )}`,
    );

    const channel: PusherChannel = pusher.getChannel(channelName);
    const me = channel.me;

    console.log('Me from chaneel', JSON.stringify(me, null, 2));
  };

  useEffect(() => {
    // registerNotification();

    if (!!token && !!organisation?.id && !!isloggedIn) {
      connect();
    }
  }, [token, organisation?.id, profile?.id]);

  return (
    <>
      <Loader />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          !onFirstLaunch
            ? SCREEN_NAME.onboarding
            : isloggedIn
            ? SCREEN_NAME.main
            : SCREEN_NAME.auth
        }>
        <Stack.Screen
          name={SCREEN_NAME.onboarding}
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.auth}
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREEN_NAME.forgotPassword}
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.main}
          component={DrawerMenu}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREEN_NAME.chat}
          component={ChatBox}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Group screenOptions={{presentation: 'containedModal'}}>
          <Stack.Screen
            name={SCREEN_NAME.imageView}
            component={ImageScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>

        <Stack.Screen
          name={SCREEN_NAME.mail}
          component={Mail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.config}
          component={SettingsStackNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREEN_NAME.search}
          component={Search}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={SCREEN_NAME.notification}
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.compose}
          component={Compose}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.teaminbox}
          component={TeamInbox}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

//naviagtiion styling
const themedStyles = StyleService.create({
  drawItemStyle: {
    borderRadius: 18,
    height: hp(40),
    justifyContent: 'center',
    widthe: '100%',
  },
  selectedMenu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuRight: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(-18),
    top: 5,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    paddingLeft: 5,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: 14,
    color: colors.dark,
  },
  badgeText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: 12,
    color: colors.secondaryBg,
  },
});
