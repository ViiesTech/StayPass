/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../assets/colors';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { BoldText, NormalText } from './Titles';
import { useNavigation } from '@react-navigation/native';

interface HeadingProps {
  title: string,
  marginTop?: number,
  showRightTxt?: boolean,
}
const ListHeading: React.FC<HeadingProps> = ({ title, marginTop, showRightTxt = true }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', marginTop: marginTop && responsiveHeight(marginTop), justifyContent: 'space-between', alignItems: 'center' }}>
      <BoldText
        alignSelf="center"
        title={title}
        fontSize={2.3}
      />
      {showRightTxt && (
        <TouchableOpacity onPress={() => navigation.navigate('PropertiesForSale')}>
          <NormalText
            fontWeight="500"
            txtDecoration="underline"
            txtDecorationColor={Colors.themeColor}
            color={Colors.themeColor}
            title="View All"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListHeading;
