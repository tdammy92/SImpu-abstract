import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Divider, Text} from '@ui-kitten/components';
import React, {useState, forwardRef} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {hp, wp} from 'src/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FONTS, colors} from 'src/constants';

type Props = {
  ref: RBSheetProps;
  handlePress: any;
};

const {height} = Dimensions.get('screen');
const SheetHeight = Math.floor(height / 4);
const LogoutSheet = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {handlePress} = props;

  return (
    //@ts-ignore
    <RBSheet
      ref={ref}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(105,105,105,0.7)',
        },
        draggableIcon: {
          backgroundColor: 'rgba(255,255,255,0.9)',
        },
        container: {
          borderTopLeftRadius: hp(10),
          borderTopRightRadius: hp(10),
          backgroundColor: 'rgba(255,255,255,0.9)',
          height: SheetHeight,
        },
      }}>
      <View style={styles.sortContainer}>
        <Text style={styles.signOutText}>Sign Out</Text>
        <Divider />

        <View style={styles.signOutContent}>
          <Text style={styles.messageText}>
            You are about to sign out your simpu account.
          </Text>

          <TouchableOpacity style={styles.confirmBtn} onPress={handlePress}>
            <Ionicons name="exit-outline" color={colors.dark} size={30} />
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
});

export default LogoutSheet;

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },

  signOutContent: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    textAlign: 'center',
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_SEMI_BOLD,

    color: colors.dark,
  },

  messageText: {
    marginTop: 10,
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: hp(15),
    paddingVertical: hp(8),
    paddingHorizontal: wp(15),
    alignItems: 'center',
    borderRadius: hp(10),
  },

  confirmText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(18),
    marginLeft: wp(15),
  },
});
