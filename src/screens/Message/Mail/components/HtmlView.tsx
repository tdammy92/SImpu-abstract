import {View, Text, useWindowDimensions, Dimensions} from 'react-native';
import React from 'react';
import RenderHtml, {
  defaultSystemFonts,
  HTMLContentModel,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import {FONTS, colors} from 'src/constants';
import {hp} from 'src/utils';
import {WebView} from 'react-native-webview';
const cheerio = require('react-native-cheerio');

// const width = Dimensions.get('window').width - hp(10);

const Htmlview = ({htmldata}: any) => {
  const {width, height} = useWindowDimensions();
  const systemFonts = [...defaultSystemFonts, FONTS.TEXT_REGULAR];

  // const $ = cheerio.load(htmldata);

  // console.log('html from cheerio', $('body').html());
  // console.log(
  //   'html from cheerio',
  //   JSON.stringify($('body').children(), null, 2),
  // );
  const source = {
    html: htmldata ?? `<div></div>`,
  };

  // const renderersProps = {
  //   img: {
  //     enableExperimentalPercentWidth: true,
  //   },
  // };

  const customHTMLElementModels = {
    center: defaultHTMLElementModels.div.extend({
      contentModel: HTMLContentModel.mixed,
    }),
  };

  // console.log('html tags', JSON.stringify(htmldata, null, 2));

  return (
    <>
      <View
        style={{
          maxWidth: width,
        }}>
        <RenderHtml
          enableCSSInlineProcessing={false}
          contentWidth={width}
          source={source}
          WebView={WebView}
          enableExperimentalMarginCollapsing={true}
          systemFonts={systemFonts}
          // renderersProps={renderersProps}
          ignoredDomTags={['o:p']}
          customHTMLElementModels={customHTMLElementModels}
          renderersProps={{
            iframe: {
              scalesPageToFit: true,
              webViewProps: {
                allowsFullScreen: true,
              },
            },
          }}
          // dangerouslyDisableHoisting={false}
          // dangerouslyDisableWhitespaceCollapsing={false}

          // tagsStyles={tagsStyles}
          tagsStyles={{
            p: {marginTop: 15, marginBottom: 0},
            iframe: {
              marginTop: 15,
              borderRadius: 5,
              marginHorizontal: 0,
            },
            img: {
              maxWidth: width * 0.7,
            },
          }}
          baseStyle={{
            padding: 0,
            margin: 0,

            maxWidth: width,
          }}
        />
      </View>
    </>
  );
};

export default Htmlview;

const tagsStyles = {
  body: {
    // backgroundColor: 'red',
    // whiteSpace: 'normal',
    // width: width,
    color: colors.dark,
    //     marginTop: 0,
    //     paddingTop: 0,
    //     overflow: 'scroll',

    //     paddingHorizontal: 0,
    //     marginHorizontal: 0,
    //     marginVertical: 0,
    //     width: '100%',
    //     alignItems: 'center',

    //     justifyContent: 'center',

    //     alignSelf: 'center',
  },
  a: {
    // color: 'red',
  },

  // p: {
  //   color: colors.dark,
  // },
  // h1: {
  //   color: colors.dark,
  // },
  // h2: {
  //   color: colors.dark,
  // },
  // h3: {
  //   color: colors.dark,
  // },
  // h4: {
  //   color: colors.dark,
  // },
  // h5: {
  //   color: colors.dark,
  // },
  // h6: {
  //   color: colors.dark,
  // },
  // span: {
  //   color: colors.dark,
  // },
  // div: {
  //   color: colors.dark,
  // },

  // img: {
  //   padding: 0,
  //   margin: 0,
  // },
};
