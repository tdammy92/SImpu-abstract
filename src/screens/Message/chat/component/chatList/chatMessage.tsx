import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ChatBubble from './bubble';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';

import {hp} from 'src/utils';

const ChatMessage = ({data, fetchNextPage, chatListRef, Onscroll}: any) => {
  return (
    <FlatList
      ref={chatListRef}
      showsVerticalScrollIndicator={true}
      style={{paddingBottom: hp(100)}}
      contentInset={{bottom: hp(150)}}
      contentContainerStyle={{
        paddingBottom: hp(100),
        marginBottom: hp(150),
      }}
      inverted
      keyExtractor={(_, id) => `${id}`}
      data={data}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      renderItem={({item, index}) => <ChatBubble item={item} id={index} />}
      onScroll={Onscroll}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
