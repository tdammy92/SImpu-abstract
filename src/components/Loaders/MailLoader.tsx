import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContentLoader, {InstagramLoader} from 'react-native-easy-content-loader';
import {hp, wp} from 'src/utils';
import {colors} from 'src/constants';

const MailLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingWrapper}>
        {/* @ts-ignore */}
        <InstagramLoader active aSize={hp(30)} />

        <View style={styles.buttonStyle}>
          {/* @ts-ignore */}
          <ContentLoader
            containerStyles={{width: '40%'}}
            active
            pRows={0}
            tHeight={hp(35)}
            tWidth={wp(90)}
          />
          {/* @ts-ignore */}
          <ContentLoader
            containerStyles={{width: '40%'}}
            active
            pRows={0}
            tHeight={hp(35)}
            tWidth={wp(90)}
          />
        </View>
      </View>
    </View>
  );
};

export default MailLoader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(15),
    marginTop: hp(15),
  },
  loadingWrapper: {
    //     backgroundColor: colors.bootomHeaderBg,
    padding: hp(5),
    borderRadius: hp(10),
  },

  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: hp(5),
  },
});
