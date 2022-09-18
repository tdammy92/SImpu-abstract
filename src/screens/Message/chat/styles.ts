import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle, Dimensions} from 'react-native';
import {colors} from 'src/constants';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

const {height} = Dimensions.get('screen');

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerLeft: ViewStyle;
  headerRight: ViewStyle;
  userDetails: ViewStyle;
  usernameText: TextStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    paddingTop: hp(height * 0.06),
    paddingBottom: hp(height * 0.015),
    elevation: 2,
    zIndex: 2,
    // height: height * 0.14,
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {},
  userDetails: {
    marginLeft: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(16),
    color: colors.primaryText,
    marginLeft: wp(7),
  },
});
export default styles;
