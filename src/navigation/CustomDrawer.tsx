import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
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

const CustomDrawer = (props: any): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const {navigate} = useNavigation();

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userDetails}>
          <Avatar source={{uri: avatar}} style={{height: 50, width: 50}} />
          <View style={{paddingLeft: 5}}>
            <Text style={styles.userName}>Collins Tompson</Text>
            <Text>Available</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN_NAME.settings)}>
          <AntDesign name="setting" size={20} />
        </TouchableOpacity>
      </View>

      <Divider />

      <View style={{flex: 0.7}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <Divider />

      <View style={styles.bottomView}>
        <Drawer
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <DrawerGroup title="Team Inbox" accessoryLeft={SmartphoneIcon}>
            <DrawerItem title="Team" accessoryLeft={StarIcon} />
            <DrawerItem title="Issues" accessoryLeft={StarIcon} />
          </DrawerGroup>
          <DrawerGroup title="Tags" accessoryLeft={BrowserIcon}>
            <DrawerItem title="Banks" accessoryLeft={StarIcon} />
            <DrawerItem title="Merchants" accessoryLeft={StarIcon} />
          </DrawerGroup>
        </Drawer>
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
  bottomView: {},
});
