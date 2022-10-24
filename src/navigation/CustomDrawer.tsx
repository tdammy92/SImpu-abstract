import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
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
// import NotAvailble from 'src/assets/images/NotAvailable.svg';
import NotAvailble from 'src/assets/images/notificationLabel.svg';
import PendingAvailble from 'src/assets/images/GrayNotification.svg';
import BlueTagIcon from 'src/assets/images/BlueTagIcon.svg';
import RedTagIcon from 'src/assets/images/RedTagIcon.svg';

const {height, width} = Dimensions.get('screen');

const CustomDrawer = (props: any): JSX.Element => {
  const {profile} = useSelector((state: StoreState) => state.user);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [isAvailable, setisAvailable] = useState<boolean | null>(true);

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

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setisAvailable(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  // console.log('Network', isAvailable);
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
              {isAvailable ? <Availble /> : <NotAvailble />}
            </View>
          </View>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.userName}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text
              style={[
                styles.statusText,
                {color: isAvailable ? '#287D3C' : '#EB5757'},
              ]}>
              {isAvailable ? 'Available' : 'offline'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN_NAME.settings)}>
          <AntDesign name="setting" size={20} color="#7D8282" />
        </TouchableOpacity>
      </View>

      <Divider />

      {/* drawe menu content */}
      <View
        style={{
          // flex: 1
          height: '100%',
        }}>
        <DrawerContentScrollView
          {...props}
          style={{marginTop: 0, paddingTop: 0}}>
          {/* menu list item*/}
          <DrawerItemList {...props} />

          {/* tag and team inbox list */}
          <View style={styles.customInboxContainer}>
            {/* Team inboxes */}
            <Collapse isExpanded={true}>
              <CollapseHeader>
                <View style={styles.customInboxTitle}>
                  <EvilIcons name="chevron-down" size={25} color="#000" />
                  <Text style={[styles.customInboxTitleText]}>
                    TEAM INBOXES
                  </Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.customInboxItems}>
                  <DrawerItem
                    label={({color, focused}) => {
                      return (
                        <View style={styles.customInboxItemList}>
                          <NotAvailble />
                          <Text style={styles.customInboxtext}>
                            Sales Inbox
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox, {
                        menuName: ' Sales Inbox',
                      })
                    }
                  />

                  <DrawerItem
                    label={({color, focused}) => {
                      return (
                        <View style={styles.customInboxItemList}>
                          <PendingAvailble />
                          <Text style={styles.customInboxtext}>
                            Engineering Inbox
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox, {
                        menuName: ' Engineering Inbox',
                      })
                    }
                  />
                </View>
              </CollapseBody>
            </Collapse>
            {/* Tags */}
            <View style={{height: hp(10)}} />
            <Collapse>
              <CollapseHeader>
                <View style={styles.customInboxTitle}>
                  <EvilIcons name="chevron-down" size={25} color="#000" />
                  <Text style={styles.customInboxTitleText}>TAGS</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.customInboxItems}>
                  <DrawerItem
                    label={({color, focused}) => {
                      return (
                        <View style={styles.customInboxItemList}>
                          <BlueTagIcon width={20} height={20} color={color} />
                          <Text style={styles.customInboxtext}>Urgent</Text>
                          <Text style={styles.badgeText}>5</Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox, {
                        menuName: 'Urgent',
                      })
                    }
                  />

                  <DrawerItem
                    label={({color, focused}) => {
                      return (
                        <View style={styles.customInboxItemList}>
                          <RedTagIcon width={20} height={20} color={color} />
                          <Text style={styles.customInboxtext}>Sla breach</Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox, {
                        menuName: 'Sla breach',
                      })
                    }
                  />
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </DrawerContentScrollView>
      </View>

      {/* logout button styling */}
      {/* <View style={{paddingTop: 20, position: 'absolute', bottom: hp(40)}}>
        <TouchableOpacity
          style={{flexDirection: 'row', paddingHorizontal: 20}}
          onPress={handleLogout}>
          <Ionicons name="exit-outline" size={20} />
          <Text style={styles.customInboxtext}>Sign Out</Text>
        </TouchableOpacity>
      </View> */}
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

  customInboxContainer: {
    paddingLeft: 15,
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  customInboxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  customInboxTitleText: {
    fontSize: hp(13),
    color: '#7D8282',
    fontFamily: FONTS.AVERTA_BOLD,
  },
  customInboxItems: {
    // marginLeft: wp(5),
    width: '100%',
  },
  customInboxItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'red',
    width: '100%',
  },
  customInboxtext: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
  },

  badgeText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: 12,
    color: colors.primaryText,
    position: 'absolute',
    right: -20,
  },
});
