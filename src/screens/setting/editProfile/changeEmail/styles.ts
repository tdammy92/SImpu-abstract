import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;

  card: ViewStyle;
  inputStyle: ViewStyle;
  textConatiner: ViewStyle;
  textStyle: TextStyle;
  nameText: TextStyle;
  save: TextStyle;
  saveContainer: ViewStyle;
}

const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingVertical: 50,
  },

  inputStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  textStyle: {
    color: '#0A0748',
    paddingBottom: 10,
    fontWeight: '400',
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_REGULAR,
  },

  textConatiner: {
    paddingLeft: wp(15),
  },
  nameText: {
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_REGULAR,
    color: '#636366',
    margin: wp(15),
    lineHeight: 22,
  },

  card: {
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,

    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
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

  saveContainer: {
    marginTop: hp(25),
  },
  save: {
    color: '#0A0748',
    fontSize: hp(17),
    paddingVertical: hp(10),
  },
});

export default styles;
