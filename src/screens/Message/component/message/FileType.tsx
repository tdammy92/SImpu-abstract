import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {imageType, audioType, videoType, docType} from 'src/constants';

const FileType = (type: any) => {
  if (audioType.includes(type?.type))
    return <Text style={styles.fileText}> Audio</Text>;
  if (videoType.includes(type?.type))
    return <Text style={styles.fileText}> Video</Text>;
  if (imageType.includes(type?.type))
    return <Text style={styles.fileText}> Photo</Text>;

  if (type?.type === 'pdf') return <Text style={styles.fileText}> Pdf</Text>;

  return <Text style={styles.fileText}> File</Text>;
};

export default FileType;

const styles = StyleSheet.create({
  fileText: {},
});
