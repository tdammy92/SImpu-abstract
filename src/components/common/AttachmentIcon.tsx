import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

type attachmentIcon = {
  fileExetension: string;
  size: number;
  color: string;
};

const AttachmentIcon = ({fileExetension, size, color}: attachmentIcon) => {
  if (fileExetension === 'pdf')
    return <AntDesign name="pdffile1" size={size} color={color} />;
  if (fileExetension === 'doc')
    return <AntDesign name="wordfile1" size={size} color={color} />;
  if (fileExetension === 'docx')
    return <AntDesign name="wordfile1" size={size} color={color} />;
  if (fileExetension === 'ppt')
    return <AntDesign name="pptfile1" size={size} color={color} />;
  if (fileExetension === 'xls')
    return <AntDesign name="exclefile1" size={size} color={color} />;

  return <AntDesign name="unknowfile1" size={size} color={color} />;
};

export default AttachmentIcon;
