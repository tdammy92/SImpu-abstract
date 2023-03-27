import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React, {memo, useState} from 'react';

import {WebView} from 'react-native-webview';

const {width} = Dimensions.get('window');

const Htmlview = ({htmldata}: any) => {
  const [height, setHeight] = useState(0);
  const webViewScript = `
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  // console.log(JSON.stringify(htmldata, null, 2));

  return (
    <>
      <WebView
        source={{html: htmldata}}
        originWhitelist={['*']}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        style={{height: height, width: '100%', alignItems: 'center'}}
        onMessage={event => {
          setHeight(parseInt(event.nativeEvent.data));
        }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        injectedJavaScript={webViewScript}
        domStorageEnabled={true}
        useWebKit={true}
        contentMode="mobile"
        dataDetectorTypes={['all']}

        // textZoom={100}
        // minimumFontSize={8}
      />
    </>
  );
};

export default memo(Htmlview);
