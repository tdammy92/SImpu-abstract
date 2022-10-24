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

  //this will be removed after factoring
  rowFront: ViewStyle;
  rowBack: ViewStyle;
  backRightBtn: ViewStyle;
  backRightBtnLeft: ViewStyle;
  backRightBtnRight: ViewStyle;
  rowFrontVisible: ViewStyle;
  title: TextStyle;
  details: TextStyle;
  trash: any;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // width: '100%',
    // height: '100%',
    // position: 'relative',
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
    // flex: 1,
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

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },

  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 0,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },

  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#276EF1',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#FF4848',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
});
export default styles;
