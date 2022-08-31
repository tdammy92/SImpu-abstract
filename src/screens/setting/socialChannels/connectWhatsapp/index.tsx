import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { globalStyles } from 'src/styles';
import styles from './styles';
import WhatsappIcon from '../../../../assets/images/whatsapp.svg';
import MessengerIcon from '../../../../assets/images/fb_messenger.svg';
import TwitterIcon from '../../../../assets/images/twitter.svg';
import Share from 'react-native-share';
import QRCode from '../../../../assets/images/qr.svg';
import Icon from '../../../../assets/images/myicon.svg';
import { Button } from 'src/components/common/Button';
import { useRoute } from '@react-navigation/native';
import { SocialScreenRouteProp } from 'src/navigation/constants';

const ConnectSocials = ({}) => {
  const route = useRoute<SocialScreenRouteProp>();
  const { name } = route.params;
  let icon;
  if (name === 'Connect WhatsApp') {
    icon = <WhatsappIcon />;
  } else if (name === 'Connect Messenger') {
    icon = <MessengerIcon />;
  } else {
    icon = <TwitterIcon />;
  }
  const shareToContact = (title: string, message: string) => {
    const options = {
      title,
      message,
    };
    Share.open(options)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={globalStyles.shadowCard}>
        <View style={[globalStyles.rowBetween]}>
          {icon}
          <View style={styles.account}>
            <Text>Account name</Text>
            <Text style={styles.accountText}>Set an account name</Text>
          </View>
        </View>
        <View style={styles.qrCode}>
          <QRCode />
        </View>
      </View>
      <View style={globalStyles.shadowCard}>
        <View style={globalStyles.rowBetweenNoCenter}>
          <Icon />
          <View style={styles.account}>
            <Text>
              Simply send the QR code to your friend nearby, and ask to use
              their phone to continue.
            </Text>
            <Text style={styles.headerText}>Okay got it!</Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          onPress={() =>
            shareToContact('Share to contact', 'http://awesome.link.qr')
          }
          style={styles.buttonStyle}
          title="Share"
        />
      </View>
    </View>
  );
};

export default ConnectSocials;
