import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
  Animated,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import React, {
  useState,
  memo,
  useRef,
  useCallback,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SidepanelIcon from 'src/assets/images/SidepanelIcon.svg';
import NotificationLabel from 'src/assets/images/notificationLabel.svg';
import {colors, FONTS, FontSize} from 'src/constants';
import {hp, wp} from 'src/utils';
import dummyData from 'src/constants/dummyData';
import {DrawerToggleButton} from '@react-navigation/drawer';
import {SCREEN_NAME} from 'src/navigation/constants';
import {FormatText} from 'src/utils/string-utils/string';
import SortSheet from '../SortSheet';
import SortByDate from '../SortByDate';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useNotificationTrayQuery} from 'src/services/query/queries';
import {getFeatureViewAnimation} from './utils';
// import {openDrawer} from 'src/index';

// import DateInput from './DateInput';

const AnimatedTouchIcon = Animated.createAnimatedComponent(TouchableOpacity);

type messageHeaderProps = {
  messageOption?: string[];
  shoMessageOptions?: boolean;
  handleSelectedIndex?: (index: number) => void;
  selectedIndex?: number;
  HandlePress?: () => void;
  name: string;
  filter: any;
  setFilter: any;
  animatedValue: any;
};

const MessageHeader = (props: messageHeaderProps) => {
  const navigation = useNavigation();
  const SortSheetRef = useRef<any>(null);
  const SortDateRef = useRef<any>(null);
  const DateRef = useRef<any>(null);
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const [maxHeaderHeight, setMaxHeaderHeight] = useState(100);
  // const [minHeaderHeight, setMinHeaderHeight] = useState(55);
  // const Scroll_Distance = maxHeaderHeight - minHeaderHeight;

  const excessHeight = Platform.OS === 'ios' ? 3 : 2;
  //@ts-ignore
  const totalHeight = maxHeaderHeight + StatusBar?.currentHeight * excessHeight;
  function getLayoutDetails(e: LayoutChangeEvent) {
    setMaxHeaderHeight(e?.nativeEvent?.layout?.height);
  }

  const {
    messageOption,
    shoMessageOptions,
    handleSelectedIndex,
    selectedIndex,
    HandlePress,
    filter,
    setFilter,
    name,
    animatedValue,
  } = props;

  const {
    data: notification,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useNotificationTrayQuery(
    {
      status: 'unread',
      page: 1,
      Auth: token,
      organisationId: organisation.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {},
      onError(error: any, variables: any, context: any) {
        // console.log('post message error', error);
      },
    },
  );

  const notificationsLenght = useMemo(() => {
    const cammmel = (notification?.pages ?? [])
      ?.map((res: any) => res?.data)
      ?.flat(2)?.length;

    return cammmel;
  }, [notification]);

  const [DateIndex, setDateIndex] = useState();

  const openDraw = () => navigation?.dispatch(DrawerActions?.openDrawer());

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

  const topMargin: number = Platform.OS === 'ios' ? hp(45) : hp(48);

  const titleViewAnimation = getFeatureViewAnimation(
    animatedValue,
    wp(55),
    -topMargin,
  );

  const featureIconAnimation = {
    opacity: animatedValue?.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      useNativeDriver: true,
      extrapolate: 'clamp',
    }),
  };

  const textAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 4],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [0, wp(35)],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const SearchContainerAnimation = {
    transform: [
      {
        scale: animatedValue?.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          useNativeDriver: true,
          extrapolate: 'clamp',
        }),
      },
    ],

    opacity: animatedValue?.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  // const diffClamp = Animated.diffClamp(animatedValue, 0, maxHeaderHeight);

  // const headerAnim = {
  //   height: animatedValue?.interpolate({
  //     inputRange: [0, maxHeaderHeight],
  //     outputRange: [totalHeight, 0],

  //     extrapolate: 'clamp',
  //   }),
  // };

  return (
    <Animated.View onLayout={getLayoutDetails} style={[styles.headerContainer]}>
      {/* first row buttons */}
      <View style={styles.headerRowContainer}>
        <TouchableOpacity onPress={openDraw}>
          <SidepanelIcon height={hp(38)} width={hp(35)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openNotification}>
          <View style={styles.badgeContainer}>
            {notificationsLenght > 0 ? <NotificationLabel /> : null}
          </View>
          <Ionicons
            name="notifications-outline"
            size={30}
            color={colors.darkGray}
          />
        </TouchableOpacity>
      </View>

      {/* second row buttons */}
      <Animated.View
        style={[
          styles.headerRowContainer,
          // titleViewAnimation,
          // {backgroundColor: 'red'},
        ]}>
        <Animated.Text style={[styles.headerTitleText]}>{name}</Animated.Text>

        {/* sort option slider view */}
        <AnimatedTouchIcon
          style={[featureIconAnimation]}
          onPress={openSortSheet}>
          <Octicons name="sort-asc" size={24} color={colors.darkGray} />
        </AnimatedTouchIcon>
      </Animated.View>

      {/* input container */}
      <Animated.View
        style={[
          styles.headerDetails,
          // SearchContainerAnimation,
          // {backgroundColor: 'blue'},
        ]}>
        <TouchableOpacity
          style={styles.inputWrapper}
          //@ts-ignore
          onPress={() => navigation.navigate(SCREEN_NAME.search)}>
          <EvilIcons name="search" size={28} color={colors.darkGray} />

          <Text
            style={{
              color: colors.darkGray,
              fontFamily: FONTS.TEXT_SEMI_BOLD,
              fontSize: FontSize.BigText,
              marginLeft: wp(5),
            }}>
            Search...
          </Text>
        </TouchableOpacity>

        {/* menu name view */}
        <View style={styles.sliderView}>
          {/* {!shoMessageOptions && <View />} */}
          {shoMessageOptions && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {messageOption?.map((option: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: hp(15),
                    }}
                    //@ts-ignore
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
      </Animated.View>

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
    </Animated.View>
  );
};

export default memo(MessageHeader);

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: 'yellow',
    // height: hp(55),
    // overflow: 'hidden',
    //@ts-ignore
    marginTop: hp(StatusBar?.currentHeight * 1.5),
    paddingHorizontal: wp(12),

    // elevation: 100,
    // zIndex: 100,
  },

  headerDetails: {
    marginVertical: hp(2),
  },

  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(10),
    // paddingHorizontal: wp(5),
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
    fontSize: FontSize.subHeadingText,
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

    shadowColor: colors.inputBg,
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
