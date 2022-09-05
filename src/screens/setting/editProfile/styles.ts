import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  profileContainer: ViewStyle;
  overLay: ViewStyle;
  cameraStyle: ViewStyle;
  inputContainer: ViewStyle;
  card: ViewStyle;
  inputStyle: ViewStyle;
  imageStyle: ImageStyle;
  textStyle: TextStyle;
  nameText: TextStyle;
  save: TextStyle;
  logOut: TextStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  profileContainer: {
    backgroundColor: 'white',
    marginTop: 1,
    padding: wp(15),
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    width: '75%',
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  overLay: {
    opacity: 0.6,
    // backgroundColor: '#000000',
    borderRadius: 33,
    height: hp(66),
  },
  imageStyle: {
    height: hp(76),
    // resizeMode: 'contain',
    width: hp(76),
    backgroundColor: 'white',
    // borderRadius: hp(100),
  },
  textStyle: {
    fontSize: hp(17),
    fontFamily: FONTS.AVERTA_REGULAR,
  },
  nameText: {
    fontSize: hp(17),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: '#636366',
    margin: wp(15),
    lineHeight: 22,
  },
  cameraStyle: {
    position: 'relative',
    top: wp(-35),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  card: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: hp(25),
    minHeight: hp(44),
  },

  save: {
    color: '#0A0748',
    fontSize: hp(17),
    paddingVertical: hp(10),
  },
  logOut: {
    color: '#DA1414',
    fontSize: hp(18),
    padding: 15,
  },
});
export default styles;