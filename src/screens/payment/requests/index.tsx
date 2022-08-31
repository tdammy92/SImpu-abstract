import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import SelectTab from 'src/components/common/SelectTabs';
import RequestCard from 'src/components/common/RequestCard';

const Requests = () => {
  const [eventActive, setEventActive] = useState(false);
  return (
    <View style={styles.container}>
      <SelectTab
        eventActive={eventActive}
        pressed={() => setEventActive(!eventActive)}
        header1="SENT"
        header2="RECEIVED"
      />
      <RequestCard />
      <RequestCard />
    </View>
  );
};

export default Requests;
