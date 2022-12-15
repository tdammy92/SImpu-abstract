import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import MusicIcon from 'src/assets/images/thumbnail/MusicIcon.svg';

const AttachmentIcon = (type: any) => {
  if (type?.type === 'mp3') {
    return (
      //  <MusicIcon />
      <MaterialIcons
        name={'headset'}
        size={20}
        color={colors.darkGray}
        style={styles.icons}
      />
    );
  }
  if (type?.type === 'mp4') {
    return (
      <FontAwesome
        name={'video-camera'}
        size={14}
        color={colors.darkGray}
        style={styles.icons}
      />
    );
  }
  if (type?.type === 'jpg')
    return (
      <FontAwesome
        name={'camera'}
        size={16}
        color={colors.darkGray}
        style={styles.icons}
      />
    );
  if (type?.type === 'pdf')
    return (
      <FontAwesome
        name={'file-pdf-o'}
        size={16}
        color={colors.darkGray}
        style={styles.icons}
      />
    );

  return (
    <FontAwesome
      name={'file-text-o'}
      size={16}
      color={colors.darkGray}
      style={styles.icons}
    />
  );
};

export default AttachmentIcon;

const styles = StyleSheet.create({
  icons: {
    marginLeft: hp(10),
    paddingLeft: hp(10),
  },
});
