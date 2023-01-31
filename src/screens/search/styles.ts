import {StyleService, Input} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle, Dimensions, View} from 'react-native';
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
  selectedPill: ViewStyle;
  selectedPillText: TextStyle;
  searchModalContainer: ViewStyle;
  inputWrapper: ViewStyle;
  peopleContainer: ViewStyle;
  sectionHeader: ViewStyle;
  titleConatiner: ViewStyle;
  Itext: TextStyle;
  input: TextStyle;
  topResultContainer: ViewStyle;

  customerScrollContainer: ViewStyle;
  threadScrollContainer: ViewStyle;

  emptyWrapper: ViewStyle;
  emptyText: TextStyle;
}

const {width, height} = Dimensions.get('screen');

const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: height * 0.03,
    // position: 'relative',
    backgroundColor: '#fff',
  },

  searchTop: {
    width: '100%',
    // backgroundColor: 'yellow',
  },
  searchBottom: {
    // paddingHorizontal: 5,
  },
  pillHeaderText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(16),
    marginVertical: hp(5),
    color: colors.dark,
    marginLeft: 3,
  },

  pillContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchPill: {
    backgroundColor: colors.lightGray,
    margin: 4,
    padding: 5,
    borderRadius: 5,
  },
  pillText: {
    fontSize: hp(14),
    padding: 4,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  searchModalContainer: {
    backgroundColor: colors.light,
    // padding: 5,
    marginVertical: hp(5),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // width: '100%',
    // backgroundColor: 'red',
  },

  selectedPill: {
    backgroundColor: colors.darkGray,
    padding: hp(5),
    borderRadius: hp(10),
    marginLeft: wp(2),
    elevation: 1,
    zIndex: 1,
  },
  selectedPillText: {
    color: colors.light,
    fontSize: hp(14),
  },

  customerScrollContainer: {
    marginVertical: hp(5),
    maxHeight: hp(70),
  },
  threadScrollContainer: {
    marginTop: hp(5),
    maxHeight: height * 0.8,
    minHeight: height * 0.15,
  },

  titleConatiner: {
    flexDirection: 'row',
  },
  inputWrapper: {
    flexDirection: 'row',
    marginVertical: hp(10),
    height: hp(52),
    paddingHorizontal: wp(7),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: hp(10),
  },

  input: {
    flex: 1,
    marginLeft: wp(5),
    width: '100%',
    height: '100%',
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  peopleContainer: {marginTop: 5},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Itext: {
    color: colors.dark,
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    marginLeft: 5,
  },
  topResultContainer: {marginTop: hp(10)},

  emptyWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: hp(20),
  },
  emptyText: {
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
});
export default styles;
