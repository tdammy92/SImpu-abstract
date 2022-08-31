import { StyleService } from '@ui-kitten/components';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { hp, wp } from 'src/utils';

interface Styles {
  container: ViewStyle;
  payContainer: ViewStyle;
  lowerContainer: ViewStyle;
  inputContainer: ViewStyle;
  inputStyle: ViewStyle;
  onboardImage: ImageStyle;
  buttonContainer: ViewStyle;
  itemDesc: ViewStyle;
  buttonStyle: ViewStyle;
  descInputStyle: ViewStyle;
  footerView: ViewStyle;
  headerText: TextStyle;
  requestBtn: ViewStyle;
  payBtn: ViewStyle;
  lowerText: TextStyle;
  textInputColor: TextStyle;
  symbol: TextStyle;
  desc: TextStyle;
  reqText: TextStyle;
  payText: TextStyle;
  cellStyle: ViewStyle;
}
const styles = StyleService.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(20),
    paddingBottom: wp(10),
    paddingTop: wp(30),
  },
  textInputColor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(40),
  },
  lowerContainer: {
    marginVertical: wp(0),
    paddingHorizontal: wp(20),
  },
  symbol: {
    fontSize: wp(25),
    color: 'white',
    marginRight: wp(-10),
    marginTop: wp(5),
  },
  payContainer: {
    flex: 1,
    backgroundColor: '#1B1212',
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  onboardImage: {
    height: '75%',
    resizeMode: 'contain',
    marginTop: hp(20),
  },
  buttonContainer: {
    marginHorizontal: 30,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: hp(0),
  },
  lowerText: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center',
    marginVertical: hp(20),
  },
  itemDesc: {
    justifyContent: 'center',
    marginHorizontal: hp(30),
  },
  descInputStyle: {
    backgroundColor: 'rgba(248, 248, 250, 0.12)',
    borderRadius: wp(23),
    borderColor: 'white',
    // borderColor: 'rgba(248, 248, 250, 0.12)',
  },
  desc: {
    color: 'white',
  },
  footerView: {
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: hp(60),
  },
  requestBtn: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 30,
    height: 50,
  },
  payBtn: {
    backgroundColor: 'gray',
    borderColor:'gray',
    borderRadius: 25,
    paddingHorizontal: 30,
    height: 50,
  },
  reqText: {
    color: '#000000',
    fontWeight:'bold'
  },
  payText: {
    color: 'white',
    fontWeight:'bold'
  },
  cellStyle: {
    height: hp(60),
  },
});
export default styles;
