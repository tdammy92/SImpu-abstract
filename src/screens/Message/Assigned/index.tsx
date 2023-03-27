import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {StyledComponentProps, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
// import SwipeActionList from 'react-native-swipe-action-list';
import {SwipeListView} from 'react-native-swipe-list-view';
import MessageHeader from '../component/headers/MessageHeader';
import themedStyles from './styles';

import EmptyInbox from 'src/components/common/EmptyInbox';
import MessageCard from '../component/message/MessageCard';
import ComposeMessageBtn from '../compose/ComposeMessageBtn';
import HiddenItemWithActions from '../component/cardOptions/HiddenItemWithActions';
import {hp} from 'src/utils';
import SortSheet from '../component/SortSheet';
import ListLoader from 'src/components/common/ListLoader';
import dummyData from 'src/constants/dummyData';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useMessageThreads} from 'src/services/query/queries';
import {queryClient} from 'src/index';
import useScrollAnimation from 'src/Hooks/useScrollAnimation';

const Assigned = ({navigation}: any) => {
  const SortSheetRef = useRef<any>(null);
  const styles = useStyleSheet(themedStyles);
  const [Message, setMessage] = useState(() => dummyData);

  const {animatedValue, scrollEvent, scrollEventEnd} = useScrollAnimation();

  //filter state
  const [filter, setFilter] = useState({
    sortbyFilter: 'newest',
    startDate: undefined,
    endDate: undefined,
  });

  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {
    data: AssignedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useMessageThreads(
    {
      filter: 'assigned',
      sort: filter?.sortbyFilter,
      start_date: filter?.startDate,
      end_date: filter?.endDate,
      page: 1,
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //This snippet flattens the array
  const assignedData = AssignedData?.pages
    ?.map((res: any) => res?.data?.threads?.map((r: any) => r))
    .flat(2);

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
        onClose={() => closeRow(rowMap, data)}
        onDelete={() => deleteRow(rowMap, data)}
        onArchive={() => ArchiveRow(rowMap, data)}
      />
    );
  };

  // console.log('assingend', filter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%'}}>
        <MessageHeader
          name="Assigned"
          // isSocial={false}
          // isTeamInbox={false}
          filter={filter}
          setFilter={setFilter}
          animatedValue={animatedValue}
        />
        {!isLoading ? (
          <SwipeListView
            data={assignedData}
            useFlatList={true}
            useAnimatedList={true}
            onScroll={scrollEvent}
            onScrollEndDrag={scrollEventEnd}
            scrollEventThrottle={16}
            //@ts-ignore
            onEndReached={fetchNextPage}
            onEndReachedThreshold={3}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: hp(40),
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() =>
                  queryClient.invalidateQueries(['threads', 'assigned'])
                }
              />
            }
            contentInset={{bottom: hp(15)}}
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
      <SortSheet ref={SortSheetRef} />
    </SafeAreaView>
  );
};

export default Assigned;
