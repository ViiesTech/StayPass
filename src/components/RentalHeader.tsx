import { View } from 'react-native';
import React from 'react';
import { BoldText, NormalText } from './Titles';
import { Colors } from '../assets/colors';
import { responsiveHeight } from '../responsive_dimensions';

interface RentalHeaderProps {
  title: string,
}
const RentalHeader: React.FC<RentalHeaderProps> = ({ title }) => {
  return (
    <View style={{ backgroundColor: Colors.theme2, padding: responsiveHeight(1.5) }}>
      <BoldText alignSelf="center" title={title} color={Colors.white} />
      <NormalText mrgnTop={1} fontWeight="400" alignSelf="center" title="lorem ipsum dolor sit init liorem ipsum" color={Colors.white} />
    </View>
  );
};

export default RentalHeader;
