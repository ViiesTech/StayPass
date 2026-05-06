/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {H5} from '../utils/Text';
import {Color} from '../utils/Colors';
import {Colors} from '../assets/colors';
import {responsiveFontSize, responsiveHeight} from '../responsive_dimensions';
import SvgIcons from './SvgIcons';
import {icons} from '../assets/icons';

const CustomButton = ({
  children,
  style,
  onPress,
  loading,
  disabled,
  txtColor,
  flex,
  iconName,
  iconSize,
  txtSize,
}) => {
  const whenClicked = () => {
    if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity
      onPress={whenClicked}
      style={{
        // flexGrow: flex ? flex : 1,
        borderRadius: hp('1%'),
        // height: 30,
        height: responsiveHeight(7),
        backgroundColor: Color('button'),
        shadowColor: Color('button'),
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        ...style,
      }}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size={'large'} color={Color('screenBg')} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            gap: responsiveHeight(2),
          }}>
          {iconName && (
            <SvgIcons
              xml={iconName}
              height={iconSize ? iconSize : 25}
              width={iconSize ? iconSize : 25}
            />
          )}
          <H5
            style={{
              textAlign: 'center',
              fontWeight: '700',
              color: txtColor ? txtColor : Colors.white,
              fontSize: txtSize ? responsiveFontSize(txtSize) : hp('2.2%'),
            }}
            color={Color('screenBg')}>
            {children}
          </H5>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
