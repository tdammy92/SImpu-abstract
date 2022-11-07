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
} from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {Divider, Text} from '@ui-kitten/components';
import {format} from 'date-fns';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';

const {height} = Dimensions.get('screen');

type Props = {
  ref: RBSheetProps;
  DateIndex?: number;
};

const SheetHeight = Math.floor(height * 0.25);

const DateInput = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const [ShowSpecificDate, setShowSpecificDate] = useState(false);
  const [SpecificDate, setSpecificDate] = useState<any>(new Date());
  const {DateIndex}: any = props;
  const handleSort = (index: any) => {
    // changeSort(sortBy[index]?.name);
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
            {DateIndex === 2 ? 'Select Date' : 'Date Range'}
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
                <Text>Date</Text>
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
                <View
                  style={{
                    flexDirection: 'row',
                    width: '45%',

                    justifyContent: 'space-between',
                  }}>
                  <Text>Start</Text>
                  <AntDesign name="calendar" size={18} color="#000" />
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    width: '45%',
                    justifyContent: 'space-between',
                  }}>
                  <Text>End</Text>
                  <AntDesign name="calendar" size={18} color="#000" />
                </View>
              </View>
            )}

            <Modal
              isVisible={ShowSpecificDate}
              animationIn="zoomIn"
              style={styles.modalStyle}>
              <View style={styles.modalContainer}>
                <Text style={styles.dateTitle}>Specific Date</Text>
                <DatePicker
                  mode="calendar"
                  onSelectedChange={(date: any) => setSpecificDate(date)}
                  current="2020-07-23"
                  selected="2020-07-23"
                  options={{
                    // backgroundColor: '#fff',
                    textHeaderColor: '#000',
                    textDefaultColor: '#000',
                    selectedTextColor: '#026AE8',

                    mainColor: 'gray',
                    textSecondaryColor: '#000',
                    borderColor: 'gray',
                    textFontSize: 14,
                  }}
                  style={
                    {
                      // borderRadius: 10,
                      // borderColor: 'gray',
                      // borderWidth: 1,
                    }
                  }
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
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    marginVertical: hp(5),
  },
  sortCard: {
    backgroundColor: '#FFF',

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

    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: '50%',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
  },

  dateTitle: {
    fontSize: 16,
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
    textTransform: 'uppercase',
  },
});
