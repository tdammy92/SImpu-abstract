import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {forwardRef, Fragment, useRef, memo} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {Divider, Text} from '@ui-kitten/components';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';
import {FormatText} from 'src/utils/string-utils/string';
import {DateBy} from 'src/utils/helper';
import DateInput from './DateInput';
import {endOfDay, formatISO, startOfDay, subDays} from 'date-fns';

const {height} = Dimensions.get('screen');

type Props = {
  ref: RBSheetProps;
};

const SheetHeight = Math.floor(height * 0.34);

const SortByDate = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {setDateIndex, DateIndex, setFilter, closeSortDateSheet}: any = props;

  const DateRef = useRef<any>(null);

  const handleSort = (index: any) => {
    setDateIndex(index);
    if (index === 0) {
      //date formting
      const todaysDate = {
        start: formatISO(startOfDay(new Date())),
        end: formatISO(endOfDay(new Date())),
      };

      //updating the filter state with the new value
      setFilter((Prev: any) => ({
        ...Prev,
        startDate: todaysDate.start,
        endDate: todaysDate.end,
      }));
      closeSortDateSheet();
    }

    if (index === 1) {
      // date formating
      const yesterday = subDays(new Date(), 1);
      const yesterdaysDate = {
        start: formatISO(startOfDay(yesterday)),
        end: formatISO(endOfDay(yesterday)),
      };

      //updating the filter state with the new value
      setFilter((Prev: any) => ({
        ...Prev,
        startDate: yesterdaysDate.start,
        endDate: yesterdaysDate.end,
      }));
      closeSortDateSheet();
    }
    if (index === 2 || index === 3) openDateSheet();
  };

  //open Date Sort by filter sheet code
  const openDateSheet = () => {
    if (DateRef.current) {
      DateRef.current.open();
    }
  };

  //close Sort by filter sheet
  const closeDateSheet = () => {
    if (DateRef.current) {
      DateRef.current.close();
    }
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
          <Text style={styles.sortTitle}>Sort by Date</Text>
          <View style={styles.sortCard}>
            {DateBy.map((sortItem, i) => {
              const {name, sample, Icon} = sortItem;
              return (
                <Fragment key={`${i}`}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => handleSort(i)}>
                    <View style={styles.leftSide}>
                      <MaterialCommunityIcons
                        name={Icon}
                        size={20}
                        color="#555"
                      />
                      <View>
                        <Text style={styles.sortText}>{FormatText(name)}</Text>

                        {sample && (
                          <Text style={styles.sortTextSample}>{sample}</Text>
                        )}
                      </View>
                    </View>
                    {i === DateIndex && (
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
          </View>
        </View>
        {/* select date sheet */}
        <DateInput
          ref={DateRef}
          closeSortDateSheet={closeSortDateSheet}
          DateIndex={DateIndex}
          setFilter={setFilter}
        />
      </KeyboardAvoidingView>
    </RBSheet>
  );
});

export default memo(SortByDate);

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  sortTitle: {
    textAlign: 'center',
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    marginVertical: hp(5),
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
    fontSize: hp(15),
    color: '#000',
    marginLeft: wp(10),
  },
  sortTextSample: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(11),
    color: 'gray',
    marginLeft: wp(10),
  },
});
