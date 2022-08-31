import { Button } from '@ui-kitten/components';
import React from 'react';
import { View, Text } from 'react-native';
import { Number } from 'src/components/common/Number';

const PayPad = (): JSX.Element => {
  return (
    <View>
      <View>
        <Text>N10</Text>
      </View>
      {/* <View>Add item name</View> */}
      <View>
        <Number title="1" />
        <Number title="2" />
        <Number title="3" />
        <Number title="4" />
        <Number title="5" />
        <Number title="6" />
        <Number title="7" />
        <Number title="8" />
        <Number title="9" />
        <Number title="." />
        <Number title="0" />
        <Number title="back" />
      </View>
      <View>
        <Button>
          <Text>Request</Text>
        </Button>
        <Button>
          <Text>Pay</Text>
        </Button>
      </View>
    </View>
  );
};
export default PayPad;
