import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FloatLabel from 'src/components/common/FloatLabel';
import {globalStyles} from 'src/styles';
import styles from './styles';
import {StoreState} from 'src/@types/store';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';

const ChangeNumber = () => {
  const {setOptions} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user.profile);
  const [oldPhone, setOldPhone] = useState(() =>
    user?.country_code || user?.phone
      ? `+${user.country_code} ${user.phone}`
      : 'Nil',
  );
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <HeaderNextBtn
            btnText="Save"
            handlePres={() => {
              console.log('saved number');
            }}
          />
        );
      },
    });
  }, [oldPhone, newPhone]);
  return (
    <View style={styles.container}>
      <View style={[styles.card, {marginTop: 20}]}>
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
          <Text style={styles.textStyle}>Old phone number</Text>
        </View>

        <View>
          <Input
            disabled={true}
            style={styles.inputStyle}
            textStyle={[styles.textStyle, {color: '#A5ACB8'}]}
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
        <View style={[globalStyles.addedBorder, styles.textConatiner]}>
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

      {/* <View style={[styles.card, styles.saveContainer, globalStyles.rowCenter]}>
        <Pressable>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default ChangeNumber;
