import {Platform} from 'react-native';

const FONTS = {
  TEXT_REGULAR:
    Platform.OS === 'ios' ? 'Averta Demo PE Cutted Demo' : 'Averta-Regular',
  TEXT_BOLD: 'Averta-Bold',
  TEXT_SEMI_BOLD:
    Platform.OS === 'ios' ? 'AvertaW01-Semibold' : 'Averta-Semibold',
};

export const FontSize = {
  HeadingText: 32,
  subHeadingText: 26,
  BigText: 22,
  MediumText: 18,
  SmallText: 14,
};

export default FONTS;
