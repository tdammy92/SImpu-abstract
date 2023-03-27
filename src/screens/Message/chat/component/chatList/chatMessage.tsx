import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import ChatBubble from './bubble';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import Logs from 'src/screens/Message/logs';
import Comments from 'src/screens/Message/comment/comment';
import {hp} from 'src/utils';
import EmptyInbox from 'src/components/common/EmptyInbox';
import {messageType} from 'src/@types/inbox';

const ChatMessage = ({
  data,
  fetchNextPage,
  chatListRef,
  Onscroll,
  isGroup,
  InputLayout,
}: any) => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    if (item?.type?.includes('log')) {
      return <Logs data={item} />;
    }

    if (item?.type?.includes('comment')) {
      return <Comments data={item} />;
    }
    return (
      <ChatBubble
        item={item}
        id={index}
        isGroup={isGroup}
        scrollToMessage={scrollToMessage}
      />
    );
  };

  function scrollToMessage(threadId: string) {
    const itemIndex = data?.findIndex(
      (item: messageType) => item?.uuid === threadId,
    );

    if (!!itemIndex && itemIndex > 0) {
      chatListRef?.current?.scrollToIndex({
        index: itemIndex,
        animted: true,
        viewPosition: 0.5,
      });
    }
  }

  return (
    <FlatList
      ref={chatListRef}
      showsVerticalScrollIndicator={true}
      style={{
        paddingBottom: hp(100),
        marginBottom: hp(InputLayout?.height * 0.5),
      }}
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
      renderItem={renderItem}
      onScroll={Onscroll}
    />
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
