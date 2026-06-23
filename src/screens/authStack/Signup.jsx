/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../../utils/Wrapper';
import AuthHeader from '../../utils/AuthHeader';
import {Pera} from '../../utils/Text';
import {Color} from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../utils/Br';
import CustomButton from '../../components/Button';
import Background from '../../utils/Background';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../../responsive_dimensions';
import Input2 from '../../components/Input2';
import {Colors} from '../../assets/colors';
import {ShowToast} from '../../GlobalFunctions';
import {useRegisterMutation} from '../../redux/services';
import UGCPolicyAgreement from '../../components/UGCPolicyAgreement';

const Signup = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [register, {isLoading}] = useRegisterMutation();

  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPass: '',
  });
  console.log('state', state);
  const onSignupPress = async () => {
    if (!state.email) {
      ShowToast('error', 'Please enter your email');
      return;
    }
    if (!state.password) {
      ShowToast('error', 'Please enter your password');
      return;
    }
    if (!state.confirmPass) {
      ShowToast('error', 'Please Re-Enter your password');
      return;
    }
    if (state.password.length < 8) {
      ShowToast('error', 'Password is too weak');
      return;
    }
    if (state.password !== state.confirmPass) {
      ShowToast('error', 'Passwords must be same!');
      return;
    }
    if (!toggleCheckBox) {
      ShowToast('error', 'Please Accept Terms & Policy To Proceed!');
      return;
    }
    let data = {
      email: state.email,
      password: state.password,
      type: 'User',
    };
    await register(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>s===', res);
        ShowToast('success', res.message);
        if (res.success) {
          navigation.navigate('OtpScreen', {
            data: {
              // ...res.data,
              token: res.signupToken,
              userId: null,
              email: null,
              screenType: 'RegisterUser',
            },
          });
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('error', error?.data?.message || 'Some problem occured');
      });
  };

  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };

  return (
    <>
      <Background containerStyle={{paddingTop: 1, paddingBottom: 0.00001}}>
        <Wrapper x={0.1}>
          <AuthHeader
            containerFlex={1}
            mrgnTop={3}
            heading={'Create Account'}
            subHeading={'Signup and discover around the world'}
          />
          <Br space={2} />
          <View
            style={{
              paddingHorizontal: responsiveHeight(2),
              marginTop: responsiveHeight(2),
              gap: responsiveHeight(2),
            }}>
            <Input2
              keyboardType="email-address"
              label="Email"
              onChangeText={val => onChangeText('email', val)}
              placeholder={'jacob.brooks@gmail.com'}
            />
            <Input2
              onChangeText={val => onChangeText('password', val)}
              secureTxtEntry
              label="Password"
              placeholder={'Enter your password'}
            />
            <Input2
              onChangeText={val => onChangeText('confirmPass', val)}
              secureTxtEntry
              label="Confirm Password"
              placeholder={'Re-Enter your password'}
            />
            <Br space={1} />
            <View style={loginStyle.checkBoxConfiner}>
              <UGCPolicyAgreement
                accepted={toggleCheckBox}
                onChange={setToggleCheckBox}
              />
            </View>
            <CustomButton
              // onPress={() => {
              //   navigation.navigate('CreateProfile');
              // }}
              onPress={onSignupPress}
              children={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={Colors.white} />
                ) : (
                  'Sign Up'
                )
              }
            />
            <Br space={0.01} />
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveHeight(1),
                alignSelf: 'center',
                gap: responsiveHeight(2),
              }}>
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors.borderColor6,
                  width: responsiveWidth(23),
                }}
              />
              <NormalText title="Or Sign Up with" color={Colors.greyText3} />
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors.borderColor6,
                  width: responsiveWidth(23),
                }}
              />
            </View> */}
            <Br space={0.01} />
            {/* <CustomButton
              iconName={icons.google}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors.black,
                borderWidth: 1.4,
              }}
              txtColor={Colors.black}
              onPress={() => {
                navigation.navigate('SelectProfile');
              }}
              children={'Continue with Google'}
            /> */}
            <View style={loginStyle.bottomConfiner}>
              <Pera style={{fontSize: responsiveFontSize(1.8)}}>
                Already have an account?
              </Pera>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Pera
                  color={Color('signUpText')}
                  style={{fontSize: responsiveFontSize(1.8)}}>
                  Login
                </Pera>
              </TouchableOpacity>
            </View>
          </View>
        </Wrapper>
      </Background>
    </>
  );
};

const loginStyle = StyleSheet.create({
  inputLabel: {
    paddingBottom: hp('1%'),
  },
  inputContainer: {
    paddingBottom: hp('3%'),
  },
  checkBoxConfiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  bottomConfiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
    alignSelf: 'center',
  },
});
export default Signup;
