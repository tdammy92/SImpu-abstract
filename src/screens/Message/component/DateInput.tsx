import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {forwardRef, Fragment, memo, useState} from 'react';
import Modal from 'react-native-modal';
import DatePicker, {
  ModernDatepickerProps,
  getFormatedDate,
} from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {Divider, Text} from '@ui-kitten/components';
import {endOfDay, format, formatISO, startOfDay} from 'date-fns';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';

const {height} = Dimensions.get('screen');

type Props = {
  ref: RBSheetProps;
  DateIndex?: number;
  setFilter: any;
  closeSortDateSheet: any;
};

const SheetHeight = Math.floor(height * 0.25);

const DateInput = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {DateIndex, setFilter, closeSortDateSheet}: any = props;

  //specific date
  const [ShowSpecificDate, setShowSpecificDate] = useState(false);
  const [SpecificDate, setSpecificDate] = useState<any>(() =>
    format(new Date(), 'yyyy/M/d'),
  );

  //start date
  const [ShowStartDate, setShowStartDate] = useState(false);
  const [StartDate, setStartDate] = useState<any>(() =>
    format(new Date(), 'yyyy/M/d'),
  );

  //end date
  const [ShowEndDate, setShowEndDate] = useState(false);
  const [EndDate, setEndDate] = useState<any>(() =>
    format(new Date(), 'yyyy/M/d'),
  );

  const handleSelectedDate = (date: string) => {
    const specificDate = {
      start: formatISO(new Date(date)),
      end: formatISO(endOfDay(new Date(date))),
    };

    setFilter((Prev: any) => ({
      ...Prev,
      startDate: specificDate?.start,
      endDate: specificDate?.end,
    }));

    closeSortDateSheet();
  };

  const EndDateRange = (endDate: string) => {
    setFilter((Prev: any) => ({
      ...Prev,
      startDate: formatISO(new Date(StartDate)),
      endDate: formatISO(endOfDay(new Date(endDate))),
    }));

    closeSortDateSheet();
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
          <Text style={styles.sortTitle}>
            {DateIndex === 2 ? 'Specific Date' : 'Date Range'}
          </Text>
          <View style={styles.sortCard}>
            {DateIndex === 2 && (
              <TouchableOpacity
                onPress={() => setShowSpecificDate(true)}
                style={[
                  styles.dateBox,
                  {
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text style={styles.dateBoxText}>Date</Text>
                <Text style={styles.dateBoxText}>{SpecificDate}</Text>
                <AntDesign name="calendar" size={18} color="#000" />
              </TouchableOpacity>
            )}
            {DateIndex === 3 && (
              <View
                style={[
                  styles.dateBox,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  },
                ]}>
                {/* start date box  */}
                <TouchableOpacity
                  onPress={() => setShowStartDate(true)}
                  style={{
                    flexDirection: 'row',
                    width: '45%',

                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.dateBoxText}>Start</Text>
                  <Text style={[styles.dateBoxText, {fontSize: hp(12)}]}>
                    {StartDate}
                  </Text>
                  <AntDesign name="calendar" size={18} color="#000" />
                </TouchableOpacity>

                {/* line divider box */}
                <View style={{width: 2, backgroundColor: 'gray'}} />

                {/* end date box */}
                <TouchableOpacity
                  onPress={() => setShowEndDate(true)}
                  style={{
                    flexDirection: 'row',

                    width: '45%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.dateBoxText}>End</Text>
                  <Text style={[styles.dateBoxText, {fontSize: hp(12)}]}>
                    {EndDate}
                  </Text>

                  <AntDesign name="calendar" size={18} color="#000" />
                </TouchableOpacity>
              </View>
            )}

            {/* Specific date calendar modal */}
            <Modal
              isVisible={ShowSpecificDate}
              animationIn="zoomIn"
              style={styles.modalStyle}>
              <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.dateTitleText}>Specific Date</Text>
                </View>

                <DatePicker
                  mode="calendar"
                  onSelectedChange={(date: any) => {
                    setSpecificDate(date);
                  }}
                  onDateChange={(date: any) => {
                    handleSelectedDate(date);
                    setTimeout(() => setShowSpecificDate(false), 200);
                  }}
                  maximumDate={`${format(new Date(), 'yyyy-M-d')}`}
                  current={`${SpecificDate}`}
                  selected={`${SpecificDate}`}
                  options={styles.datePickerContentStyle}
                  style={styles.DatePickerContainerStyle}
                />
              </View>
            </Modal>
            {/* Start date calendar modal */}
            <Modal
              isVisible={ShowStartDate}
              animationIn="zoomIn"
              style={styles.modalStyle}>
              <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.dateTitleText}>Start Date</Text>
                </View>

                <DatePicker
                  mode="calendar"
                  onSelectedChange={(date: any) => setStartDate(date)}
                  onDateChange={date => {
                    // StartDateRange(date);
                    setTimeout(() => setShowStartDate(false), 200);
                  }}
                  maximumDate={`${format(new Date(), 'yyyy-M-d')}`}
                  current={`${SpecificDate}`}
                  selected={`${SpecificDate}`}
                  options={styles.datePickerContentStyle}
                  style={styles.DatePickerContainerStyle}
                />
              </View>
            </Modal>
            {/* End date calendar modal */}
            <Modal
              isVisible={ShowEndDate}
              animationIn="zoomIn"
              style={styles.modalStyle}>
              <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.dateTitleText}>End Date</Text>
                </View>

                <DatePicker
                  mode="calendar"
                  onSelectedChange={(date: any) => setEndDate(date)}
                  onDateChange={date => {
                    EndDateRange(date);
                    setTimeout(() => setShowEndDate(false), 200);
                  }}
                  current={`${SpecificDate}`}
                  selected={`${SpecificDate}`}
                  options={styles.datePickerContentStyle}
                  style={styles.DatePickerContainerStyle}
                  maximumDate={`${format(new Date(), 'yyyy-M-d')}`}
                />
              </View>
            </Modal>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
});

export default memo(DateInput);

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  sortTitle: {
    textAlign: 'center',
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    marginVertical: hp(5),
  },
  sortCard: {
    backgroundColor: colors.light,

    height: '90%',
    width: '97%',
    borderRadius: hp(10),
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  dateBox: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    marginV: hp(15),
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dateBoxText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: hp(14),
  },

  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: colors.light,
    height: '43%',
    width: '90%',
    borderRadius: 10,
  },

  headerContainer: {
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.bootomHeaderBg,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },

  datePickerContentStyle: {
    textHeaderColor: colors.dark,
    textDefaultColor: colors.dark,
    selectedTextColor: colors.light,
    backgroundColor: 'white',
    mainColor: 'gray',
    textSecondaryColor: colors.dark,
    borderColor: 'gray',
    textFontSize: 14,
    fontFamily: FONTS.TEXT_REGULAR,
  },

  DatePickerContainerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  dateTitleText: {
    fontSize: 16,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 5,
  },
});
