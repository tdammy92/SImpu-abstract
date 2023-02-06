import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import EmptyInbo from 'src/assets/images/Empty.svg';
import {hp, wp} from 'src/utils';

const {width, height} = Dimensions.get('screen');

const EmptyInbox = () => {
  return (
    <View style={styles.emptyContainerView}>
      <EmptyInbo height={hp(150)} width={wp(150)} />
    </View>
  );
};

export default EmptyInbox;

const styles = StyleSheet.create({
  emptyContainerView: {
    alignItems: 'center',
    marginTop: height * 0.15,
  },
});
