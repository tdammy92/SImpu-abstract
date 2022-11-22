import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';

const About = () => {
  const {width} = useWindowDimensions();
  const sourceUrl = `https://simpu.co/`;
  return (
    <RenderHtml
      contentWidth={width}
      //@ts-ignore
      source={sourceUrl}
    />
  );
};

export default About;

const styles = StyleSheet.create({});
