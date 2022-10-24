import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import {StyledComponentProps, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
// import SwipeActionList from 'react-native-swipe-action-list';
import {SwipeListView} from 'react-native-swipe-list-view';
import MessageHeader from '../component/MessageHeader';
import themedStyles from './styles';

import EmptyInbox from 'src/components/common/EmptyInbox';
import MessageCard from '../component/message/MessageCard';
import ComposeMessageBtn from '../component/ComposeMessageBtn';
import {hp} from 'src/utils';
import SortSheet from '../component/SortSheet';
import HiddenItemWithActions from '../component/cardOptions/HiddenItemWithActions';
import dummyData from 'src/constants/dummyData';

const Closed = ({navigation}: any) => {
  const SortSheetRef = useRef<any>(null);
  const styles = useStyleSheet(themedStyles);
  const [Message, setMessage] = useState(() => dummyData);

  //open sheet code
  const openSheet = (channel: string) => {
    // setchannelName(channel);
    if (SortSheetRef.current) {
      SortSheetRef.current.open();
    }
  };

  //close sheet
  const closeSheet = () => {
    if (SortSheetRef.current) {
      SortSheetRef.current.close();
    }
  };

  //actions
  const closeRow = (rowMap: any, rowKey: any) => {
    // console.log('rowMap', rowMap, 'rowkey', rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    const newMsg = Message.filter((item: any) => item.id !== rowKey.item.id);
    setMessage(newMsg);
  };

  const ArchiveRow = (rowMap: any, rowKey: any) => {
    // const newMsg = Message.filter((item: any) => item.id !== rowKey.item.id);
    // setMessage(newMsg);
    // console.log(rowKey.item);
    console.log('Archive row', rowKey.item.name);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = (rowKey: any) => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey: any) => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = (rowKey: any) => {
    console.log('onLeftAction', rowKey);
  };

  const renderItem = (data: any, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <MessageCard
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.index)}
      />
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      //@ts-ignore
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.index)}
        onDelete={() => deleteRow(rowMap, data.index)}
        onArchive={() => ArchiveRow(rowMap, data)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%'}}>
        <MessageHeader
          name="Closed"
          openSortSheet={openSheet}
          closeSortSheet={openSheet}
          isSocial={false}
          isTeamInbox={false}
        />

        <SwipeListView
          // useFlatList={true}
          data={Message.reverse().slice(0, 1)}
          useAnimatedList={true}
          renderItem={renderItem}
          style={{marginBottom: 0}}
          contentContainerStyle={{paddingVertical: hp(5)}}
          contentInset={{bottom: hp(0)}}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          closeOnRowBeginSwipe
          closeOnRowOpen
          scrollEnabled
          renderHiddenItem={renderHiddenItem}
          keyExtractor={item => item.id}
          onRowDidOpen={onRowDidOpen}
          leftOpenValue={90}
          rightOpenValue={-90}
          leftActivationValue={100}
          rightActivationValue={-200}
          leftActionValue={0}
          rightActionValue={-100}
          stopRightSwipe={-150}
          stopLeftSwipe={150}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
          ListEmptyComponent={<EmptyInbox />}
        />
      </View>

      <ComposeMessageBtn />
      <SortSheet ref={SortSheetRef} />
    </SafeAreaView>
  );
};

export default Closed;
