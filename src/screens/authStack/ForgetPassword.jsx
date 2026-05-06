import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AuthHeader from '../../utils/AuthHeader';
import Background from '../../utils/Background';
import Br from '../../utils/Br';
import Wrapper from '../../utils/Wrapper';
import CustomButton from '../../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../../utils/Colors';
import {Pera} from '../../utils/Text';
import Input from '../../utils/TextInput';
import {responsiveHeight} from '../../responsive_dimensions';
import {Colors} from '../../assets/colors';
import Input2 from '../../components/Input2';
import {useState} from 'react';
import {ShowToast} from '../../GlobalFunctions';
import {useForgotPasswordMutation} from '../../redux/services';

const ForgetPassword = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const forgotPasswordHandler = async () => {
    if (!email) {
      ShowToast('error', 'Please enter your email');
      return;
    }

    let data = {
      email: email,
    };
    await forgotPassword(data)
      .unwrap()
      .then(res => {
        console.log('response of forgot password ===>', res);
        ShowToast('success', res.message);
        if (res.success) {
          navigation.navigate('OtpScreen', {
            data: {
              // ...res.data,
              token: null,
              email: res.data.email,
              userId: res?.data?.userId,
              screenType: 'ForgotPass',
            },
          });
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('error', error?.data?.message || 'Some problem occured');
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
            heading={`Forgot Password`}
            subHeading={'Please enter your email to reset password.'}
          />
          <Br space={5} />
          <View style={{paddingHorizontal: responsiveHeight(2)}}>
            <Input2
              onChangeText={val => setEmail(val)}
              keyboardType="email-address"
              label="Email/ Phone number"
              placeholder={'jacob.brooks@gmail.com'}
            />
          </View>
        </Wrapper>
      </Background>

      <Wrapper style={{backgroundColor: Colors.white}}>
        <View style={forgetPassStyles.buttonContainer}>
          <CustomButton
            children={
              isLoading ? (
                <ActivityIndicator size={'large'} color={Colors.white} />
              ) : (
                'Continue'
              )
            }
            // onPress={() => {
            //   if (route?.params.isForgetPassword) {
            //     navigation.navigate('OtpScreen', {isForgetPassword: true});
            //   } else {
            //   }
            // }}
            onPress={forgotPasswordHandler}
          />
        </View>
      </Wrapper>
    </>
  );
};

const forgetPassStyles = StyleSheet.create({
  buttonContainer: {
    marginBottom: hp('3%'),
    paddingHorizontal: responsiveHeight(1),
  },
});

export default ForgetPassword;
