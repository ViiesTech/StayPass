import React from 'react';
import { Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color } from './Colors';

interface Props {
    children: any,
    style?: object,
    numberOfLines?: number,
    bold?: boolean,
    extraBold?: boolean,
    medium?: boolean,
    color?: any,
}

export const Small = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Inter_18pt-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('1.3%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};

export const Pera = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Inter_18pt-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('1.4%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};

export const H3 = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Poppins-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('3%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};

export const H4 = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Inter_18pt-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('2.5%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};

export const H5 = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Inter_18pt-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('2.2%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};

export const H6 = ({color, children, numberOfLines, style, bold, extraBold, medium}: Props) => {
    const family = bold ? 'Inter_18pt-Bold' : extraBold ? 'Inter_24pt-ExtraBold' : medium ? 'Inter_18pt-Medium' : 'Inter_18pt-Regular';
    return (
        <Text numberOfLines={numberOfLines} style={{
            color: color || Color('text'),
            fontSize: hp('1.9%'),
            fontFamily: family,
            ...style,
        }}>{children}</Text>
    );
};
