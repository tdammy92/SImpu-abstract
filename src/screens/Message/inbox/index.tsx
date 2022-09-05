import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Image,
} from 'react-native';
import {StyledComponentProps, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useRef, useEffect, useCallback} from 'react';
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

const Inbox = ({navigation}: any) => {
  const SortSheetRef = useRef<any>(null);
  const styles = useStyleSheet(themedStyles);
  const [Message, setMessage] = useState(() => dummyData);

  const emailToId = useCallback((item: any) => item.id, []);

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

  const ArchiveRowBack = () => (
    <View style={styles.leftHiddenContainer}>
      <Image
        //@ts-ignore
        style={styles.leftHiddenImage}
        source={require('src/assets/images/baseline_archive_white_18dp.png')}
      />
    </View>
  );

  const TrashRowBack = () => (
    <View style={styles.rightHiddenContainer}>
      <Image
        //@ts-ignore
        style={styles.rightHiddenImage}
        source={require('src/assets/images/baseline_delete_white_18dp.png')}
      />
    </View>
  );

  const deleteItem = useCallback(
    (key: any) => {
      setMessage(prevData => prevData.filter((x: any) => emailToId(x) !== key));
    },
    [emailToId],
  );

  console.log(Message);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <MessageHeader
          name="Inbox"
          openSortSheet={openSheet}
          closeSortSheet={openSheet}
        />
        <View style={styles.container}>
          {/* <SwipeActionList
            keyExtractor={(_: any, i: any) => `${i}`}
            data={Message}
            renderItem={renderItem}
            renderLeftHiddenItem={ArchiveRowBack}
            renderRightHiddenItem={TrashRowBack}
            onSwipeLeft={deleteItem}
            onSwipeRight={deleteItem}
          /> */}

          <SwipeListView
            data={Message}
            renderItem={MessageCard}
            renderHiddenItem={(data, rowMap) => (
              <View>
                <Text>Left</Text>
                <Text>Right</Text>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </View>
      </View>

      <ComposeMessageBtn />
      <SortSheet ref={SortSheetRef} />
    </SafeAreaView>
  );
};

export default Inbox;
