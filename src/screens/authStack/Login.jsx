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
import CheckBox from 'react-native-check-box';
import Background from '../../utils/Background';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../responsive_dimensions';
import Input2 from '../../components/Input2';
import {Colors} from '../../assets/colors';
import {NormalText} from '../../components/Titles';
import {icons} from '../../assets/icons';
import {useLoginMutation} from '../../redux/services';
import {ShowToast} from '../../GlobalFunctions';

const Login = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, {isLoading}] = useLoginMutation();
  const onLoginPress = async () => {
    if (!email) {
      ShowToast('error', 'Please enter your email');
      return;
    }
    if (!password) {
      ShowToast('error', 'Please enter your password');
      return;
    }
    let data = {
      email: email,
      password: password,
    };
    await login(data)
      .unwrap()
      .then(res => {
        console.log('response of login ===>', res);
        ShowToast('success', res.message);
      })
      .catch(error => {
        console.log('error while login ===>', error.data.message);
        ShowToast('error', error?.data?.message || 'Some problem occured');
      });
    // nav.navigate('Main');
  };
  return (
    <>
      <Background containerStyle={{paddingTop: 1, paddingBottom: 0.00001}}>
        <Wrapper x={0.1}>
          <AuthHeader
            containerFlex={1}
            mrgnTop={3}
            heading={'Getting Started'}
            subHeading={'Let’s login for explore continues'}
          />
          <Br space={2} />
          <View
            style={{
              paddingHorizontal: responsiveHeight(2),
              marginTop: responsiveHeight(2),
              gap: responsiveHeight(2),
            }}>
            <Input2
              onChangeText={val => setEmail(val)}
              keyboardType="email-address"
              label="Email/ Phone number"
              placeholder={'jacob.brooks@gmail.com'}
            />
            <Input2
              onChangeText={val => setPassword(val)}
              secureTxtEntry
              label="Password"
              placeholder={'Enter your password'}
            />
            <Br space={1} />
            <CustomButton
              // onPress={() => {
              //   navigation.navigate('CreateProfile');
              // }}
              onPress={onLoginPress}
              children={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={Colors.white} />
                ) : (
                  'Login'
                )
              }
            />
            <Br space={0.01} />
            <View style={loginStyle.checkBoxConfiner}>
              <View style={loginStyle.rememberContainer}>
                <CheckBox
                  checkBoxColor={Color('button')}
                  checkedCheckBoxColor={Color('button')}
                  onClick={() => {
                    setToggleCheckBox(!toggleCheckBox);
                  }}
                  isChecked={toggleCheckBox}
                />
                <Pera
                  style={{fontSize: responsiveFontSize(1.8)}}
                  color={Colors.greyText5}>
                  Remember me
                </Pera>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ForgetPassword', {
                    isForgetPassword: true,
                  })
                }>
                <Pera
                  style={{fontSize: responsiveFontSize(1.8)}}
                  color={Colors.greyText5}>
                  Forget Password?
                </Pera>
              </TouchableOpacity>
            </View>
            <View
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
              <NormalText title="Or Sign in with" color={Colors.greyText3} />
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: Colors.borderColor6,
                  width: responsiveWidth(23),
                }}
              />
            </View>
            <Br space={0.01} />

            <CustomButton
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
            />
            <CustomButton
              iconName={icons.apple}
              iconSize={30}
              style={{backgroundColor: Colors.black}}
              txtColor={Colors.white}
              onPress={() => {
                navigation.navigate('SelectProfile');
              }}
              children={'Continue with Apple'}
            />
            <View style={loginStyle.bottomConfiner}>
              <Pera style={{fontSize: responsiveFontSize(1.8)}}>
                Don't have an account?
              </Pera>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Pera
                  color={Color('signUpText')}
                  style={{fontSize: responsiveFontSize(1.8)}}>
                  Sign up
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
export default Login;
