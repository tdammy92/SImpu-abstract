import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {FONTS} from 'src/constants';

const width = Dimensions.get('screen').width * 0.9;

const Htmlview = ({htmldata}: any) => {
  const systemFonts = [...defaultSystemFonts, FONTS.TEXT_REGULAR];

  const source = {
    html: htmldata,
  };

  //   const renderersProps = {
  //     img: {
  //       enableExperimentalPercentWidth: true,
  //     },
  //   };

  // console.log(source);

  return (
    <RenderHtml
      enableCSSInlineProcessing={true}
      contentWidth={width}
      source={source}
      // enableExperimentalMarginCollapsing={true}
      systemFonts={systemFonts}
      //  renderersProps={renderersProps}
      ignoredDomTags={['o:p']}
      // dangerouslyDisableHoisting={false}
      // dangerouslyDisableWhitespaceCollapsing={false}
      //@ts-ignore
      // tagsStyles={tagsStyles}

      //  baseStyle={{padding: 0, margin: 0, backgroundColor: 'red'}}
    />
  );
};

export default Htmlview;

const tagsStyles = {
  body: {
    //     backgroundColor: 'red',
    whiteSpace: 'normal',
    padding: 0,
    margin: 0,
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
    //     color: 'red',
  },

  img: {
    padding: 0,
    margin: 0,
  },
};
