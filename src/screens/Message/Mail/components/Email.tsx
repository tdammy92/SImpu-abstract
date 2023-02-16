import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Comments from './comments';
import Message from './Message';

const EmailCard = ({data, receiver}: any) => {
  // console.log('all message', JSON.stringify(data?.type, null, 2));

  if (data.type === 'log/start') {
    // console.log(JSON.stringify(data, null, 2));
    return <Comments data={data} />;
  }

  if (data.type === 'message/normal') {
    return <Message data={data} receiver={receiver} />;
  }

  return <View />;
};

export default memo(EmailCard);
