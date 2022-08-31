import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  lowerContainer: ViewStyle;
  onboardImage: ImageStyle;
  buttonContainer: ViewStyle;
  buttonStyle: ViewStyle;
  headerText: TextStyle;
  lowerText: TextStyle;
  editText: TextStyle;
  nameContainer: ViewStyle;
  cardList: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  lowerContainer: {
    marginVertical: wp(0),
    paddingHorizontal: wp(20),
  },
  onboardImage: {
    height: hp(79),
    resizeMode: 'contain',
    marginTop: hp(5),
    borderRadius: 25,
  },
  buttonContainer: {
    marginHorizontal: 30,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  headerText: {
    fontSize: hp(20),
    fontFamily: FONTS.AVERTA_REGULAR,
    textAlign: 'center',
    marginBottom: hp(3),
    paddingTop: hp(10),
    color: '#0A0748',
    fontWeight: '600',
    lineHeight: 22,
  },
  lowerText: {
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    opacity: 0.5,
    textAlign: 'center',
    marginVertical: 1.5,
  },
  editText: {
    color: '#1B1212',
    backgroundColor: '#f4f4f4',
    fontWeight: '300',
    fontSize: hp(14),
    fontFamily: FONTS.AVERTA_REGULAR,
    padding: 4,
  },
  nameContainer: {
    backgroundColor: 'white',
    minHeight: hp(100),
    paddingVertical: hp(20),
    marginBottom: hp(10),
  },
  cardList: {
    backgroundColor: 'white',
    marginVertical: hp(10),
    marginHorizontal: hp(10),
    borderRadius: 10,
  },
});
export default styles;
