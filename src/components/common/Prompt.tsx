import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, memo} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CloseIcon from 'src/assets/images/Close_Icon.svg';
import {hp, wp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';

type Prompt = {
  showModal: boolean;
  message: string;
  Icon: any;
  closeModal: () => void;
};

const Prompt = ({showModal, closeModal, message, Icon}: Prompt) => {
  return (
    <Modal isVisible={showModal} animationIn="zoomIn" style={styles.modalStyle}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={closeModal}
          style={{position: 'absolute', top: 15, right: 12}}>
          <CloseIcon style={{elevation: 2, zIndex: 2}} />
        </TouchableOpacity>

        <>
          <View style={styles.messageContainer}>
            {Icon && <Icon />}
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </>
      </View>
    </Modal>
  );
};

export default memo(Prompt);

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
    fontSize: FontSize.MediumText,
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
