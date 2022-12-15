import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ChatBubble from './bubble';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {ScrollView} from 'react-native-gesture-handler';

const ChatMessage = ({data}: any) => {
  //   console.log(profile.id);
  return (
    //     <ScrollView showsVerticalScrollIndicator={false}>
    //       {data?.map((item: any, idx: any) => {
    //         return <ChatBubble item={item} key={idx} />;
    //       })}
    //     </ScrollView>
    <FlatList
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 20}}
      contentContainerStyle={{marginBottom: 20, paddingBottom: 20}}
      inverted
      keyExtractor={(_, id) => `${id}`}
      data={data}
      renderItem={({item}) => <ChatBubble item={item} />}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
