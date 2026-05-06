import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../responsive_dimensions';
interface textProps {
  color?: string;
  title: any;
  alignSelf?: string;
  txtAlign?: string;
  fontWeight?: string;
  mrgnTop?: number;
  mrgnLeft?: number;
  mrgnBottom?: number;
  width?: number;
  lineHeight?: number;
  fontSize?: number;
  txtDecoration?: string;
  txtDecorationColor?: string;
  style?: object;
  numOfLines?: number;
  maxWidth?: number;
  fontFamily?: string;
}

export const BoldText: React.FC<textProps> = ({
  title,
  txtAlign = 'left',
  width,
  mrgnTop,
  mrgnLeft,
  mrgnBottom,
  fontWeight,
  fontSize,
  lineHeight,
  alignSelf,
  txtDecoration,
  txtDecorationColor,
  style,
  numOfLines,
  maxWidth,
  color = Colors.black,
}: textProps) => {
  return (
    <Text
      numberOfLines={numOfLines}
      style={[{
        lineHeight: lineHeight,
        fontSize: responsiveFontSize(fontSize ?? 2.7),
        fontWeight: fontWeight ? fontWeight : '700',
        marginTop: mrgnTop ? responsiveHeight(mrgnTop) : undefined,
        marginLeft: mrgnLeft ? responsiveHeight(mrgnLeft) : undefined,
        marginBottom: mrgnBottom ? responsiveHeight(mrgnBottom) : undefined,
        width: width ? responsiveWidth(width) : undefined,
        maxWidth: maxWidth ? responsiveWidth(maxWidth) : undefined,
        color,
        textDecorationLine: txtDecoration,
        textDecorationColor: txtDecorationColor,
        textAlign: txtAlign,
        // lineHeight: 50,
        alignSelf,
      }, style] as TextStyle}>
      {title}
    </Text>
  );
};

export const NormalText: React.FC<textProps> = ({
  title,
  color = Colors.black,
  alignSelf,
  width,
  lineHeight,
  txtDecoration,
  txtDecorationColor,
  txtAlign = 'left',
  mrgnTop,
  mrgnLeft,
  style,
  fontFamily,
  numOfLines,
  fontWeight = '400',
  fontSize,
  maxWidth,
}: textProps) => {
  return (
    <Text
      numberOfLines={numOfLines}

      style={[{
        fontSize: responsiveFontSize(fontSize ?? 1.9),
        fontWeight,
        color,
        lineHeight,
        marginTop: mrgnTop ? responsiveHeight(mrgnTop) : undefined,
        marginLeft: mrgnLeft ? responsiveHeight(mrgnLeft) : undefined,
        width: width ? responsiveWidth(width) : undefined,
        maxWidth: maxWidth ? responsiveWidth(maxWidth) : undefined,
        textAlign: txtAlign,
        textDecorationLine: txtDecoration,
        textDecorationColor: txtDecorationColor,
        alignSelf,
        fontFamily,
      }, style] as TextStyle}>
      {title}
    </Text>
  );
};
