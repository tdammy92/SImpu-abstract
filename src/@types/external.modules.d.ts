/**
 * This file holds the declarations of all modules that don't have explicit typing
 */

declare module 'react-native-smooth-pincode-input' {
  import {ReactElement, Component} from 'react';
  import {StyleProp, ViewStyle, TextStyle, TextInputProps} from 'react-native';

  type SmoothPinCodeInputProps = {
    value?: string;
    codeLength?: number;
    cellSize?: number;
    cellSpacing?: number;
    placeholder?: string | ReactElement;
    mask?: string | ReactElement;
    maskDelay?: number;
    password?: boolean;
    autoFocus?: boolean;
    restrictToNumbers?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    cellStyle?: StyleProp<ViewStyle>;
    cellStyleFocused?: StyleProp<ViewStyle>;
    cellStyleFilled?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    textStyleFocused?: StyleProp<TextStyle>;
    animated?: boolean;
    animationFocused?: string | any;
    onFulfill?: (value: string) => void;
    onChangeText?: TextInputProps['onChangeText'];
    onBackspace?: () => void;
    onTextChange?: TextInputProps['onChangeText'];
    testID?: any;
    onFocus?: TextInputProps['onFocus'];
    onBlur?: TextInputProps['onBlur'];
    keyboardType?: string;
    editable?: boolean;
    inputProps?: TextInputProps;
  };

  type SmoothInputSate = {
    maskDelay: boolean;
    focused: boolean;
  };

  export default class SmoothPinCodeInput extends Component<
    SmoothPinCodeInputProps,
    SmoothInputSate
  > {}
}

declare module 'react-native-config' {
  type AppBuildType = 'staging' | 'development' | 'test' | 'production';

  export interface NativeConfig {
    NODE_ENV: string;
    APP_BUILD_TYPE: AppBuildType;
  }

  export const Config: NativeConfig;
  export default Config;
}

declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png';

// declare namespace jest {
//   interface Matchers<R> {
//     toHaveTextContent: (htmlElement: string) => unknown;
//     toBeInTheDOM: (a?: R) => void;
//   }

//   interface Expect {
//     toHaveTextContent: (htmlElement: string) => unknown;
//     toBeInTheDOM: () => void;
//   }
// }
