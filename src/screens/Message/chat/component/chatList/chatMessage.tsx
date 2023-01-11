import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ChatBubble from './bubble';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {ScrollView} from 'react-native-gesture-handler';
import {hp} from 'src/utils';

const ChatMessage = ({data}: any) => {
  return (
    //     <ScrollView showsVerticalScrollIndicator={false}>
    //       {data?.map((item: any, idx: any) => {
    //         return <ChatBubble item={item} key={idx} />;
    //       })}
    //     </ScrollView>
    <FlatList
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 20}}
      contentContainerStyle={{marginBottom: hp(20), paddingBottom: hp(20)}}
      inverted
      keyExtractor={(_, id) => `${id}`}
      data={data}
      renderItem={({item}) => <ChatBubble item={item} />}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
