/* eslint-disable no-return-assign */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import {Colors} from '../assets/colors';
import {NormalText} from '../components/Titles';
import {responsiveHeight} from '../responsive_dimensions';

const Input = ({
  leftIcon,
  rightIcon,
  inputStyle,
  styling,
  actAsButton,
  onPress,
  labelTitle,
  labelFontWeight,
  labelColor,
  labelMrgn = true,
  multiline = false,
  disabled = false,
  value,
  ...props
}) => {


  const style = {
    backgroundColor: Color('screenBg'),
    borderWidth: 1,
    borderColor: Color('inputBorder'),
    padding: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: hp('0.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    ...styling,
  };
  const textAreaStyle = {
    backgroundColor: Color('screenBg'),
    borderWidth: 1,
    borderColor: Color('inputBorder'),
    padding: hp('1%'),
    paddingHorizontal: wp('3%'),
    overflow: 'auto',
    borderRadius: hp('0.5%'),
    ...styling,
  };
  const pressEvent = () => {
    if (onPress) {
      onPress();
    }
  };
  const WrapBtn = ({children}) => {
    return (
      <TouchableOpacity onPress={pressEvent} style={style}>
        {children}
      </TouchableOpacity>
    );
  };
  if (actAsButton) {
    return (
      <WrapBtn>
        {leftIcon}
        <TextInput
          placeholderTextColor={Colors.platinum}
          style={{
            color: Color('black'),
            height: hp('4%'),
            padding: 0,
            fontFamily: 'Inter_18pt-Medium',
            ...inputStyle,
          }}
          readOnly={actAsButton}
          {...props}
        />
      </WrapBtn>
    );
  }
  if (props.multiline) {
    return (
      <View style={textAreaStyle}>
        <TextInput
          placeholderTextColor={Colors.platinum}
          style={{
            color: Color('black'),
            textAlignVertical: 'top',
            fontFamily: 'Inter_18pt-Medium',
            ...inputStyle,
          }}
          {...props}
        />
      </View>
    );
  }
  return (
    <View style={{gap: labelTitle ? responsiveHeight(1) : null}}>
      {labelTitle && (
        <NormalText
          mrgnLeft={labelMrgn && 2.5}
          fontSize={1.8}
          fontWeight={labelFontWeight}
          color={labelColor ? labelColor : Colors.greyText3}
          title={labelTitle}
        />
      )}
      <View style={style}>
        {leftIcon}
        <TextInput
          value={value}
          multiline={multiline}
          placeholderTextColor={Colors.platinum}
          readOnly={disabled}
          style={{
            color: Color('black'),
            height: hp('4%'),
            width: rightIcon ? '94%' : '100%',
            padding: 0,
            fontFamily: 'Inter_18pt-Medium',
            ...inputStyle,
          }}
          {...props}
        />
        {rightIcon}
      </View>
    </View>
  );
};
export default Input;
