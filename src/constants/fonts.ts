import {Platform} from 'react-native';

const FONTS = {
  AVERTA_REGULAR:
    Platform.OS === 'ios' ? 'Averta Demo PE Cutted Demo' : 'Averta-Regular',
  AVERTA_BOLD: 'Averta-Bold',
  AVERTA_SEMI_BOLD:
    Platform.OS === 'ios' ? 'AvertaW01-Semibold' : 'Averta-Semibold',
};

export default FONTS;
