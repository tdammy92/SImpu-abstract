import React from 'react';
import { Text, Toggle } from '@ui-kitten/components';
import { View } from 'react-native';
import { globalStyles } from 'src/styles';
import FloatLabel from 'src/components/common/FloatLabel';
import ArrowRight from '../../../assets/images/Arrow_Right.svg';
import styles from './styles';
import Labellist from 'src/components/common/Label';

const DataStorage = () => {
  const [checked, setChecked] = React.useState(false);
  const [gifCheck, setGifCheck] = React.useState(false);
  const [vidCheck, setVidCheck] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={globalStyles.tagCard}>
        <FloatLabel icon2={<ArrowRight />} text="Storage Usage" />
        <FloatLabel border icon2={<ArrowRight />} text="Network Usage" />
      </View>
      <Text style={styles.headerText}>Automatic media download</Text>
      <View style={globalStyles.tagCard}>
        <FloatLabel
          text2="Disabled"
          icon2={<ArrowRight />}
          text="Using Cellular"
        />
        <FloatLabel
          text2="Disabled"
          border
          icon2={<ArrowRight />}
          text="Using Wi-Fi"
        />
        <FloatLabel simpuBlue border text="Reset Auto-Download Settings" />
      </View>
      <Text style={styles.headerText}>Auto-play media</Text>
      <View style={globalStyles.tagCard}>
        <Labellist
          storage
          icon2={
            <Toggle checked={checked} onChange={() => setChecked(!checked)} />
          }
          text="GIFs"
        />
        <Labellist
          border
          storage
          icon2={
            <Toggle
              checked={gifCheck}
              onChange={() => setGifCheck(!gifCheck)}
            />
          }
          text="Videos"
        />
      </View>
      <Text style={styles.headerText}>Other</Text>
      <View style={globalStyles.tagCard}>
        <Labellist
          storage
          icon2={
            <Toggle
              checked={vidCheck}
              onChange={() => setVidCheck(!vidCheck)}
            />
          }
          text="Save Incoming Photos"
        />
      </View>
    </View>
  );
};

export default DataStorage;
