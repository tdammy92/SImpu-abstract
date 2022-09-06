/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {MainStackParamList, SCREEN_NAME} from './constants';
import Payment from 'src/screens/payment';
import Auth from 'src/screens/auth';
import Setting from 'src/screens/setting';
import CustomDrawer from './CustomDrawer';

import FONTS from 'src/constants/fonts';
import {Avatar} from '@ui-kitten/components';

import Login from 'src/screens/auth';
import Social from 'src/screens/Message/social';
import Assigned from 'src/screens/Message/Assigned';
import Unassigned from 'src/screens/Message/Unassigned';
import Mentions from 'src/screens/Message/Mentions';
import Closed from 'src/screens/Message/Closed';
import Draft from 'src/screens/Message/draft';
import Settings from 'src/screens/setting/index';
import EditProfile from 'src/screens/setting/editProfile';
import Chat from 'src/screens/Message/chat';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Assign from 'src/assets/images/ssigned.svg';
import Unassign from 'src/assets/images/unassigned.svg';
import Close from 'src/assets/images/Closed.svg';
import Mention from 'src/assets/images/mentions.svg';
import Draf from 'src/assets/images/Draft.svg';

import {useDispatch, useSelector} from 'react-redux';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {hp} from 'src/utils';
import {Avatar as avatar} from 'src/constants/general';

const Stack = createNativeStackNavigator<MainStackParamList>();

const Drawer = createDrawerNavigator();

const SettingsStack = createStackNavigator<MainStackParamList>();

//drawer navigator
function DrawerMenu() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: hp(-22)},

        drawerActiveBackgroundColor: '#c4c4c4',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: 'gray',
      }}>
      <Drawer.Screen
        options={{
          title: 'Socials',
          drawerIcon: ({color}) => (
            <Ionicons name="chatbubbles-outline" color={color} size={25} />
          ),
        }}
        name={SCREEN_NAME.social}
        component={Social}
      />

      <Drawer.Screen
        options={{
          title: 'Unassigned',
          drawerIcon: ({color}) => (
            <Unassign width={25} height={25} color={color} />
          ),
        }}
        name={SCREEN_NAME.unassigned}
        component={Unassigned}
      />
      <Drawer.Screen
        options={{
          title: 'Assigned',
          drawerIcon: ({color}) => (
            <Assign width={25} height={25} color={color} />
          ),
        }}
        name={SCREEN_NAME.assigned}
        component={Assigned}
      />
      <Drawer.Screen
        options={{
          title: 'Mentions',
          drawerIcon: ({color}) => (
            <Mention width={25} height={25} color={color} />
          ),
        }}
        name={SCREEN_NAME.mentions}
        component={Mentions}
      />
      <Drawer.Screen
        options={{
          title: 'Closed',
          drawerIcon: ({color}) => (
            <Close width={25} height={25} color={color} />
          ),
        }}
        name={SCREEN_NAME.closed}
        component={Closed}
      />
      <Drawer.Screen
        options={{
          title: 'Draft',
          drawerIcon: ({color}) => (
            <Draf width={22} height={22} color={color} />
          ),
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
          title: '',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={Settings}
      />
      {/* <SettingsStack.Screen
        //@ts-ignore
        name={SCREEN_NAME.editprofile}
        options={{
          title: '',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
        component={EditProfile}
      /> */}
    </SettingsStack.Navigator>
  );
};

//Root navihgators
export const RootStack = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.auth}
        component={Login}
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
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.settings}
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
