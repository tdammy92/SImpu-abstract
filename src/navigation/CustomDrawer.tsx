import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {hp, wp} from 'src/utils';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, Divider, Icon} from '@ui-kitten/components';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  //@ts-ignore
} from 'accordion-collapse-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {Avatar as avatar} from 'src/constants/general';
import {colors, FONTS} from 'src/constants';
import {SCREEN_NAME} from './constants';
import {StoreState} from 'src/@types/store';
import Availble from 'src/assets/images/Available.svg';
import NotAvailble from 'src/assets/images/NotAvailable.svg';
import PendingAvailble from 'src/assets/images/GrayNotification.svg';
import BlueTagIcon from 'src/assets/images/BlueTagIcon.svg';
import RedTagIcon from 'src/assets/images/RedTagIcon.svg';

const {height, width} = Dimensions.get('screen');

const CustomDrawer = (props: any): JSX.Element => {
  const {profile} = useSelector((state: StoreState) => state.user);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout?',
      'Are you sure you want to logout ?',
      [
        {
          text: 'cancle',
          onPress: () => console.log('cancled logot '),
        },
        {
          text: 'yes',
          onPress: () => {
            // dispatch(logOutUser()),
            props.navigation.reset({
              index: 0,
              routes: [{name: SCREEN_NAME.auth}],
            });
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('cancled'),
      },
    );
  };

  // const filteredProps = {
  //   ...props,
  //   state: {
  //     ...props.state,
  //     routeNames: props.state.routeNames.filter((routeName: any) => {
  //       return routeName !== SCREEN_NAME.teaminbox;
  //     }),
  //     routes: props.state.routes.filter((route: any) => {
  //       return route.name !== SCREEN_NAME.teaminbox;
  //     }),
  //   },
  // };

  // console.log(JSON.stringify(filteredProps));

  return (
    <View style={styles.container}>
      {/* user profile  */}
      <View style={styles.headerContainer}>
        <View style={styles.userDetails}>
          <View>
            <UserAvatar
              size={40}
              name={`${profile?.first_name} ${profile?.last_name}`}
              src={profile.image}
            />
            <View style={{position: 'absolute', bottom: 2, right: 1}}>
              {netInfo.isConnected ? <Availble /> : <NotAvailble />}
            </View>
          </View>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.userName}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text
              style={[
                styles.statusText,
                {color: netInfo.isConnected ? '#287D3C' : colors.primaryText},
              ]}>
              {netInfo.isConnected ? 'Available' : 'offline'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN_NAME.settings)}>
          <AntDesign name="setting" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Divider />

      {/* drawe menu content */}
      <View style={{flex: 0.85}}>
        <DrawerContentScrollView {...props}>
          {/* menu list item*/}
          <DrawerItemList {...props} />
          <Divider />

          {/* tag and team inbox list */}
          <View style={{paddingHorizontal: 15, marginTop: 50}}>
            {/* Team inboxes */}
            <Collapse>
              <CollapseHeader>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EvilIcons name="chevron-down" size={25} color="#000" />
                  <Text style={{marginLeft: 10}}>TEAM INBOXES</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{marginLeft: wp(15)}}>
                  <DrawerItem
                    style={{
                      padding: 0,
                      // backgroundColor: 'green',
                    }}
                    label={({color, focused}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <NotAvailble />
                          <Text style={{marginLeft: 10, fontSize: 14}}>
                            Sales Inbox
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      // Linking.openURL('https://mywebsite.com/help')
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox)
                    }
                  />

                  <DrawerItem
                    style={{
                      // backgroundColor: 'green',
                      marginTop: 0,
                      paddingTop: 0,
                    }}
                    label={({color, focused}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // backgroundColor: focused ? '#F2F2F2' : '',
                          }}>
                          <PendingAvailble />
                          <Text style={{marginLeft: 10}}>
                            Engineering Inbox
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      // Linking.openURL('https://mywebsite.com/help')
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox)
                    }
                  />
                </View>
              </CollapseBody>
            </Collapse>
            {/* Tags */}
            <View style={{height: hp(15)}} />
            <Collapse>
              <CollapseHeader>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EvilIcons name="chevron-down" size={25} color="#000" />
                  <Text style={{marginLeft: 10}}>TAGS</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{marginLeft: wp(15)}}>
                  <DrawerItem
                    style={{
                      padding: 0,
                      // backgroundColor: 'green',
                    }}
                    label={({color, focused}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                          }}>
                          <BlueTagIcon />
                          <Text style={{marginLeft: 10, fontSize: 14}}>
                            Urgent
                          </Text>
                          <Text style={{position: 'absolute', right: -20}}>
                            5
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      // Linking.openURL('https://mywebsite.com/help')
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox)
                    }
                  />

                  <DrawerItem
                    style={{
                      // backgroundColor: 'green',
                      marginTop: 0,
                      paddingTop: 0,
                    }}
                    label={({color, focused}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RedTagIcon />
                          <Text style={{marginLeft: 10}}>Sla breach</Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      // Linking.openURL('https://mywebsite.com/help')
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox)
                    }
                  />
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </DrawerContentScrollView>
      </View>

      {/* logout button styling */}

      <View style={{paddingTop: 20, position: 'absolute', bottom: hp(40)}}>
        <TouchableOpacity
          style={{flexDirection: 'row', paddingHorizontal: 20}}
          onPress={handleLogout}>
          <Ionicons name="exit-outline" size={20} />
          <Text style={{marginLeft: 10}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(10),
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetails: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },

  userName: {
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
  bottomView: {
    paddingVertical: hp(15),
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.AVERTA_REGULAR,
  },
});
