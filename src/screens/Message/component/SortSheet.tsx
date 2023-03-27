import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Divider, Text} from '@ui-kitten/components';

import React, {
  useState,
  useRef,
  forwardRef,
  memo,
  useMemo,
  useCallback,
  Fragment,
} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {hp, wp} from 'src/utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, FONTS, FontSize} from 'src/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FormatText} from 'src/utils/string-utils/string';
import SortByDate from './SortByDate';

type Props = {
  ref: RBSheetProps;
};

const {height} = Dimensions.get('screen');

const SheetHeight = Math.floor(height * 0.35);

const SortSheet = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {changeSort, openDateFilter, filter, setFilter}: any = props;

  const sortBy = [
    {name: 'newest', icon: 'sort-bool-descending-variant'},
    {name: 'oldest', icon: 'sort-bool-ascending-variant'},
    {name: 'unread', icon: 'sort-bool-descending'},
    {name: 'Date Filter', icon: 'calendar-month-outline'},
  ];

  const handleSort = (index: any) => {
    if (index === 3) {
      openDateFilter();
      return;
    }

    // console.log('it gote here');

    changeSort(sortBy[index]?.name);
  };

  //Reset button
  const handleReset = () => {
    setFilter(() => ({
      sortbyFilter: 'newest',
      startDate: undefined,
      endDate: undefined,
    }));

    //@ts-ignore
    ref.current.close();
  };

  return (
    //@ts-ignore
    <RBSheet
      ref={ref}
      openDuration={250}
      closeOnDragDown
      height={SheetHeight}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(105,105,105,0.7)',
        },
        draggableIcon: {
          backgroundColor: colors.bootomHeaderBg,
        },
        container: {
          borderTopLeftRadius: hp(15),
          borderTopRightRadius: hp(15),
          backgroundColor: colors.light,
          padding: 0,
        },
      }}>
      <KeyboardAvoidingView>
        <ScrollView
          style={styles.sortContainer}
          contentContainerStyle={{alignItems: 'center', position: 'relative'}}>
          <Text style={styles.sortTitle}>Sort by</Text>
          <View style={styles.sortCard}>
            {sortBy.map((sortItem, i) => {
              return (
                <Fragment key={`${i}`}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => handleSort(i)}>
                    <View style={styles.leftSide}>
                      <MaterialCommunityIcons
                        name={sortItem.icon}
                        size={23}
                        color={colors.dark}
                      />
                      <Text style={styles.sortText}>
                        {FormatText(sortItem.name)}
                      </Text>
                    </View>
                    {filter?.sortbyFilter === sortItem?.name && (
                      <AntDesign
                        name="checkcircleo"
                        size={20}
                        color={colors.dark}
                      />
                    )}
                  </TouchableOpacity>
                  <Divider />
                </Fragment>
              );
            })}
            {/* <TouchableOpacity style={styles.listItem} onPress={openDateFilter}>
              <View style={styles.leftSide}>
                <AntDesign name="calendar" size={20} color={colors.dark} />
                <Text style={styles.sortText}>Date Filter</Text>
              </View>
            </TouchableOpacity> */}

            {/* reset */}
            <TouchableOpacity style={styles.listItem} onPress={handleReset}>
              <View style={styles.leftSide}>
                <MaterialCommunityIcons
                  name="backup-restore"
                  size={20}
                  color={colors.dark}
                />
                <Text style={styles.sortText}>Reset</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RBSheet>
  );
});

export default memo(SortSheet);

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    height: '100%',
  },
  sortTitle: {
    textAlign: 'center',
    fontSize: FontSize.BigText,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    marginVertical: hp(5),
  },

  resetButton: {
    position: 'absolute',
    height: hp(28),
    width: hp(28),
    right: hp(20),
    top: hp(-5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderRadius: hp(28 * 0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.39,

    elevation: 1,
    zIndex: 1,
  },
  sortCard: {
    backgroundColor: colors.light,
    height: '90%',
    width: '97%',
    // borderRadius: hp(10),
    // elevation: 2,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(18),
    paddingVertical: hp(10),
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sortText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.dark,
    marginLeft: wp(10),
  },
});
