import {Text, Toggle} from '@ui-kitten/components';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Pressable,
  View,
  Linking,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';

import Labellist from 'src/components/common/Label';
import {globalStyles} from 'src/styles';
import styles from './styles';
import WhatsappIcon from '../../../assets/images/whatsapp.svg';
import TwitterIcon from '../../../assets/images/twitter.svg';
import FbIcon from '../../../assets/images/fb_messenger.svg';
import AddIcon from '../../../assets/images/add.svg';
import IgIcon from '../../../assets/images/instagram.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList, SCREEN_NAME} from 'src/navigation/constants';
import {StoreState} from 'src/@types/store';
import {store} from 'src/store';
import {getInboxDetails, getChannels, formatSocialUrl} from 'src/services';
import {Spinner} from '@nghinv/react-native-loading';
import {FormatText} from 'src/utils';
import {useQuery} from 'react-query';

interface Props
  extends NativeStackScreenProps<
    MainStackParamList,
    SCREEN_NAME.connectsocials
  > {}

const SocialChannels = (props: Props) => {
  const {navigation} = props;

  const user = useSelector((state: StoreState) => state.user.profile);
  const token = useSelector((state: StoreState) => state.auth.token!);
  const inbox = useSelector((state: StoreState) => state.inbox.inbox);
  // const [channelList, setchannelList] = useState([]);

  const channels = useQuery('channel', () => getChannels());

  const AllChannel = channels?.data?.data?.channels;

  const [checked, setChecked] = useState(false);
  const [messenger, setMessenger] = useState(false);
  const [twitter, setTwitterCheck] = useState(false);

  //uncomment during api calls

  // connect channels QrCode
  const navigateConnectSocials = useCallback(
    (screenName: string) => {
      return navigation.navigate(SCREEN_NAME.connectsocials, {
        name: screenName,
      });
    },
    [navigation],
  );

  // //connect channels web
  // const connectChannels = useCallback(
  //   (channel_id: string, screenName: string) => {
  //     const url = formatSocialUrl(
  //       channel_id,
  //       inbox?.uuid,
  //       user?.organisation_id,
  //       token,
  //     );

  //     console.log(url);

  //     if (screenName === 'whatsapp-web-md') {
  //       return navigation.navigate(SCREEN_NAME.connectsocials, {
  //         name: 'Connect WhatsApp',
  //       });
  //     } else {
  //       Linking.openURL(url);
  //     }

  //     // return navigation.navigate(SCREEN_NAME.socialWeb, {
  //     //  name:screenName,channel_id
  //     // });
  //   },
  //   [],
  // );

  //sort image function
  const selectImage = (name: string) => {
    if (name === 'twitter') {
      return <TwitterIcon />;
    }

    if (name === 'messenger') {
      return <FbIcon />;
    }

    if (name === 'whatsapp-web-md') {
      return <WhatsappIcon />;
    }

    if (name === 'instagram') {
      return <IgIcon />;
    }
  };

  //single channel
  const showChannel = (channelName: string) => {
    const channel = inbox?.credentials.filter(
      (ch: any) => ch.channel_name === channelName,
    );

    return (
      <>
        {channel?.length ? (
          <Text style={{paddingVertical: 10, marginLeft: 10}}>
            Connected accounts
          </Text>
        ) : null}
        {channel?.map((channelItem: any, i: any) => (
          <View style={styles.channelAccountContainer}>
            <Text key={i} style={styles.channelName}>
              {channelItem?.platform_name}
            </Text>

            <TouchableOpacity>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };

  //channelComponent
  const channelComponent = ({item}: any) => {
    return (
      <View style={globalStyles.shadowCard}>
        <Labellist
          borderBottom
          text2={`Connect ${
            item?.name === 'whatsapp-web-md' ? 'WhatsApp' : item.name
          } to your Simpu inbox`}
          icon2={
            <Toggle
              checked={twitter}
              onChange={() => setTwitterCheck(!twitter)}
            />
          }
          icon1={selectImage(item.name)}
          text={`${
            item.name === 'whatsapp-web-md'
              ? 'WhatsApp'
              : FormatText(item?.name)
          }`}
        />

        {showChannel(item?.name)}

        <Pressable
          // onPress={() => connectChannels(item.uuid, item.name)}
          // onPress={() => navigateConnectSocials('Connect Twitter')}
          style={[globalStyles.rowStart, styles.addContainer]}>
          <AddIcon />
          <Text style={styles.addText}>ADD</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={globalStyles.shadowCard}>
        <Labellist
          borderBottom
          text2="Connect Whatsapp to your Simpu inbox"
          icon2={
            <Toggle checked={checked} onChange={() => setChecked(!checked)} />
          }
          icon1={<WhatsappIcon />}
          text="Whatsapp"
        />
        <Pressable
          onPress={() => navigateConnectSocials('Connect Whatsapp')}
          style={[globalStyles.rowStart, styles.addContainer]}>
          <AddIcon />
          <Text style={styles.addText}>ADD</Text>
        </Pressable>
      </View> */}

      {/* <View style={globalStyles.shadowCard}>
        <Labellist
          borderBottom
          text2="Connect Messenger to your Simpu inbox"
          icon2={
            <Toggle
              checked={messenger}
              onChange={() => setMessenger(!messenger)}
            />
          }
          icon1={<FbIcon />}
          text="Messenger"
        />
        <Pressable
          // onPress={() => navigateConnectSocials('Connect Messenger')}
          onPress={() =>
            connectChannels(
              'af84887e76d25148ba39fc2f7fbeb1b3',
              'Connect Messenger',
            )
          }
          style={[globalStyles.rowStart, styles.addContainer]}>
          <AddIcon />
          <Text style={styles.addText}>ADD</Text>
        </Pressable>
      </View> */}

      <View style={globalStyles.shadowCard}>
        <Labellist
          borderBottom
          text2="Connect Twitter to your Simpu inbox"
          icon2={
            <Toggle
              checked={twitter}
              onChange={() => setTwitterCheck(!twitter)}
            />
          }
          icon1={<TwitterIcon />}
          text="Twitter"
        />
        <Labellist
          // borderBottom
          text2="@tdamilola"
          icon2={
            <Toggle
              checked={twitter}
              onChange={() => setTwitterCheck(!twitter)}
            />
          }
          // icon1={<TwitterIcon />}
          // text="Twitter"
        />
        {/* <Pressable
          onPress={() =>
            connectChannels(
              'f5196e808ebf5cfdbe30af7a37ad4753',
              'Connect Twitter',
            )
          }
          // onPress={() => navigateConnectSocials('Connect Twitter')}
          style={[globalStyles.rowStart, styles.addContainer]}>
          <AddIcon />
          <Text style={styles.addText}>ADD</Text>
        </Pressable> */}
      </View>

      {AllChannel && (
        <FlatList
          data={AllChannel.filter(
            (item: any) =>
              item.name === 'twitter' ||
              item.name === 'messenger' ||
              item.name === 'whatsapp-web-md' ||
              item.name === 'instagram',
          )}
          keyExtractor={(item, i) => `${i}`}
          renderItem={channelComponent}
        />
      )}
    </View>
  );
};

export default SocialChannels;
