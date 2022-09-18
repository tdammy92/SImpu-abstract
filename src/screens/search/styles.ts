import {StyleService, Input} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle, Dimensions} from 'react-native';
import {FONTS, colors} from 'src/constants';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  searchTop: ViewStyle;
  searchBottom: ViewStyle;
  pillHeaderText: TextStyle;
  pillContainer: ViewStyle;
  searchPill: ViewStyle;
  pillText: TextStyle;
  selectedPill: TextStyle;
  searchModalContainer: ViewStyle;
  inputWrapper: ViewStyle;
  peopleContainer: ViewStyle;
  Icontainer: ViewStyle;
  Itext: TextStyle;
  input: TextStyle;
  topResultContainer: ViewStyle;
  scrollContainer: ViewStyle;
}

const {width, height} = Dimensions.get('screen');

const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: height * 0.03,
    // position: 'relative',
    // backgroundColor: '#fff',
  },

  searchTop: {},
  searchBottom: {
    paddingHorizontal: 5,
  },
  pillHeaderText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(14),
    marginVertical: hp(5),
    color: colors.primaryText,
    marginLeft: 3,
  },

  pillContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchPill: {
    backgroundColor: '#EBEEF2',
    margin: 5,
    padding: 0,
    borderRadius: 5,
  },
  pillText: {
    fontSize: hp(12),
    padding: 5,
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
  },

  searchModalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%',
  },

  selectedPill: {
    backgroundColor: '#026AE8',
    color: '#fff',
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 2,
    fontSize: hp(12),
    elevation: 3,
    zIndex: 3,
  },

  scrollContainer: {
    marginTop: 10,
    maxHeight: height * 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginVertical: hp(10),
    height: 40,
    paddingHorizontal: wp(7),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
  },

  input: {
    flex: 1,
    marginLeft: 5,
    width: '100%',
    height: '100%',
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
  },

  peopleContainer: {marginTop: 5},
  Icontainer: {flexDirection: 'row', alignItems: 'center'},
  Itext: {
    color: colors.primaryText,
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    marginLeft: 5,
  },
  topResultContainer: {marginTop: 5},
});
export default styles;
