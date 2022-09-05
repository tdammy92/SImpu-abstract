import {
  StyleSheet,
  View,
  GestureResponderEvent,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Divider, Text} from '@ui-kitten/components';

import React, {useState, useRef, forwardRef} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {hp, wp} from 'src/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONTS} from 'src/constants';

type Props = {
  ref: RBSheetProps;
};

const {height} = Dimensions.get('screen');

const SortSheet = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  return (
    //@ts-ignore
    <RBSheet
      ref={ref}
      height={height / 3}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
          // backgroundColor: '#fefefe',
        },
        draggableIcon: {
          backgroundColor: '#000',
          // backgroundColor: '#276EF1',
        },
        container: {
          borderTopLeftRadius: hp(30),
          borderTopRightRadius: hp(30),
          backgroundColor: '#E5E4E2',
          padding: 0,
        },
      }}>
      <View style={styles.sortContainer}>
        <Text style={styles.sortTitle}>Sort by</Text>
        <View style={styles.sortCard}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.leftSide}>
              {/* <Octicons name="sort-asc" size={23} color="#000" /> */}
              <MaterialCommunityIcons
                name="sort-bool-descending-variant"
                size={23}
                color="#000"
              />
              <Text style={styles.sortText}>Newest</Text>
            </View>
            <AntDesign name="check" size={23} color="#000" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.leftSide}>
              <MaterialCommunityIcons
                name="sort-bool-ascending-variant"
                size={23}
                color="#000"
              />
              {/* <Octicons name="sort-desc" size={23} color="#000" /> */}
              <Text style={styles.sortText}>Oldest</Text>
            </View>
            <AntDesign name="check" size={23} color="#FFF" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.leftSide}>
              <MaterialCommunityIcons
                name="sort-bool-descending"
                size={23}
                color="#000"
              />
              <Text style={styles.sortText}>Newest Unreplied</Text>
            </View>
            <AntDesign name="check" size={23} color="#FFF" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.leftSide}>
              <MaterialCommunityIcons
                name="sort-bool-ascending"
                size={23}
                color="#000"
              />
              <Text style={styles.sortText}>Oldest Unreplied</Text>
            </View>
            <AntDesign name="check" size={23} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
});

export default SortSheet;

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    //     justifyContent: 'center',
  },
  sortTitle: {
    textAlign: 'center',
    fontSize: hp(18),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    marginVertical: hp(5),
  },
  sortCard: {
    backgroundColor: '#FFF',
    height: '70%',
    width: '90%',
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
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    color: '#000',
    marginLeft: wp(15),
  },
});
