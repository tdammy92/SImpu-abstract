import React, { ComponentProps, memo } from 'react';
import { ColorValue } from 'react-native';

import { SafeAreaView as BaseSafeAreaView } from 'react-native-safe-area-context';

import { Layout } from '@ui-kitten/components';
import { globalStyles } from '../../styles';

type Props = ComponentProps<typeof Layout> & {
  children: React.ReactNode;
  backgroundColor?: ColorValue;
};

export const SafeAreaView = memo(({ children, ...rest }: Props) => {
  return (
    <BaseSafeAreaView style={[globalStyles.wrapper]}>
      <Layout level="4" style={[globalStyles.wrapper]} {...rest}>
        {children}
      </Layout>
    </BaseSafeAreaView>
  );
});
