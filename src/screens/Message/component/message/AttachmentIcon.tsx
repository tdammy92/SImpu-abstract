import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {imageType, audioType, videoType, docType} from 'src/constants';

const AttachmentIcon = (type: any) => {
  if (audioType.includes(type?.type)) {
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
  if (videoType.includes(type?.type)) {
    return (
      <FontAwesome
        name={'video-camera'}
        size={17}
        color={colors.darkGray}
        style={styles.icons}
      />
    );
  }
  if (imageType.includes(type?.type))
    return (
      <FontAwesome
        name={'camera'}
        size={17}
        color={colors.darkGray}
        style={styles.icons}
      />
    );
  if (type?.type === 'pdf')
    return (
      <FontAwesome
        name={'file-pdf-o'}
        size={17}
        color={colors.darkGray}
        style={styles.icons}
      />
    );

  return (
    <FontAwesome
      name={'file-text-o'}
      size={17}
      color={colors.darkGray}
      style={styles.icons}
    />
  );
};

export default AttachmentIcon;

const styles = StyleSheet.create({
  icons: {
    // marginLeft: hp(10),
    // paddingLeft: hp(10),
  },
});
