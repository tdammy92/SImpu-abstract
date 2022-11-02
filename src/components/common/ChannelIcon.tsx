import {StyleSheet, View} from 'react-native';
import React from 'react';

import FbMessenger from 'src/assets/images/thumbnail/fb_messengerthumb.svg';
import IgThumbnail from 'src/assets/images/thumbnail/instagramthumb.svg';
import TwitterThumbnail from 'src/assets/images/thumbnail/TwitterThumb.svg';
import WhatsAppThumbnail from 'src/assets/images/thumbnail/WhatsAppThumb.svg';
import Outlook from 'src/assets/images/thumbnail/Outlook.svg';
import LiveChat from 'src/assets/images/thumbnail/LiveChat.svg';
import Gmail from 'src/assets/images/thumbnail/Gmail.svg';

const ChannelIcon = ({name}: any) => {
  if (name === 'messenger') return <FbMessenger />;
  if (name === 'instagram') return <IgThumbnail />;
  if (name === 'whatsapp') return <WhatsAppThumbnail />;
  if (name === 'twitter') return <TwitterThumbnail />;
  if (name === 'outlook') return <Outlook />;
  if (name === 'livechat') return <LiveChat />;
  if (name === 'email') return <Gmail />;

  return <View />;
};

export default ChannelIcon;

const styles = StyleSheet.create({});
