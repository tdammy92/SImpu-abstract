import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import React from 'react';
import {hp} from 'src/utils';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';

const ImageViewer = ({imageData, isUser, message}: any) => {
  const {data} = imageData;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        //@ts-ignore
        navigation.navigate(SCREEN_NAME.imageView as never, {
          data,
          message,
        })
      }>
      <Image style={styles.imageStyle} source={{uri: imageData?.data?.url}} />
    </TouchableOpacity>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  imageStyle: {
    width: hp(180),
    height: hp(250),
    borderRadius: hp(5),
  },
});
