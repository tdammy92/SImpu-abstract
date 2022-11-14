import {Platform} from 'react-native';

const FONTS = {
  TEXT_REGULAR:
    Platform.OS === 'ios' ? 'Averta Demo PE Cutted Demo' : 'Averta-Regular',
  TEXT_BOLD: 'Averta-Bold',
  TEXT_SEMI_BOLD:
    Platform.OS === 'ios' ? 'AvertaW01-Semibold' : 'Averta-Semibold',
};

export default FONTS;
