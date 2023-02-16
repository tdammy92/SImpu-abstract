import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Loader,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';
import {hp, wp} from 'src/utils';

const CustomerLoader = () => {
  const [Count, setCount] = useState([1, 1, 1, 1]);
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', paddingHorizontal: hp(10)}}
      style={{}}>
      {Count?.map((_, i) => (
        <Placeholder
          Animation={ShineOverlay}
          key={`${i}`}
          style={{alignItems: 'center', justifyContent: 'center'}}
          Left={() => (
            <PlaceholderMedia
              style={{
                height: hp(30),
                width: hp(30),
                borderRadius: hp(30 * 0.5),
              }}
            />
          )}>
          <PlaceholderLine
            width={80}
            style={{marginLeft: wp(4), marginTop: hp(10)}}
          />
        </Placeholder>
      ))}
    </ScrollView>
  );
};

export default CustomerLoader;

const styles = StyleSheet.create({});
