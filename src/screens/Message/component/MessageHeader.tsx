import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import React, {useState, memo, useRef, useCallback} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SidepanelIcon from 'src/assets/images/SidepanelIcon.svg';
import NotificationLabel from 'src/assets/images/notificationLabel.svg';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import dummyData from 'src/constants/dummyData';

import {SCREEN_NAME} from 'src/navigation/constants';
import {FormatText} from 'src/utils/string-utils/string';
import SortSheet from './SortSheet';
import SortByDate from './SortByDate';
// import DateInput from './DateInput';

const MessageHeader = (props: any) => {
  const navigation = useNavigation();
  const SortSheetRef = useRef<any>(null);
  const SortDateRef = useRef<any>(null);
  const DateRef = useRef<any>(null);

  const {
    messageOption,
    shoMessageOptions,
    handleSelectedIndex,
    selectedIndex,
    HandlePress,
    filter,
    setFilter,
  } = props;

  const [DateIndex, setDateIndex] = useState();
  const openDraw = () => navigation.dispatch(DrawerActions.openDrawer());
  //@ts-ignore
  const openNotification = () => navigation.navigate(SCREEN_NAME.notification);

  //open Sort by filter sheet code
  const openSortSheet = () => {
    if (SortSheetRef.current) {
      SortSheetRef.current.open();
    }
  };

  //close Sort by filter sheet
  const closeSortSheet = () => {
    if (SortSheetRef.current) {
      SortSheetRef.current.close();
    }
  };

  //open Sort by Date sheet code
  const openSortDateSheet = () => {
    closeSortSheet();

    // console.log('we got heree');
    // closeSortSheet();
    setTimeout(() => {
      if (SortDateRef.current) {
        SortDateRef.current.open();
      }
    }, 300);
  };

  // //close DateSort by filter sheet
  const closeSortDateSheet = () => {
    if (SortDateRef.current) {
      SortDateRef.current.close();
    }
    // setTimeout(() => {
    // if (DateRef.current) {
    // openDateSheet();
    // console.log('it got to the conditionals');
    // if (DateIndex === 2 || DateIndex === 3) {
    //   openDateSheet();
    // }
  };

  // open Date Sort by filter sheet code
  // const openDateSheet = () => {
  //   if (DateRef.current) {
  //     DateRef.current.open();
  //   }
  // };

  // close Sort by filter sheet
  // const closeDateSheet = () => {
  //   if (DateRef.current) {
  //     DateRef.current.close();
  //   }
  // };

  const changeSort = useCallback((sorted: any) => {
    // console.log('This is sorted', sorted);
    setFilter((Prev: any) => ({...Prev, sortbyFilter: sorted}));
    SortSheetRef.current.close();
  }, []);

  // console.log('date Index', DateIndex);

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
          <Ionicons
            name="notifications-outline"
            size={30}
            color={colors.darkGray}
          />
        </TouchableOpacity>
      </View>

      {/* second row buttons */}
      <View style={[styles.headerRowContainer, {marginTop: hp(20)}]}>
        <Text style={styles.headerTitleText}>{props?.name && props?.name}</Text>

        {/* sort option slider view */}
        <TouchableOpacity
          style={{marginTop: 0, backgroundColor: ''}}
          onPress={openSortSheet}>
          <Octicons name="sort-asc" size={24} color={colors.darkGray} />
        </TouchableOpacity>
      </View>

      {/* input container */}
      <View style={styles.headerDetails}>
        <TouchableOpacity
          style={styles.inputWrapper}
          //@ts-ignore
          onPress={() => navigation.navigate(SCREEN_NAME.search)}>
          <EvilIcons name="search" size={28} color={colors.darkGray} />

          <Text
            style={{
              color: colors.darkGray,
              fontFamily: FONTS.TEXT_SEMI_BOLD,
              fontSize: hp(18),
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
                          selectedIndex === index ? colors.primaryBg : '',
                        borderBottomWidth: selectedIndex === index ? 2 : 0,
                      }}>
                      <Text style={[styles.sliderText, {}]}>
                        {FormatText(option)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>

      {/* sort bottom sheet */}
      <SortSheet
        ref={SortSheetRef}
        //@ts-ignore */}
        filter={filter}
        setFilter={setFilter}
        openDateFilter={openSortDateSheet}
        changeSort={changeSort}
      />

      {/* Date sort sheet */}
      <SortByDate
        ref={SortDateRef}
        // @ts-ignore
        filter={filter}
        setFilter={setFilter}
        setDateIndex={setDateIndex}
        DateIndex={DateIndex}
        closeSortDateSheet={closeSortDateSheet}
      />

      {/* select date sheet */}
      {/* <DateInput ref={DateRef} DateIndex={DateIndex} /> */}
    </View>
  );
};

export default memo(MessageHeader);

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

    right: wp(4),
    top: hp(4),
    elevation: 3,
    zIndex: 3,

    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: colors.light,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(12),
    textAlign: 'center',
  },

  headerTitleText: {
    fontSize: hp(20),

    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginVertical: hp(10),
    height: hp(45),
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
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(20),
    paddingBottom: 5,
    color: colors.dark,
  },
});
