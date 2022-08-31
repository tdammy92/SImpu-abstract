import React from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
import ArrowRight from '../../../assets/images/Arrow_Right.svg';
import { globalStyles } from 'src/styles';
import FloatLabel from 'src/components/common/FloatLabel';
import styles from './styles';

const Privacy = () => {
  return (
    <View style={styles.container}>
      <View style={globalStyles.tagCard}>
        <FloatLabel text2="7" icon2={<ArrowRight />} text="Blocked Users" />
      </View>
      <Text style={styles.headerText}>PRIVACY</Text>
      <View style={globalStyles.tagCard}>
        <FloatLabel
          text2="My Contacts"
          icon2={<ArrowRight />}
          text="Phone Number"
        />
        <FloatLabel
          border
          text2="Nobody"
          icon2={<ArrowRight />}
          text="Last Seen & Online"
        />
        <FloatLabel
          border
          text2="Everybody"
          icon2={<ArrowRight />}
          text="Profile Photo"
        />
        <FloatLabel
          border
          text2="Nobody"
          icon2={<ArrowRight />}
          text="Voice Calls"
        />
        <FloatLabel
          border
          text2="Everybody"
          icon2={<ArrowRight />}
          text="Forwarded Messages"
        />
        <FloatLabel
          border
          text2="Everybody"
          icon2={<ArrowRight />}
          text="Groups & Channels"
        />
      </View>
      <Text style={styles.headerText}>
        Change who can add you to groups and channels.
      </Text>
    </View>
  );
};

export default Privacy;
