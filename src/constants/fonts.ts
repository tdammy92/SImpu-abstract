import {Platform} from 'react-native';
import {hp} from 'src/utils';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const FONTS = {
  TEXT_REGULAR:
    Platform.OS === 'ios' ? 'Averta Demo PE Cutted Demo' : 'Averta-Regular',
  TEXT_BOLD: 'Averta-Bold',
  TEXT_SEMI_BOLD:
    Platform.OS === 'ios' ? 'AvertaW01-Semibold' : 'Averta-Semibold',
};

export const FontSize = {
  HeadingText: RFValue(30),
  subHeadingText: RFValue(24),
  BigText: RFValue(20),
  MediumText: RFValue(16),
  SmallText: RFValue(12),
};
// export const FontSize = {
//   HeadingText: RFValue(32),
//   subHeadingText: RFValue(26),
//   BigText: RFValue(22),
//   MediumText: RFValue(18),
//   SmallText: RFValue(14),
// };

export default FONTS;
