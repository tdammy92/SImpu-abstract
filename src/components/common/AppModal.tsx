import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CloseIcon from 'src/assets/images/Close_Icon.svg';
import {hp, wp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';

const AppModal = ({showModal, closeModal, message, Icon, btnTitle}: any) => {
  return (
    <Modal isVisible={showModal} animationIn="zoomIn" style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={closeModal}
          style={{position: 'absolute', top: 15, right: 12}}>
          {/* <AntDesign name="closecircleo" size={25} color={'gray'} /> */}
          <CloseIcon style={{elevation: 2, zIndex: 2}} />
        </TouchableOpacity>
        {/* {isALoader && (
          <View style={styles.loaderConatiner}>
            <ActivityIndicator
              size={'large'}
              color="#276EF1"
              animating={isALoader}
            />
            <Text style={styles.loadingText}>Please Wait</Text>
          </View>
        )} */}
        {/* {!isALoader && ( */}
        <>
          <View style={styles.messageContainer}>
            {Icon && <Icon />}
            <Text style={styles.messageText}>{message}</Text>
          </View>

          {/* <View style={styles.btnContainer}>
            <Button title={btnTitle} onPress={() => setShowModal(false)} />
          </View> */}
        </>
        {/* )} */}
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
    backgroundColor: colors.light,
    height: '30%',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderConatiner: {},
  loadingText: {
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    textAlign: 'center',
    paddingVertical: hp(10),
  },
  messageContainer: {paddingVertical: hp(15), alignItems: 'center'},
  messageText: {
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
  },
  btnContainer: {
    width: '70%',
  },
});
