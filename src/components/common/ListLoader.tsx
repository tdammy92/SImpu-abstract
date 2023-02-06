import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//@ts-ignore
import ContentLoader, {Bullets} from 'react-native-easy-content-loader';
import {Divider} from '@ui-kitten/components';
import {hp, wp} from 'src/utils';

const ListLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: wp(5),
      }}>
      <View style={{height: hp(20)}} />

      {Array(8)
        .fill(1)
        .map((_, i) => (
          <React.Fragment key={`${i}`}>
            {/* @ts-ignore */}
            <ContentLoader
              avatar
              pRows={1}
              active
              pHeight={[15, 20]}
              pWidth={['100%', 100]}
              animationDuration={700}
              loading={true}
            />
            <Divider />
            <View style={{height: hp(30)}} />
          </React.Fragment>
        ))}
    </View>
  );
};

export default ListLoader;

const styles = StyleSheet.create({});
