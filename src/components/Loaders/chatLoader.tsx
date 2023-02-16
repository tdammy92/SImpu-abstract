import {StyleSheet, Text, View, ScrollView} from 'react-native';
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

const chatLoader = () => {
  const [Count, setCount] = useState([1, 1, 1, 1]);

  const Chat = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '50%',
            alignSelf: 'flex-end',
          }}>
          <Placeholder Animation={ShineOverlay} style={{width: '100%'}}>
            <PlaceholderLine
              width={wp(90)}
              height={hp(45)}
              style={{alignSelf: 'flex-end', borderBottomRightRadius: 0}}
            />
            {/* <PlaceholderLine
              width={wp(60)}
              height={hp(30)}
              style={{alignSelf: 'flex-end', borderBottomRightRadius: 0}}
            /> */}
          </Placeholder>
        </View>
        <View
          style={{
            width: '50%',
            alignSelf: 'flex-start',
          }}>
          <Placeholder Animation={ShineOverlay} style={{width: '100%'}}>
            <PlaceholderLine
              height={30}
              width={wp(100)}
              style={{borderBottomLeftRadius: 0}}
            />
            {/* <PlaceholderMedia
              style={{
                height: hp(120),
                width: wp(110),
                marginVertical: hp(10),
                borderRadius: hp(10),
                borderBottomLeftRadius: 0,
              }}
            /> */}

            <PlaceholderLine
              width={wp(130)}
              height={hp(35)}
              style={{borderBottomLeftRadius: 0}}
            />
          </Placeholder>
        </View>

        <View
          style={{
            width: '50%',
            alignSelf: 'flex-end',
          }}>
          <Placeholder Animation={ShineOverlay} style={{width: '100%'}}>
            <PlaceholderLine
              width={wp(90)}
              height={hp(35)}
              style={{alignSelf: 'flex-end', borderBottomRightRadius: 0}}
            />
            <PlaceholderLine
              width={wp(60)}
              height={hp(30)}
              style={{alignSelf: 'flex-end', borderBottomRightRadius: 0}}
            />
          </Placeholder>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: '100%',
        flex: 1,
        paddingHorizontal: wp(5),
        paddingTop: hp(15),
      }}>
      {Count.map((_, i) => (
        <Chat key={`${i}`} />
      ))}
    </ScrollView>
  );
};

export default chatLoader;

const styles = StyleSheet.create({});
