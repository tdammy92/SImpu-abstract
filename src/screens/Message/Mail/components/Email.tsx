import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Comments from './comments';
import Message from './Message';

const EmailCard = ({data}: any) => {
  // console.log('all data', data);

  if (data.type === 'log/start') {
    return <Comments data={data} />;
  }

  if (data.type === 'message/normal') {
    return <Message data={data} />;
  }

  return <View />;
};

export default EmailCard;
