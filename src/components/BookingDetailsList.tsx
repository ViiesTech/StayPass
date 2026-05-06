/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { BoldText, NormalText } from './Titles';
import { Colors } from '../assets/colors';


interface BookingsListProps {
  heading: string;
  title: string;
  Icon: any;
  iconName: string;
  width?: number;
  style?: object;
}
const BookingDetailsList: React.FC<BookingsListProps> = ({ heading, width, title, Icon, iconName, style }) => {
  return (
    <View
      style={[{ gap: responsiveHeight(1), width: width ? responsiveWidth(width) : null }, style]}>
      <BoldText
        fontSize={2}
        title={heading}
        color={Colors.theme4}
      />
      <View style={styles.iconTxtContainer}>
        <Icon name={iconName} color={Colors.theme3} size={22} />
        <NormalText
          title={title}
          color="#44535E"
          fontSize={2}
        />
      </View>
    </View>
  );
};

export default BookingDetailsList;
const styles = StyleSheet.create({
  iconTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveHeight(2),
  },
});
