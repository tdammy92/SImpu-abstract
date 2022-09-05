import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import FbMessenger from 'src/assets/images/thumbnail/fb_messengerthumb.svg';
import IgThumbnail from 'src/assets/images/thumbnail/instagramthumb.svg';
import TwitterThumbnail from 'src/assets/images/thumbnail/TwitterThumb.svg';
import WhatsAppThumbnail from 'src/assets/images/thumbnail/WhatsAppThumb.svg';

const ChannelIcon = ({name}:any) => {

    
       if (name==='messenger') return <FbMessenger/> 
       if (name==='instagram') return <IgThumbnail/> 
       if (name==='whatsapp') return <WhatsAppThumbnail/> 
       if (name==='twitter') return <TwitterThumbnail/> 
      
 


  return (<View></View>)
}

export default ChannelIcon

const styles = StyleSheet.create({})