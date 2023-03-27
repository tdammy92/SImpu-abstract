import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors, FontSize} from 'src/constants';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  btnContainer: ViewStyle;
  topContainer: ViewStyle;
  headerText: TextStyle;
  InfoText: TextStyle;
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
    width: '100%',
    paddingHorizontal: wp(10),
    paddingVertical: hp(15),
  },

  headerText: {
    textAlign: 'left',
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.BigText,
    color: colors.dark,
    paddingVertical: hp(20),
  },
  InfoText: {
    color: colors.darkGray,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    textAlign: 'left',
    width: '90%',
  },
  btnContainer: {
    // flex: 1,
    marginTop: hp(30),
    marginVertical: hp(25),
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
    backgroundColor: colors.dark,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingHorizontal: hp(25),
    paddingVertical: hp(12),
    marginVertical: 20,
  },

  googleText: {
    color: colors.light,
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
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
  },

  inputConatiner: {
    width: '100%',
    // justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
export default styles;
