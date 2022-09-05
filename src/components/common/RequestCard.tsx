/* eslint-disable react-native/no-inline-styles */
import { Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { globalStyles } from 'src/styles';
import { hp } from 'src/utils';
import { ActionButton } from './ActionBtn';

const RequestCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.date}>12/12/2022</Text>
      <View style={[globalStyles.rowBetween, styles.lower]}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/avatar.png')}
        />
        <View style={styles.innerWidth}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Nimi Martins </Text>is
            requesting $2000 for “the pink and yellow dress”
          </Text>
        </View>
      </View>
      <View style={globalStyles.rowBetween}>
        <ActionButton
          color="#5ACA75"
          bg="#EDF9F0"
          borderColor="transparent"
          title="Accept"
        />
        <ActionButton
          color="#DA1414"
          bg="#FEEFEF"
          borderColor="transparent"
          title="Reject"
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    padding: 15,
    borderRadius: 5,
    marginTop: hp(20),
    minHeight: hp(120),
  },
  date: {
    color: '#1B1212',
    opacity: 0.5,
    fontSize: hp(12),
  },
  lower: {
    marginVertical: 10,
  },
  innerWidth: {
    width: '80%',
  },
  avatar: {
    borderRadius: 25,
  },
});

export default RequestCard;
