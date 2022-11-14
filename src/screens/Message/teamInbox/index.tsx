import {SafeAreaView, View, Animated} from 'react-native';
import {StyledComponentProps, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useRef, useEffect, useCallback} from 'react';

//@ts-ignore
// import SwipeActionList from 'react-native-swipe-action-list';
import {SwipeListView} from 'react-native-swipe-list-view';
import MessageHeader from '../component/MessageHeader';
import themedStyles from './styles';
import HiddenItemWithActions from '../component/cardOptions/HiddenItemWithActions';

import EmptyInbox from 'src/components/common/EmptyInbox';
import MessageCard from '../component/message/MessageCard';
import ComposeMessageBtn from '../component/ComposeMessageBtn';
import {hp} from 'src/utils';
import SortSheet from '../component/SortSheet';
import dummyData from 'src/constants/dummyData';
import {useSharedThreads} from 'src/services/queries';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import ListLoader from 'src/components/common/ListLoader';

const TeamInbox = ({navigation, route}: any) => {
  const {
    params: {menuName, threadType, threadId},
  } = route;
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const SortSheetRef = useRef<any>(null);
  const styles = useStyleSheet(themedStyles);
  const [Message, setMessage] = useState(() => dummyData);
  const [messageOption, setMessageOption] = useState([
    'open',
    'assigned',
    'closed',
  ]);
  const [selectedIndex, setselectedIndex] = useState(0);

  //filter state
  const [filter, setFilter] = useState({
    sortbyFilter: 'newest',
    startDate: undefined,
    endDate: undefined,
  });

  const handleSelectedIndex = (index: number) => {
    setselectedIndex(index);
  };

  const {
    data: sharedThreadData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useSharedThreads(
    {
      filter: messageOption[selectedIndex],
      sort: filter?.sortbyFilter,
      start_date: filter?.startDate,
      end_date: filter?.endDate,
      threadId,
      threadType,
      page: 1,
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //This snippet flattens the array
  const sharedData = sharedThreadData?.pages
    ?.map((res: any) => res?.data?.threads?.map((r: any) => r))
    .flat(2);

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
        onClose={() => closeRow(rowMap, data)}
        onDelete={() => deleteRow(rowMap, data)}
        onArchive={() => ArchiveRow(rowMap, data)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%'}}>
        <MessageHeader
          name={menuName}
          messageOption={messageOption}
          handleSelectedIndex={handleSelectedIndex}
          selectedIndex={selectedIndex}
          shoMessageOptions={true}
          HandlePress={() => navigation.goBack()}
          filter={filter}
          setFilter={setFilter}
        />

        {!isLoading ? (
          <SwipeListView
            useFlatList={true}
            data={sharedData}
            //@ts-ignore
            onEndReached={fetchNextPage}
            onEndReachedThreshold={3}
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
            keyExtractor={(item, i) => `${i}`}
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
        ) : (
          <ListLoader />
        )}
      </View>

      <ComposeMessageBtn />
    </SafeAreaView>
  );
};

export default TeamInbox;
