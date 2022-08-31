import { StyleService } from '@ui-kitten/components';
import { TextStyle, ViewStyle } from 'react-native';
import { hp } from 'src/utils';

interface Styles {
  container: ViewStyle;
  headerText: TextStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: hp(25),
  },
  headerText: {
    color: '#636366',
    fontSize: hp(16),
    fontWeight: '400',
    marginHorizontal: hp(13),
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});
export default styles;
