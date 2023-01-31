import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {FONTS, colors} from 'src/constants';

const width = Dimensions.get('window').width;

const Htmlview = ({htmldata}: any) => {
  const systemFonts = [...defaultSystemFonts, FONTS.TEXT_REGULAR];

  const source = {
    html: htmldata,
  };

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };

  console.log('device width', width);

  return (
    <View
      style={{
        maxWidth: width,
        overflow: 'hidden',
      }}>
      <RenderHtml
        enableCSSInlineProcessing={true}
        contentWidth={width}
        source={source}
        enableExperimentalMarginCollapsing={true}
        systemFonts={systemFonts}
        renderersProps={renderersProps}
        ignoredDomTags={['o:p']}
        // dangerouslyDisableHoisting={false}
        // dangerouslyDisableWhitespaceCollapsing={false}

        // tagsStyles={tagsStyles}

        baseStyle={{
          padding: 0,
          margin: 0,

          maxWidth: width,
        }}
      />
    </View>
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
