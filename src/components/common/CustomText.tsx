import {StyleSheet, Text, View, Linking} from 'react-native';
import React, {memo} from 'react';
import {colors} from 'src/constants';
import {mentionType} from 'src/@types/inbox';

type CustomTextProps = {
  text: string;
  mentions?: mentionType[];
};

const CustomText = ({text, mentions}: CustomTextProps) => {
  const newText = text.split(' ');
  const MentionNames = mentions?.map(meen => {
    return meen?.name;
  });

  //   console.log('mentions', JSON.stringify(MentionNames, null, 2));
  return (
    <Text>
      {newText.map((tex: string, idx: number) => {
        if (tex.startsWith('@')) {
          // return MentionNames?.map(na => na.split(' ')[0]);
          return (
            <Text key={`${idx}`} style={{color: colors.secondaryBg}}>
              {tex}{' '}
            </Text>
          );
        } else if (tex.startsWith('#')) {
          return (
            <Text key={`${idx}`} style={{color: colors.secondaryBg}}>
              {tex}{' '}
            </Text>
          );
        } else if (tex.startsWith('http' || tex.startsWith('www.'))) {
          return (
            <Text
              key={`${idx}`}
              onPress={() => Linking.openURL(tex)}
              style={{color: colors.secondaryBg}}>
              {tex}{' '}
            </Text>
          );
        }
        return `${tex} `;
      })}
    </Text>
  );
};

export default memo(CustomText);

const styles = StyleSheet.create({});
{
  /* <Text style={{color: 'red'}}>{mtn?.name}</Text> */
}
// <Text key={`${idx}`} style={{color: colors.secondaryBg}}>
// {tex}{' '}
// {mentions?.map(mtn =>
//   mtn?.name.toLocaleLowerCase().includes(tex)
//     ? `@${mtn?.name}`
//     : text,
// )}
// </Text>
