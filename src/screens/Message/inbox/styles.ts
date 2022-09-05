import {StyleService} from '@ui-kitten/components';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import FONTS from 'src/constants/fonts';
import {hp, wp} from 'src/utils';

interface Styles {
  container: ViewStyle;
  ScrollViewContainer: ViewStyle;
  leftHiddenContainer: ViewStyle;
  rightHiddenContainer: ViewStyle;
  leftHiddenImage: ImageStyle;
  rightHiddenImage: ImageStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    //     flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  ScrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    //     marginBottom: 20,
  },
  leftHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  leftHiddenImage: {
    width: 24,
    height: 24,
    marginLeft: 22,
  },
  rightHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  rightHiddenImage: {
    width: 24,
    height: 24,
    marginRight: 22,
  },
});
export default styles;
