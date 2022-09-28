import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {colors} from 'src/constants';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  btnContainer: ViewStyle;
  topContainer: ViewStyle;
  headerText: TextStyle;
  buttonStyle: ViewStyle;
  googleButton: ViewStyle;
  googleText: TextStyle;
  footerLinkContainer: ViewStyle;
  linkText: TextStyle;
  inputConatiner: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  topContainer: {
    // flex: 1,
    alignItems: 'center',
  },

  headerText: {
    textAlign: 'center',
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(23),
    color: '#000',
  },
  btnContainer: {
    // flex: 1,
    marginTop: hp(20),
    marginVertical: hp(20),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,

    width: '80%',
    paddingHorizontal: hp(25),
    paddingVertical: hp(12),
    marginVertical: 20,
  },
  googleButton: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingHorizontal: hp(25),
    paddingVertical: hp(12),
    marginVertical: 20,
  },

  googleText: {
    color: '#fff',
    fontSize: hp(20),
  },

  footerLinkContainer: {
    position: 'absolute',
    bottom: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  linkText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
    fontSize: hp(19),
  },

  inputConatiner: {
    width: '100%',
  },
});
export default styles;
