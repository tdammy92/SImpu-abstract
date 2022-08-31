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
import Inbox from 'src/screens/Message/inbox';
import Assigned from 'src/screens/Message/Assigned';
import Unassigned from 'src/screens/Message/Unassigned';
import Mentions from 'src/screens/Message/Mentions';
import Closed from 'src/screens/Message/Closed';

import {useDispatch, useSelector} from 'react-redux';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {hp} from 'src/utils';
import {Avatar as avatar} from 'src/constants/general';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AuthStack = createStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator();

const LoginStack = createStackNavigator<MainStackParamList>();

//settings navigator
const AuthStackNavigator = (): JSX.Element => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}>
      <AuthStack.Screen
        name={SCREEN_NAME.auth}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

//drawer navigator
function DrawerMenu() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        options={{title: 'Inbox'}}
        name={SCREEN_NAME.inbox}
        component={Inbox}
      />
      <Drawer.Screen
        options={{title: 'Assigned'}}
        name={SCREEN_NAME.assigned}
        component={Assigned}
      />
      <Drawer.Screen
        options={{title: 'Unassigned'}}
        name={SCREEN_NAME.unassigned}
        component={Unassigned}
      />
      <Drawer.Screen
        options={{title: 'Mentions'}}
        name={SCREEN_NAME.mentions}
        component={Mentions}
      />
      <Drawer.Screen
        options={{title: 'Closed'}}
        name={SCREEN_NAME.closed}
        component={Closed}
      />
    </Drawer.Navigator>
  );
}

//settings navigator
// const MainStackNavigator = (): JSX.Element => {
//   return (
//     <MainStack.Navigator
//       screenOptions={() => ({

//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//       })}></MainStack.Navigator>
//   );
// };

//Root navihgators
export const RootStack = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.auth}
        component={DrawerMenu}
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
    </Stack.Navigator>
  );
};
