import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {StackScreenProps} from '@react-navigation/stack';
import {CONVERSATION_API} from '@env';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {
  MainStackParamList,
  SCREEN_NAME,
} from 'src/navigation/constants';
import {StyledComponentProps} from '@ui-kitten/components';

interface Props
  extends StyledComponentProps,
    StackScreenProps<MainStackParamList, SCREEN_NAME.socialWeb> {}

const Connect = (props: Props) => {
  const {channel_id} = props?.route?.params;

  const user = useSelector((state: StoreState) => state.user.profile);
  const token = useSelector((state: StoreState) => state.auth.token);
  const inbox_id = Platform.OS==='ios'? `12091ae2060141429280ce95e6eb9acf`  : `ba94c556e3ad440a862a7142ffa1494c`;

  const [Url, setUrl] = useState('');
  const [showLoader, setshowLoader] = useState(false);

//   console.log(user?.organisation_id);


  const Loader = () => {
    return (
      <View  style={styles.indicatorContainer}>
        <ActivityIndicator
          color="gray"
          size="large"
        />
      </View>
    );
  };

  useEffect(() => {
    const url = `${CONVERSATION_API}/auth/channel/${channel_id}/inbox/${inbox_id}?organisation_id=${user.organisation_id}&token=${token}&is_redirect=true&success_url=http://localhost:3000/s/integration&failure_url=http://localhost:3000/s/integration`;

    setUrl(url);
  }, []);


  return (
    <View style={styles.container}>
      <WebView
        source={{uri: Url}}
        style={{marginTop: 0, flex: 1}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setshowLoader(true)}
        onLoad={() => setshowLoader(false)}
        originWhitelist={['*']}
        keyboardDisplayRequiresUserAction={false}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        // hideKeyboardAccessoryView={true}
      />
      {showLoader && <Loader />}
    </View>
  );
};

export default Connect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer:{
    flex:1,
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    justifyContent:'center'

  }
});
