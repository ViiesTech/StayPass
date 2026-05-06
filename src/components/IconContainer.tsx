/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import { NormalText } from './Titles';
import { responsiveHeight } from '../responsive_dimensions';

interface ContainerProps {
  title: string,
  iconName: string,
  Icon: any,
  iconSize?: number,
  txtFontSize?:number,
  txtFontWeight?:string,
  width?:number;
}
const IconContainer: React.FC<ContainerProps> = ({ title, iconName, Icon, iconSize,txtFontSize,txtFontWeight,width }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveHeight(1),
      }}>
      <Icon name={iconName} color="#0D263C" size={iconSize ? iconSize : 18} />
      <NormalText numOfLines={1} width={width ? width : null} title={title} fontSize={txtFontSize ? txtFontSize : 1.7} fontWeight={txtFontWeight && txtFontWeight} color="#44535E" />
    </View>
  );
};

export default IconContainer;
