import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ChatBubble from './bubble';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {ScrollView} from 'react-native-gesture-handler';
import {hp} from 'src/utils';

const ChatMessage = ({data, fetchNextPage, chatListRef, Onscroll}: any) => {
  return (
    <FlatList
      ref={chatListRef}
      showsVerticalScrollIndicator={true}
      contentInset={{bottom: 20}}
      contentContainerStyle={{marginBottom: hp(20), paddingBottom: hp(20)}}
      inverted
      keyExtractor={(_, id) => `${id}`}
      data={data}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => <ChatBubble item={item} />}
      onScroll={Onscroll}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
