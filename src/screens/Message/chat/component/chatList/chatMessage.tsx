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
      contentInset={{bottom: hp(100)}}
      contentContainerStyle={{
        paddingBottom: hp(100),
      }}
      inverted
      keyExtractor={(_, id) => `${id}`}
      data={data}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => <ChatBubble item={item} />}
      onScroll={Onscroll}
      ListHeaderComponent={() => <View style={{height: hp(80)}} />}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
