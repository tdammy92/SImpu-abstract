import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {messageType} from 'src/@types/inbox';
import {format} from 'date-fns';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {StoreState, messageStoreState} from 'src/@types/store';
import {hp, wp} from 'src/utils';
import {FontSize, colors} from 'src/constants';

const EmailMessageCaption = () => {
  const {
    message: mail,
    messageType,
    receiver,
    messageContent,
  } = useSelector((state: StoreState) => state.message);
  const [height, setHeight] = useState(0);
  const entity = mail?.entity;
  const author = mail?.author;
  const {recipients} = entity ?? {};
  const subject = mail?.entity?.content?.subject ?? messageContent?.subject;
  const htmlString: string | undefined | null =
    entity?.content?.body ?? messageContent?.body;

  const toValue = recipients?.to?.map((item: any, index: number) =>
    index === (recipients?.to?.length ?? 0) - 1
      ? `${item?.platform_nick}`
      : `${item?.platform_nick}, `,
  );
  const fromValue = recipients?.from?.map((item: any, index: number) =>
    index === (recipients?.from?.length ?? 0) - 1
      ? `${item?.platform_nick}`
      : `${item?.platform_nick}, `,
  );
  const ccValue = recipients?.cc?.map((item: any, index: number) =>
    index === (recipients?.cc?.length ?? 0) - 1
      ? `${item?.platform_nick}`
      : `${item?.platform_nick}, `,
  );
  const bccValue = recipients?.bcc?.map((item: any, index: number) =>
    index === (recipients?.bcc?.length ?? 0) - 1
      ? `${item?.platform_nick}`
      : `${item?.platform_nick}, `,
  );

  //   console.log('message Type', JSON.stringify(recipients, null, 2));
  //   console.log('message Type', JSON.stringify(messageContent, null, 2));

  const webViewScript = `
     setTimeout(function() { 
       window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
     }, 500);
     true; // note: this is required, or you'll sometimes get silent failures
   `;

  //    export type messageOptionType = 'reply' | 'forward' | 'reply all';
  return (
    <View style={styles.constainer}>
      <View>
        {messageType === 'forward' && (
          <Text style={styles.text}>
            ---------- Forwarded message ---------
          </Text>
        )}
        {(messageType === 'reply' || messageType === 'reply all') && (
          <Text style={styles.text}>---------- Reply message ---------</Text>
        )}
        <Text style={styles.text}>From: {`<${fromValue}>`}</Text>
        <Text style={styles.text}>
          {/* @ts-ignore */}
          {format(new Date(mail?.created_datetime), 'd LLL, p')}
        </Text>
        <Text style={styles.text}>Subject: {subject}</Text>
        <Text style={styles.text}>To: {`<${toValue}>`}</Text>
        {ccValue && <Text>CC: {`<${ccValue}>`}</Text>}
        {bccValue && <Text>BCC: {`<${bccValue}>`}</Text>}
      </View>

      {/* <WebView
        source={{html: htmlString}}
        originWhitelist={['*']}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        style={{height: height, width: '100%', alignItems: 'center'}}
        onMessage={event => {
          setHeight(parseInt(event.nativeEvent.data));
        }}
        javaScriptEnabled={true}
        injectedJavaScript={webViewScript}
        domStorageEnabled={true}
        useWebKit={true}
      /> */}
    </View>
  );
};

export default memo(EmailMessageCaption);

const styles = StyleSheet.create({
  constainer: {paddingHorizontal: wp(10)},
  text: {
    color: colors.darkGray,
    fontSize: FontSize.SmallText,
    lineHeight: hp(18),
  },
  smallText: {},
});

export const getForwardedEmailContent = (
  text: string,
  forwardedMessage: messageStoreState,
) => {
  const entity = forwardedMessage?.message?.entity;
  //@ts-ignore
  const date: string | number | Date =
    forwardedMessage?.message?.created_datetime;
  const author = forwardedMessage?.message?.author;
  const {recipients} = entity ?? {};
  const subject =
    forwardedMessage?.message?.entity?.content?.subject ??
    forwardedMessage?.messageContent?.subject;
  const body: string | null =
    entity?.content?.body ?? forwardedMessage?.messageContent?.body;

  const {to, bcc, cc, from} = recipients ?? {};

  const toValue = to
    ?.map((item: any, index: number) =>
      index === (recipients?.to?.length ?? 0) - 1
        ? `${item?.platform_nick}`
        : `${item?.platform_nick}`,
    )
    ?.join(',');

  const fromValue = from
    ?.map((item: any, index: number) =>
      index === (recipients?.from?.length ?? 0) - 1
        ? `${item?.platform_nick}`
        : `${item?.platform_nick} `,
    )
    ?.join(', ');

  const ccValue = cc
    ?.map((item: any, index: number) =>
      index === (recipients?.cc?.length ?? 0) - 1
        ? `${item?.platform_nick}`
        : `${item?.platform_nick} `,
    )
    ?.join(', ');

  const bccValue = bcc
    ?.map((item: any, index: number) =>
      index === (recipients?.bcc?.length ?? 0) - 1
        ? `${item?.platform_nick}`
        : `${item?.platform_nick}`,
    )
    ?.join(', ');

  console.log(
    'forwareded details',
    JSON.stringify({toValue, fromValue, ccValue, bccValue}, null, 2),
  );

  return text.concat(
    `<div>
        <div style="padding-bottom: 16px;">
            <p>---------- Forwarded message ---------</p>
            <p>From: ${fromValue}</p>
            <p>Date: ${format(new Date(date), 'd LLL, p')}</p>
            <p>Subject: ${subject}</p>
            <p>To: ${toValue}</p>
            ${ccValue ? `<p>CC: ${ccValue}</p>` : ''}
            ${bccValue ? `<p>BCC: ${bccValue}</p>` : ''}
        </div>
        ${body}
    </div>`,
  );
};
