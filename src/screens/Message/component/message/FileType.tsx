import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from 'src/utils';

const FileType = (type: any) => {
  if (type?.type === 'mp3') return <Text style={styles.fileText}> Audio</Text>;
  if (type?.type === 'mp4') return <Text style={styles.fileText}> Video</Text>;
  if (type?.type === 'jpg') return <Text style={styles.fileText}> Photo</Text>;
  if (type?.type === 'png') return <Text style={styles.fileText}> Photo</Text>;
  if (type?.type === 'jpeg') return <Text style={styles.fileText}> Photo</Text>;
  if (type?.type === 'pdf') return <Text style={styles.fileText}> Pdf</Text>;

  return <Text style={styles.fileText}> File</Text>;
};

export default FileType;

const styles = StyleSheet.create({
  fileText: {},
});
