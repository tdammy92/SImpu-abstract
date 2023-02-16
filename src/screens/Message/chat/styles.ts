import {StyleService} from '@ui-kitten/components';
import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from 'src/constants';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

const {height} = Dimensions.get('screen');

interface Styles {
  container: ViewStyle;
  floatingDownBtn: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.light,
  },

  floatingDownBtn: {
    backgroundColor: '#e6e6e6',

    height: hp(35),
    width: hp(35),
    borderRadius: hp(35 * 0.5),
    position: 'absolute',
    bottom: hp(140),
    right: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
