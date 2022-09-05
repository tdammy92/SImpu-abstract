import {StyleSheet, View} from 'react-native';
import React from 'react';
import EmptyInbo from 'src/assets/images/EmptyInbox.svg';
import {hp, wp} from 'src/utils';

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
    width: '80%',
    height: '100%',
    alignItems: 'center',
    marginTop: hp(40),
  },
});
