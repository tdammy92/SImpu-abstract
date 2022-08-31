import { StyleService } from '@ui-kitten/components';
import { TextStyle, ViewStyle } from 'react-native';
import { hp } from 'src/utils';

interface Styles {
  container: ViewStyle;
  account: ViewStyle;
  qrCode: ViewStyle;
  headerText: TextStyle;
  accountText: TextStyle;
  buttonStyle: ViewStyle;

}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: hp(20),
    paddingTop: 40,
  },
  headerText: {
    marginTop: hp(10),
  },


  account: {
    width: '80%',
  },
  accountText: {
    opacity: 0.5,
    marginTop: hp(5),
  },
  qrCode: {
    minHeight: 100,
    borderTopColor: 'rgba(111, 127, 175, 0.2)',
    borderTopWidth: 1,
    marginTop: hp(20),
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: hp(20),
  },
  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
  },
});
export default styles;
