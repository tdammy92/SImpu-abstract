import { StyleService } from '@ui-kitten/components';
import { ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
  },
});
export default styles;
