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
      {/* top buttons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={HandlePress ? HandlePress : openDraw}>
          <AntDesign name="menu-fold" size={30} color={colors.primaryText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openNotification}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{dummyData?.length}</Text>
          </View>
          <Ionicons
            name="notifications-outline"
            size={30}
            color={colors.primaryText}
            style={{transform: [{rotate: '35deg'}]}}
          />
        </TouchableOpacity>
      </View>

      {/* input container */}
      <View style={styles.headerDetails}>
        <TouchableOpacity
          style={styles.inputWrapper}
          //@ts-ignore
          onPress={() => navigation.navigate(SCREEN_NAME.search)}>
          <EvilIcons name="search" size={25} color="black" />

          <Text
            style={{
              color: colors.primaryText,
              fontFamily: FONTS.AVERTA_SEMI_BOLD,
              fontSize: hp(16),
            }}>
            Search
          </Text>
        </TouchableOpacity>

        {/* menu name view */}
        <View style={styles.sliderView}>
          <Text style={styles.headerTitleText}>
            {props?.name && props?.name}
          </Text>

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
                          selectedIndex === index ? '#026AE8' : '',
                        borderBottomWidth: selectedIndex === index ? 3 : 0,
                      }}>
                      <Text style={[styles.sliderText, {}]}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* sort option slider view */}
          <TouchableOpacity
            style={{marginTop: 0, backgroundColor: ''}}
            onPress={openSortSheet}>
            <Octicons name="sort-asc" size={23} color="#000" />
          </TouchableOpacity>
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
    marginVertical: hp(10),
  },

  badgeContainer: {
    position: 'absolute',
    backgroundColor: '#D22B2B',
    right: wp(10),
    top: hp(-8),
    elevation: 3,
    zIndex: 3,
    borderRadius: 50,
    height: hp(20),
    width: wp(20),
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
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
  },

  sliderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    paddingBottom: 5,
    color: colors.primaryText,
  },
});
