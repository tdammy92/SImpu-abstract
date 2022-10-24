import React from 'react';
import {ViewStyle} from 'react-native';

import {KeyboardAwareScrollView as BaseKeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {globalStyles} from '../../styles/globalStyles';

type KeyboardAwareScrollViewProps = BaseKeyboardAwareScrollView['props'] & {
  children: React.ReactNode;
  customStyle?: ViewStyle;
};

export const KeyboardAwareScrollView = ({
  children,
  customStyle,
}: KeyboardAwareScrollViewProps) => {
  return (
    <BaseKeyboardAwareScrollView
      contentContainerStyle={[globalStyles.container, customStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </BaseKeyboardAwareScrollView>
  );
};
