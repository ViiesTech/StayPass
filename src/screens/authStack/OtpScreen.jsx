/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import OTPInput from '../../components/OtpInput';
import AuthHeader from '../../utils/AuthHeader';
import Background from '../../utils/Background';
import Br from '../../utils/Br';
import Wrapper from '../../utils/Wrapper';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from '../../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveHeight} from '../../responsive_dimensions';
import {
  useVerifyForgotPassMutation,
  useVerifyOTPMutation,
} from '../../redux/services';
import {ShowToast} from '../../GlobalFunctions';
import {Colors} from '../../assets/colors';

const OtpScreen = ({navigation, route}) => {
  const [otpCode, setOtpCode] = useState('');
  const {token, email, screenType, userId} = route?.params?.data;

  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [verifyForgotPass, {isLoading: forgotPassLoading}] =
    useVerifyForgotPassMutation();

  const onVerifyEmailPress = async () => {
    if (!otpCode) {
      ShowToast('error', 'Otp Is Required');
      return;
    }
    let data = {
      OTP: otpCode,
      signupToken: token,
    };

    await verifyOTP(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>', res);
        // ShowToast(res.message);
        if (res.success) {
          // nav.navigate('EmailVerification', {
          //   data: { ...res.data, type: type },
          // });
          ShowToast('success', res.message);
        } else {
          ShowToast('error', res.message);
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast(
          'error',
          error?.response?.data?.message || 'Some problem occured',
        );
      });
  };
  const onVerifyForgotPass = async () => {
    if (!otpCode) {
      ShowToast('error', 'Otp Is Required');
      return;
    }
    let data = {
      email: email,
      OTP: otpCode,
    };

    await verifyForgotPass(data)
      .unwrap()
      .then(res => {
        console.log('response of verify forgot pass ===>', res);
        console.log('response of verify forgot pass ===>', res.message);
        // ShowToast('success', res.message);
        if (res.success) {
          navigation.navigate('NewPassword', {
            userId,
          });
          ShowToast('success', res.message);
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast(
          'error',
          error?.response?.data?.message || 'Some problem occured',
        );
      });
  };
  return (
    <>
      <Background>
        <Wrapper x={0.1}>
          <AuthHeader
            mrgnTopText={5}
            imageTop={3}
            goBack={() => {
              navigation.goBack();
            }}
            isBackButton
            heading={'Enter OTP'}
            subHeading={
              'We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity'
            }
          />
          <Br space={8} />
          <View style={{paddingHorizontal: responsiveHeight(2)}}>
            <OTPInput inputs={4} onComplete={otp => setOtpCode(otp)} />
          </View>
        </Wrapper>
      </Background>
      <Wrapper>
        <View style={otpStyles.buttonContainer}>
          <CustomButton
            // children={'Continue'}
            children={
              isLoading || forgotPassLoading ? (
                <ActivityIndicator size={'large'} color={Colors.white} />
              ) : (
                'Continue'
              )
            }
            // onPress={() => {
            //   if (route?.params?.isForgetPassword) {
            //     navigation.navigate('NewPassword');
            //   }
            // }}
            onPress={
              screenType === 'ForgotPass'
                ? onVerifyForgotPass
                : onVerifyEmailPress
            }
          />
        </View>
      </Wrapper>
    </>
  );
};

const otpStyles = StyleSheet.create({
  buttonContainer: {
    marginBottom: hp('3%'),
  },
});

export default OtpScreen;
