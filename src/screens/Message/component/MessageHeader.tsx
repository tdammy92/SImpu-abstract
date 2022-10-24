import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SidepanelIcon from 'src/assets/images/SidepanelIcon.svg';
import NotificationLabel from 'src/assets/images/notificationLabel.svg';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import dummyData from 'src/constants/dummyData';

import {SCREEN_NAME} from 'src/navigation/constants';

const MessageHeader = (props: any) => {
  const navigation = useNavigation();
  const {
    openSortSheet,
    messageOption,
    shoMessageOptions,
    handleSelectedIndex,
    selectedIndex,
    HandlePress,
  } = props;
  const openDraw = () => navigation.dispatch(DrawerActions.openDrawer());
  //@ts-ignore
  const openNotification = () => navigation.navigate(SCREEN_NAME.notification);

  return (
    <View style={styles.headerContainer}>
      {/* first row buttons */}
      <View style={styles.headerRowContainer}>
        <TouchableOpacity onPress={HandlePress ? HandlePress : openDraw}>
          <SidepanelIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={openNotification}>
          <View style={styles.badgeContainer}>
            {dummyData.length > 0 ? <NotificationLabel /> : null}
          </View>
          <Ionicons name="notifications-outline" size={30} color={'#7D8282'} />
        </TouchableOpacity>
      </View>

      {/* second row buttons */}
      <View style={[styles.headerRowContainer, {marginTop: hp(20)}]}>
        <Text style={styles.headerTitleText}>{props?.name && props?.name}</Text>

        {/* sort option slider view */}
        <TouchableOpacity
          style={{marginTop: 0, backgroundColor: ''}}
          onPress={openSortSheet}>
          <Octicons name="sort-asc" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* input container */}
      <View style={styles.headerDetails}>
        <TouchableOpacity
          style={styles.inputWrapper}
          //@ts-ignore
          onPress={() => navigation.navigate(SCREEN_NAME.search)}>
          <EvilIcons name="search" size={25} color="#828282" />

          <Text
            style={{
              color: '#828282',
              fontFamily: FONTS.AVERTA_SEMI_BOLD,
              fontSize: hp(16),
              marginLeft: wp(5),
            }}>
            Search...
          </Text>
        </TouchableOpacity>

        {/* menu name view */}
        <View style={styles.sliderView}>
          {!shoMessageOptions && <View />}
          {shoMessageOptions && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {messageOption.map((option: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: hp(15),
                    }}
                    onPress={() => handleSelectedIndex(index)}>
                    <View
                      style={{
                        borderBottomColor:
                          selectedIndex === index ? '#191A1A' : '',
                        borderBottomWidth: selectedIndex === index ? 2 : 0,
                      }}>
                      <Text style={[styles.sliderText, {}]}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    //@ts-ignore
    marginTop: hp(StatusBar.currentHeight + 30),
    marginHorizontal: wp(12),
    elevation: 100,
    zIndex: 100,
  },

  headerDetails: {
    marginVertical: hp(2),
  },

  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: wp(5),
  },

  badgeContainer: {
    position: 'absolute',
    // backgroundColor: '#D22B2B',
    right: wp(4),
    top: hp(4),
    elevation: 3,
    zIndex: 3,
    // borderRadius: 50,
    // height: hp(20),
    // width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#fff',
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(12),
    textAlign: 'center',
  },

  headerTitleText: {
    fontSize: hp(18),

    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    color: colors.primaryText,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginVertical: hp(10),
    height: 40,
    paddingHorizontal: wp(7),
    backgroundColor: '#F8F8F8',

    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#F8F8F8',

    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

  sliderView: {
    flexDirection: 'row',
    paddingTop: hp(10),
    justifyContent: 'space-between',
  },
  sliderText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    paddingBottom: 5,
    color: colors.primaryText,
  },
});
