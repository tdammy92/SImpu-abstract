import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import SelectDropdown from 'react-native-select-dropdown';
import {hp, wp} from 'src/utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, FONTS} from 'src/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FormatText} from 'src/utils/string-utils/string';
import SortByDate from './SortByDate';

type Props = {
  ref: RBSheetProps;
};

const {height} = Dimensions.get('screen');

const SheetHeight = Math.floor(height * 0.3);

const SortSheet = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {changeSort, openDateFilter, filter, setFilter}: any = props;

  const sortBy = [
    {name: 'newest', icon: 'sort-bool-descending-variant'},
    {name: 'oldest', icon: 'sort-bool-ascending-variant'},
    {name: 'unread', icon: 'sort-bool-descending'},
  ];

  const handleSort = (index: any) => {
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
          backgroundColor: '#000',
        },
        container: {
          borderTopLeftRadius: hp(15),
          borderTopRightRadius: hp(15),
          backgroundColor: '#E5E4E2',
          padding: 0,
        },
      }}>
      <KeyboardAvoidingView>
        <View style={styles.sortContainer}>
          <Text style={styles.sortTitle}>Sort by</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <EvilIcons name="undo" size={28} color={colors.dark} />
          </TouchableOpacity>
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

            <TouchableOpacity style={styles.listItem} onPress={openDateFilter}>
              <View style={styles.leftSide}>
                <AntDesign name="calendar" size={20} color={colors.dark} />
                <Text style={styles.sortText}>Date Filter</Text>
              </View>
              {/* {sort === sortItem.name && (
                      <AntDesign name="checkcircleo" size={20} color="#000" />
                    )} */}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
});

export default memo(SortSheet);

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  sortTitle: {
    textAlign: 'center',
    fontSize: hp(18),
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
    borderRadius: hp(10),
    elevation: 2,
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
    fontSize: hp(16),
    color: colors.dark,
    marginLeft: wp(10),
  },
});
