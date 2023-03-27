import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
} from 'rn-placeholder';
import {hp, wp} from 'src/utils';
import {Divider} from '@ui-kitten/components';
import {colors} from 'src/constants';

const NotificationLoaer = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {Array(10)
        .fill(1)
        ?.map((_, i) => {
          return (
            <View key={`${i}`} style={styles.item}>
              <Placeholder
                Animation={ShineOverlay}
                Left={() => (
                  <PlaceholderMedia
                    style={{
                      marginRight: wp(15),
                      height: hp(40),
                      width: hp(40),
                      borderRadius: hp(40 * 0.5),
                    }}
                  />
                )}>
                <PlaceholderLine width={80} height={20} />
                <PlaceholderLine width={70} height={20} />

                <PlaceholderLine width={30} height={18} />
              </Placeholder>
              {/* <Divider /> */}
            </View>
          );
        })}
    </ScrollView>
  );
};

export default memo(NotificationLoaer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(20),
  },

  item: {
    height: hp(100),
    paddingHorizontal: wp(15),
    //     paddingVertical: hp(10),
    marginVertical: hp(5),
    borderBottomColor: colors.bootomHeaderBg,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
