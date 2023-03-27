import {View} from 'react-native';
import React, {memo} from 'react';
import Comments from '../../comment/comment';
import Message from './Message';
import Logs from '../../logs';

const EmailCard = ({data, receiver, index}: any) => {
  // console.log('all message', JSON.stringify(data?.type, null, 2));

  if (data?.type?.includes('log')) {
    // console.log(JSON.stringify(data, null, 2));
    return <Logs data={data} />;
  }

  if (data?.type?.includes('comment')) {
    //coments

    return <Comments data={data} />;
  }

  if (data.type === 'message/normal') {
    return <Message data={data} receiver={receiver} index={index} />;
  }

  return <View />;
};

export default memo(EmailCard);
