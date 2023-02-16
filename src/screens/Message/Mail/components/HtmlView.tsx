import {View, Text, useWindowDimensions, Dimensions} from 'react-native';
import React, {memo} from 'react';
import RenderHtml, {
  defaultSystemFonts,
  HTMLContentModel,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp} from 'src/utils';
import {WebView} from 'react-native-webview';
// const cheerio = require('react-native-cheerio');

const {width} = Dimensions.get('window');

const Htmlview = ({htmldata}: any) => {
  // const {width, height} = useWindowDimensions();
  const systemFonts = [...defaultSystemFonts, FONTS.TEXT_REGULAR];
  // console.log('width from outside', widthA);
  // console.log('width from inside  widthB', width);

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
    font: defaultHTMLElementModels.p.extend({
      contentModel: HTMLContentModel.mixed,
    }),
    link: defaultHTMLElementModels.a.extend({
      contentModel: HTMLContentModel.mixed,
    }),
  };

  const ignoredDomTags = ['meta', 'o:p'];

  // console.log('html tags', JSON.stringify(htmldata, null, 2));

  return (
    <>
      <View
        style={{
          maxWidth: width,
          backgroundColor: colors.bootomHeaderBg,
          padding: hp(5),
          borderRadius: hp(10),
        }}>
        <RenderHtml
          enableCSSInlineProcessing={false}
          contentWidth={width}
          source={source}
          WebView={WebView}
          enableExperimentalMarginCollapsing={true}
          systemFonts={systemFonts}
          // renderersProps={renderersProps}
          ignoredDomTags={ignoredDomTags}
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

          tagsStyles={tagsStyles}
          baseStyle={{
            padding: 5,
            margin: 0,
            maxWidth: width,
          }}
        />
      </View>
    </>
  );
};

export default memo(Htmlview);

const tagsStyles = {
  body: {
    // color: colors.dark,
    fontSize: FontSize.MediumText,
    // width: width * 0.7,
  },
  a: {
    // color: 'red',
    fontSize: FontSize.MediumText,
    lineHeight: 24,
  },

  table: {
    // width: width * 0.7,
  },
  tr: {},
  th: {},
  td: {},

  iframe: {
    marginTop: 15,
    borderRadius: 5,
    marginHorizontal: 0,
  },
  img: {
    maxWidth: width * 0.9,
  },

  p: {
    color: colors.dark,
    fontSize: FontSize.BigText,
    lineHeight: 24,
  },

  h1: {
    color: colors.dark,

    fontSize: FontSize.subHeadingText,
    lineHeight: 24,
  },
  h2: {
    color: colors.dark,
    fontSize: FontSize.BigText - 2,
    lineHeight: 24,
  },
  h3: {
    color: colors.dark,
    fontSize: FontSize.BigText - 3,
    lineHeight: 24,
  },
  h4: {
    color: colors.dark,
    fontSize: FontSize.BigText - 4,
    lineHeight: 24,
  },
  h5: {
    color: colors.dark,
    fontSize: FontSize.BigText - 5,
    lineHeight: 24,
  },
  h6: {
    color: colors.dark,
    fontSize: FontSize.BigText - 6,
    lineHeight: 24,
  },

  i: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  strong: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  em: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  b: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  small: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  sup: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  sub: {color: colors.dark, fontSize: FontSize.BigText, lineHeight: 24},
  span: {
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: 24,
  },
  div: {
    color: colors.dark,
    fontSize: FontSize.BigText,
    lineHeight: 24,
  },
};
