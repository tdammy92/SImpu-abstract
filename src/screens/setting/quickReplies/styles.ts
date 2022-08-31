import {StyleService} from '@ui-kitten/components';
import {TextStyle, ViewStyle} from 'react-native';
import {hp} from 'src/utils';
import FONTS from 'src/constants/fonts';

interface Styles {
  container: ViewStyle;
  headerText: TextStyle;
  emptyContainer: ViewStyle;
  textContainer: ViewStyle;
  emptyText: TextStyle;
  repliesContainer:ViewStyle
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: hp(5),
  },
  headerText: {
    color: '#636366',
    fontSize: hp(16),
    fontWeight: '400',
    marginHorizontal: hp(13),
    marginBottom: 10,
  },

  emptyContainer: {
    flex: 1,
    marginTop: hp(50),
    paddingVertical: hp(20),
    alignItems: 'center',
    // justifyContent:'center'
  },
  textContainer: {
    marginTop: hp(20),
  },

  emptyText: {
    paddingHorizontal: 20,
    fontFamily: FONTS.PRO_REGULAR,
    fontSize: hp(18),
    textAlign: 'center',
    lineHeight: 24,
    color: '#6F7FAF',
  },
  repliesContainer:{
    backgroundColor: 'white',
    marginVertical: hp(10),
  },


});
export default styles;
