import {StyleSheet} from 'react-native';
// import { colors } from '../constants';
import {wp, hp} from '../utils/index';
import FONTS from 'src/constants/fonts';

export const globalStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: wp(15),
    paddingTop: wp(20),
    // marginTop:wp(30),
    // justifyContent: 'center',
    flexGrow: 1,
  },
  itemContainer: {
    paddingHorizontal: wp(15),
  },
  scroll: {
    paddingVertical: hp(25),
  },
  supermartLogo: {
    marginTop: hp(20),
    marginBottom: hp(10),
    borderWidth: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetweenNoCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  undeline: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  authTitle: {
    paddingTop: hp(80),
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: hp(10),
  },

  headerRightText: {
    color: '#211791',
    marginRight: 10,
    fontWeight: '400',
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_REGULAR,
  },
  lowerText: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center',
  },
  footerBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: hp(15),
    paddingHorizontal: wp(15),
  },
  addedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tagCard: {
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
  shadowCard: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 10,
    marginBottom: hp(25),
    minHeight: hp(100),
    padding: wp(15),
  },
});
