import React, { useCallback } from 'react';
import { View,StatusBar ,Platform} from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import styles from './styles';
import { Input, Button, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'src/components/common/KeyBoardAvoidingView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, SCREEN_NAME } from 'src/navigation/constants';

interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.simpupay> {}
const Payment = (props: Props): JSX.Element => {
  const { navigation } = props;
  const [value, setValue] = React.useState('10');
  const [descValue, setDescValue] = React.useState('');
  const [hideVirtualKeyBoard, setHideVirtualKeyboard] = React.useState(false);
  const navigateToReviewPay = useCallback(() => {
    navigation.navigate(SCREEN_NAME.reviewpay);
  }, [navigation]);
  const navigateToRequest = useCallback(() => {
    navigation.navigate(SCREEN_NAME.request);
  }, [navigation]);
  return (

    <>
{
Platform.OS==='android'?  <StatusBar 
            barStyle="light-content"
            backgroundColor={'#1B1212'}
            // hidden={true}
             /> : null}
    <View style={styles.payContainer}>
      <KeyboardAwareScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.symbol}>₦</Text>
          <Input
            style={styles.inputStyle}
            textStyle={styles.textInputColor}
            value={value}
            placeholderTextColor="white"
            selectionColor={'white'}
            keyboardType="phone-pad"
            onChangeText={nextValue => setValue(nextValue)}
          />
        </View>
        <View style={styles.itemDesc}>
          <Input
            style={styles.descInputStyle}
            onPressIn={() => setHideVirtualKeyboard(true)}
            textStyle={styles.desc}
            value={descValue}
            placeholder="Add item name"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            selectionColor={'white'}
            keyboardType="default"
            onChangeText={nextValue => setDescValue(nextValue)}
          />
        </View>
        {hideVirtualKeyBoard ? null : (
          <View>
            <VirtualKeyboard
              cellStyle={styles.cellStyle}
              decimal={true}
              color="white"
              pressMode="string"
              onPress={(val: string) => setValue(val)}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
      <View style={styles.footerView}>
        <Button onPress={navigateToReviewPay} style={styles.requestBtn}>
          {() => <Text style={styles.reqText}>Request</Text>}
        </Button>
        <Button onPress={navigateToRequest} style={styles.payBtn}>
          <Text style={styles.payText}>Pay</Text>
        </Button>
      </View>
    </View>

    </>
  );
};
export default Payment;
