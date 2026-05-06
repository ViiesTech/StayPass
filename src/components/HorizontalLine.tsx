/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { Colors } from '../assets/colors';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
interface HrProps {
  width?: number,
  bgColor?: string,
}
const HorizontalLine: React.FC<HrProps> = ({ width, bgColor }) => {
  return (
    <View style={{ borderWidth: 1, borderColor: bgColor ? bgColor : Colors.borderColor, width: width ? width : responsiveWidth(90), alignSelf: 'center', marginTop: responsiveHeight(1.7) }} />
  );
};

export default HorizontalLine;
