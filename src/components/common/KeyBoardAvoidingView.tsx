import React from 'react';

import { KeyboardAwareScrollView as BaseKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { globalStyles } from '../../styles/globalStyles';

type KeyboardAwareScrollViewProps = BaseKeyboardAwareScrollView['props'] & {
  children: React.ReactNode;
};

export const KeyboardAwareScrollView = ({
  children,
}: KeyboardAwareScrollViewProps) => {
  return (
    <BaseKeyboardAwareScrollView
      contentContainerStyle={[globalStyles.container]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </BaseKeyboardAwareScrollView>
  );
};
