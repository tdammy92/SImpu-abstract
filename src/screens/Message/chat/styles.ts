import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerLeft: ViewStyle;
  headerRight: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
  },
  headerLeft: {},
  headerRight: {},
});
export default styles;
