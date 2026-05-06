/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { Colors } from '../assets/colors';
import { responsiveHeight } from '../responsive_dimensions';
import { BoldText } from './Titles';
import CustomButton from './Button';

interface InterestedInPropertyProps {
  btnTitle: string,
  onPress: () => void,
}
const InterestedInProperty: React.FC<InterestedInPropertyProps> = ({ btnTitle, onPress }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        borderRadius: responsiveHeight(2),
        padding: responsiveHeight(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <BoldText title="Interested In This Property? " fontSize={1.9} />
      <CustomButton
        onPress={onPress}
        txtSize={1.8}
        children={btnTitle}
        style={{
          backgroundColor: Colors.theme3,
          // width: responsiveWidth(42),
          paddingHorizontal: responsiveHeight(1),
          height: responsiveHeight(4.2),
        }}
      />
    </View>
  );
};

export default InterestedInProperty;
