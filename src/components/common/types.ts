import React from 'react';

export interface SelectTabProps {
  session1?: any;
  session2?: any;
  header1?: string;
  header2?: string;
  eventActive?: boolean;
  pressed: any;
}
export interface LabelListProps {
  text: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  onPress?: Function;
  border?: boolean;
}
