/* eslint-disable react-native/no-inline-styles */
import { View, TextInput } from 'react-native';
import React from 'react';
import { NormalText } from './Titles';
import { Colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../responsive_dimensions';

interface InputProps {
  label: string,
  labelColor?: string,
  placeholder: string,
  placeholderTxtColor?: string,
  borderWidth?: number,
  borderColor?: string,
  secureTxtEntry?: boolean,
  keyboardType?: string,
  width?: number,
  maxLength?:number,
  value?:string,
  onChangeText?:()=>void;
}
const Input2: React.FC<InputProps> = ({ label,maxLength,value, labelColor, keyboardType, secureTxtEntry = false, placeholder, borderColor, placeholderTxtColor, borderWidth, width,onChangeText }) => {
  return (
    <View style={{ borderWidth: borderWidth ? borderWidth : 2, borderColor: borderColor ? borderColor : Colors.borderColor6, width: width && responsiveWidth(width), paddingTop: responsiveHeight(1), paddingHorizontal: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
      <NormalText lineHeight={responsiveHeight(2.4)} fontSize={1.8} title={label} color={labelColor ? labelColor : Colors.labelText} />
      <TextInput value={value} onChangeText={onChangeText} maxLength={maxLength} keyboardType={keyboardType} secureTextEntry={secureTxtEntry} style={{ lineHeight: 16, paddingVertical: responsiveHeight(0.8), fontSize: responsiveFontSize(1.8), color: Colors.platinum }} placeholder={placeholder} placeholderTextColor={placeholderTxtColor ? placeholderTxtColor : Colors.placeholderTxtColor} />
    </View>
  );
};

export default Input2;
