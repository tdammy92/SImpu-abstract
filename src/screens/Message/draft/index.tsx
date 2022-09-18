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
import dummyData from 'src/constants/dummyData';

const Draft = ({navigation}: any) => {
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
    closeRow(rowMap, rowKey);
    const newData = [...Message];
    const prevIndex = Message.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setMessage(newData);
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

  const HiddenItemWithActions = (props: any) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={28}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={28}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
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
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <MessageHeader
          name="Draft"
          openSortSheet={openSheet}
          closeSortSheet={openSheet}
          isSocial={false}
          isTeamInbox={false}
        />
        <View style={styles.container}>
          <SwipeListView
            // useFlatList={true}
            data={[]}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
            onRowDidOpen={onRowDidOpen}
            leftActivationValue={100}
            rightActivationValue={-210}
            stopRightSwipe={-200}
            leftActionValue={0}
            rightActionValue={-500}
            onLeftAction={onLeftAction}
            onRightAction={onRightAction}
            onLeftActionStatusChange={onLeftActionStatusChange}
            onRightActionStatusChange={onRightActionStatusChange}
            ListEmptyComponent={<EmptyInbox />}
          />
        </View>
      </View>

      <ComposeMessageBtn />
      <SortSheet ref={SortSheetRef} />
    </SafeAreaView>
  );
};

export default Draft;
