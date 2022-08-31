import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Button } from 'src/components/common/Button';
import { hp } from 'src/utils';

const ReviewRequest = () => {
  return (
    <View>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/background.png')}
      >
        <View style={styles.lowerContainer}>
          <Text style={styles.textStyle}>Recipient</Text>
          <Image
            style={styles.imageStyle}
            source={require('../../../assets/images/user.png')}
          />
          <Text style={styles.nameText}>Nimi Martins</Text>
        </View>
      </ImageBackground>
      <View style={styles.description}>
        <View style={styles.displayCard}>
          <Text style={styles.label}>Item</Text>
          <Text>Your share of last night’s bill</Text>
        </View>
        <View style={styles.displayCard}>
          <Text style={styles.label}>Total Amount </Text>
          <Text style={styles.amount}>₦ 6300.00</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button title="Share" />
        </View>
        <Text style={styles.notice}>You have 15 free transfers left.</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    height: hp(200),
    resizeMode: 'contain',
  },
  lowerContainer: {
    alignItems: 'center',
    height: hp(150),
    justifyContent: 'center',
    marginVertical: 20,
  },
  textStyle: {
    color: '#0A0748',
    fontSize: hp(17),
    lineHeight: 22,
  },
  nameText: {
    color: '#0A0748',
    fontWeight: '600',
    fontSize: hp(17),
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginVertical: 5,
  },
  description: {
    borderTopColor: 'rgba(111, 127, 175, 0.2)',
    borderTopWidth: 1,
    padding: 25,
  },
  displayCard: {
    height: hp(80),
    backgroundColor: '#F0EEFD',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: hp(16),
    lineHeight: 24,
  },
  amount: {
    fontSize: hp(20),
  },
  btnContainer: {
    marginVertical: 20,
  },
  notice: {
    textAlign: 'center',
    color: '#0A0748',
    marginTop: 15,
  },
});

export default ReviewRequest;
