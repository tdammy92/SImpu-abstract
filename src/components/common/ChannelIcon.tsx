import {StyleSheet, View} from 'react-native';
import React from 'react';

import FbMessenger from 'src/assets/images/thumbnail/fb_messengerthumb.svg';
import IgThumbnail from 'src/assets/images/thumbnail/instagramthumb.svg';
import TwitterThumbnail from 'src/assets/images/thumbnail/TwitterThumb.svg';
import WhatsAppThumbnail from 'src/assets/images/thumbnail/WhatsAppThumb.svg';
import Outlook from 'src/assets/images/thumbnail/Outlook.svg';
import LiveChat from 'src/assets/images/thumbnail/LiveChat.svg';
import Gmail from 'src/assets/images/thumbnail/Gmail.svg';
import {hp} from 'src/utils';

const ChannelIcon = ({name, width, height}: any) => {
  if (name === 'messenger')
    return <FbMessenger width={hp(width)} height={hp(height)} />;
  if (name === 'instagram')
    return <IgThumbnail width={hp(width)} height={hp(height)} />;
  if (name === 'whatsapp')
    return <WhatsAppThumbnail width={hp(width)} height={hp(height)} />;
  if (name === 'twitter')
    return <TwitterThumbnail width={hp(width)} height={hp(height)} />;
  if (name === 'outlook')
    return <Outlook width={hp(width)} height={hp(height)} />;
  if (name === 'livechat')
    return <LiveChat width={hp(width)} height={hp(height)} />;
  if (name === 'email') return <Gmail width={hp(width)} height={hp(height)} />;

  return <View />;
};

export default ChannelIcon;

const styles = StyleSheet.create({});
