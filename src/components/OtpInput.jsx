/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import OtpTextInput from 'react-native-text-input-otp';
import {Color} from '../utils/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {moderateScale} from '../helpers/appHelper';
import {responsiveFontSize, responsiveHeight} from '../responsive_dimensions';

const OTPInput = ({inputs, onComplete}) => {
  const [otp, setOtp] = useState('');
  useEffect(() => {
    if (otp.length === inputs) {
      onComplete(otp);
    }
  }, [otp]);

  return (
    <OtpTextInput
      style={{
        height: responsiveHeight(9),
        borderRadius: moderateScale(10),
        borderColor: Color('inputBorder'),
        justifyContent: 'center',
        backgroundColor: Color('screenBg'),
      }}
      fontStyle={{
        color: Color('privacyAndTerms'),
        fontSize: responsiveFontSize(2.3),
      }}
      otp={otp || ['*', '*', '*', '*', '*', '*']}
      setOtp={setOtp}
      digits={inputs}
    />
  );
};

export default OTPInput;
