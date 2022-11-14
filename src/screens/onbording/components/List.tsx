import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';

const List = ({item}: any) => {
  const {width, height} = Dimensions.get('screen');
  // console.log(typeof item.id);
  // console.log('width', width, 'height', height);
  // console.log('Statusbar height', StatusBar.currentHeight);
  return (
    <View style={[styles.container, {flex: 1}]}>
      <Text style={[styles.text, {width: width - 40}]}>{item.text}</Text>
      <View style={styles.imageContainer}>
        <Image
          style={[
            styles.image,
            {
              width: +`${width}`,
              // width: width,
              // height: height / 2,
              resizeMode: 'contain',
              // paddingLeft: item.id === '1' || item.id === 3 ? 30 : 0,
            },
          ]}
          source={item.image}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    position: 'relative',
  },

  text: {
    textAlign: 'left',
    width: '70%',
    marginTop: StatusBar.currentHeight,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(26),
    paddingVertical: hp(15),
    paddingHorizontal: hp(15),
    color: '#fff',
  },
  imageContainer: {
    width: '80%',
    height: '80%',

    marginTop: hp(20),
  },
  image: {
    flex: 0.7,
    paddingHorizontal: wp(20),
  },
});
