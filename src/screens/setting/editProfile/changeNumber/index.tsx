import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import FloatLabel from 'src/components/common/FloatLabel';
import { globalStyles } from 'src/styles';
import styles from './styles';

const ChangeNumber = () => {
  const [oldPhone, setOldPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  return (
    <View style={styles.container}>




      <View style={styles.card}>
        <View style={[globalStyles.addedBorder,styles.textConatiner]}>  
          <Text style={styles.textStyle}>Old phone number</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            value={oldPhone}
            placeholder="Enter old number"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            onChangeText={nextValue => setOldPhone(nextValue)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={[globalStyles.addedBorder,styles.textConatiner]}>  
          <Text style={styles.textStyle}>New phone number</Text>
        </View>

        <View>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            value={newPhone}
            placeholder="Enter new number"
            placeholderTextColor="#C7C7CC"
            selectionColor={'#3525E6'}
            keyboardType="default"
            onChangeText={nextValue => setNewPhone(nextValue)}
          />
        </View>
      </View>


      <View style={[styles.card,styles.saveContainer,globalStyles.rowCenter]}>
        <Pressable>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default ChangeNumber;
