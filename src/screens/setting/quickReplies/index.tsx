import {Text} from '@ui-kitten/components';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, TouchableWithoutFeedback} from 'react-native';

import Labellist from 'src/components/common/Label';
import EmptyReplies from '../../../assets/images/emptyQr.svg';
import ArrowDown from '../../../assets/images/Arrow_Down.svg';
import {globalStyles} from 'src/styles';
import BottomForm from './bottomForm/index';
import styles from './styles';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';

const QuickReplies = () => {
  const {setOptions} = useNavigation();
  const bottomRef: React.ForwardedRef<any> = useRef();
  const [AllReplies, setAllReplies] = useState<any>([
    {title: 'Credit Dammy', message: 'credit dammy 30,000'},
  ]);
  const [showReplySheet, setShowReplySheet] = useState(false);
  const [showNoReplies, setShowNoReplies] = useState(true);

  const noReplies = () => {
    return (
      <View style={styles.emptyContainer}>
        <EmptyReplies />

        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>
            Looks like you have not created any quick replies yet, click on Add
            New to get started
          </Text>
        </View>
      </View>
    );
  };

  const closeSheet = () => {
    if (bottomRef.current) {
      bottomRef.current.close();
    }
  };

  const saveReples = (replies: any) => {
    setAllReplies([replies, ...AllReplies]);
    closeSheet();
  };

  const EditReply = (message: any) => {
    if (bottomRef.current) {
      bottomRef.current.open();
    }
  };

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <HeaderNextBtn
            btnText="Add new"
            handlePres={() => bottomRef.current.open()}
          />
        );
      },
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        {AllReplies.length < 1 ? (
          noReplies()
        ) : (
          <View style={styles.repliesContainer}>
            {AllReplies.map((list: any, i: number) => (
              <Labellist
                key={i}
                border
                icon2={<ArrowDown />}
                text={list.title}
                onPress={EditReply}
              />
            ))}
          </View>
        )}
      </View>
      <BottomForm
        ref={bottomRef}
        closeSheet={closeSheet}
        saveReples={saveReples}
        EditReply={EditReply}
      />
    </>
  );
};

export default QuickReplies;
