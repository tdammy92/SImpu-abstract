import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'src/components/common/Button';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';

const AppModal = ({showModal, setShoModal, message, Icon, isALoader}: any) => {
  return (
    <Modal isVisible={showModal} animationIn="zoomIn" style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        {isALoader && (
          <View style={styles.loaderConatiner}>
            <ActivityIndicator
              size={'large'}
              color="#276EF1"
              animating={isALoader}
            />
            <Text style={styles.loadingText}>Please Wait</Text>
          </View>
        )}
        {!isALoader && (
          <>
            <View style={styles.messageContainer}>
              {/* <Ionicons
                name="mail-unread-outline"
                size={hp(60)}
                color="#276EF1"
              /> */}
              {/* <AntDesign name="checkcircleo" size={hp(60)} color="#276EF1" /> */}
              {/* <AntDesign name="closecircleo" size={hp(60)} color="#276EF1" /> */}

              {Icon && <Icon />}
              <Text style={styles.messageText}>{message}</Text>
            </View>

            {/* <View style={styles.btnContainer}>
              <Button title="Close" onPress={() => setShoModal(false)} />
            </View> */}
          </>
        )}
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: '30%',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderConatiner: {},
  loadingText: {
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
    textAlign: 'center',
    paddingVertical: hp(10),
  },
  messageContainer: {paddingVertical: hp(15), alignItems: 'center'},
  messageText: {
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
  },
  btnContainer: {
    width: '70%',
  },
});
