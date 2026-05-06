import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AuthHeader from '../../utils/AuthHeader';
import Background from '../../utils/Background';
import Br from '../../utils/Br';
import Wrapper from '../../utils/Wrapper';
import {Pera} from '../../utils/Text';
import Input from '../../utils/TextInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/Button';
import {Color} from '../../utils/Colors';
import {responsiveHeight} from '../../responsive_dimensions';
import {Colors} from '../../assets/colors';
import Input2 from '../../components/Input2';
import {ShowToast} from '../../GlobalFunctions';
import {useResetPasswordMutation} from '../../redux/services';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const NewPassword = ({navigation, route}) => {
  const {userId} = route?.params;
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const nav = useNavigation();
  console.log('route?.params?.data', route?.params);
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const onResetPassword = async () => {
    if (!password) {
      return ShowToast('error', 'Password is Required!');
    }
    if (!confirmPass) {
      return ShowToast('error', 'Re-Enter Your Password!');
    }
    if (password !== confirmPass) {
      ShowToast('error', 'Passwords Must Be Same!');
      return;
    }
    let data = {
      userId,
      newPassword: password,
    };

    await resetPassword(data)
      .unwrap()
      .then(res => {
        console.log('response of verify forgot pass ===>', res);
        console.log('response of verify forgot pass ===>', res.message);
        ShowToast('success', res.message);
        if (res.success) {
          nav.navigate('Login');
          // ShowToast(res.message);
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
            heading={`Enter New Password`}
            subHeading={'Please enter your new password to reset password'}
          />
          <Br space={5} />
          <View
            style={{
              paddingHorizontal: responsiveHeight(2),
              gap: responsiveHeight(2),
            }}>
            {/* <Input2
              secureTxtEntry
              label="Old Password"
              placeholder={'Enter Your Old Password'}
            /> */}
            <Input2
              onChangeText={val => setPassword(val)}
              secureTxtEntry
              label="Password"
              placeholder={'Enter Your New Password'}
            />
            <Input2
              onChangeText={val => setConfirmPass(val)}
              secureTxtEntry
              label="Re-Enter Password"
              placeholder={'Re-Enter Your New Password'}
            />
          </View>
        </Wrapper>
      </Background>
      <Wrapper style={{backgroundColor: Colors.white}}>
        <View style={newPassStyles.buttonContainer}>
          <CustomButton
            children={
              isLoading ? (
                <ActivityIndicator size={'large'} color={Colors.white} />
              ) : (
                'Continue'
              )
            }
            // onPress={() => {
            //   navigation.navigate('Login');
            // }}
            onPress={onResetPassword}
          />
        </View>
      </Wrapper>
    </>
  );
};

const newPassStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp('3%'),
  },
  inputLabel: {
    paddingBottom: hp('1%'),
    marginLeft: wp('2%'),
  },
  buttonContainer: {
    marginBottom: hp('3%'),
  },
});

export default NewPassword;
