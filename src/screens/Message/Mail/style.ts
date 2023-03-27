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

  FooterContainer: ViewStyle;
  membersSugestionContainer: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },

  FooterContainer: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    bottom: 1,
    width: '100%',
    height: hp(75),
    backgroundColor: colors.bootomHeaderBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(20),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  membersSugestionContainer: {},
});
export default styles;
