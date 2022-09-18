import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import EmptyNotification from 'src/assets/images/EmptyNotification.svg';
import {hp, wp} from 'src/utils';

const {width, height} = Dimensions.get('screen');

const EmptyNotify = () => {
  return (
    <View style={styles.emptyContainerView}>
      <EmptyNotification height={hp(150)} width={wp(150)} />
    </View>
  );
};

export default EmptyNotify;

const styles = StyleSheet.create({
  emptyContainerView: {
    // borderWidth: 1,

    // borderColor: 'red',

    alignItems: 'center',

    marginTop: height * 0.15,
  },
});
