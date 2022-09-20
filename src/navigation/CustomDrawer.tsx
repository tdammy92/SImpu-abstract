import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {hp, wp} from 'src/utils';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar as avatar} from 'src/constants/general';
import {FONTS} from 'src/constants';
import {SCREEN_NAME} from './constants';

const SmartphoneIcon = (props: any) => <Icon {...props} name="inbox-outline" />;

const BrowserIcon = (props: any) => (
  <Icon {...props} name="pricetags-outline" />
);

const StarIcon = (props: any) => <Icon {...props} name="star-outline" />;

const {height, width} = Dimensions.get('screen');

const CustomDrawer = (props: any): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const navigation = useNavigation();

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

  const User = {
    name: 'Collins Tompson',
    image: avatar,
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
      <View style={styles.headerContainer}>
        <View style={styles.userDetails}>
          <UserAvatar size={40} name={User.name} src={User.image} />
          <View style={{paddingLeft: 5}}>
            <Text style={styles.userName}>{User.name}</Text>
            <Text>Available</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN_NAME.settings)}>
          <AntDesign name="setting" size={20} />
        </TouchableOpacity>
      </View>

      <Divider />
      <View style={{flex: 0.75}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <Divider />

      <View style={styles.bottomView}>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <MenuGroup title="Team Inbox" accessoryLeft={SmartphoneIcon}>
            <MenuItem
              title="Banks"
              accessoryLeft={StarIcon}
              //@ts-ignore
              onPress={() => navigation.navigate(SCREEN_NAME.teaminbox)}
            />
          </MenuGroup>
          <MenuGroup title="Tags" accessoryLeft={BrowserIcon}>
            <MenuItem
              title="Issues"
              accessoryLeft={StarIcon}
              //@ts-ignore
              onPress={() => navigation.navigate(SCREEN_NAME.teaminbox)}
            />
          </MenuGroup>
        </Menu>
      </View>
      <Divider />

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
    paddingVertical: hp(20),
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
});
