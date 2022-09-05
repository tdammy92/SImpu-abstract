import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { SelectTabProps } from './types';

const SelectTab = ({
  session1,
  session2,
  header1,
  header2,
  eventActive,
  pressed,
}: SelectTabProps) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
    },
    buttonStyle: {
      width: '50%',
      borderColor: 'transparent',
      backgroundColor: eventActive ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
      borderBottomColor: 'transparent',
      borderRadius: 50,
      height: 30,
    },
    userbuttonStyle: {
      width: '50%',
      borderColor: 'transparent',
      backgroundColor: !eventActive ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
      borderBottomColor: 'transparent',
      borderRadius: 50,
      height: 30,
    },
    textStyle: {
      color: !eventActive ? '#1B1212' : '#425A70',
      fontWeight: 'bold',
    },
  });
  const userNameChildren = () => {
    return <Text style={styles.textStyle}>{header1}</Text>;
  };
  const eventChildren = () => {
    return <Text style={styles.textStyle}>{header2}</Text>;
  };
  return (
    <>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            ...styles.userbuttonStyle,
          }}
          children={userNameChildren}
          onPress={pressed}
        />
        <Button
          style={{
            ...styles.buttonStyle,
          }}
          children={eventChildren}
          onPress={pressed}
        />
      </View>
      <View>{eventActive ? session1 : session2}</View>
    </>
  );
};

export default SelectTab;
