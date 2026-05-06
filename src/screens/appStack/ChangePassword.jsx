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
import {useChangePasswordMutation} from '../../redux/services';
import {ShowToast} from '../../GlobalFunctions';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const ChangePassword = ({navigation, route}) => {
  const [changePassword, {isLoading}] = useChangePasswordMutation();
  const {_id} = useSelector(state => state?.persistedData?.user);

  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPass: '',
  });
  console.log('state', state);
  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };
  const onUpdatePassPress = async () => {
    if (!state.oldPassword) {
      ShowToast('error', 'Please enter your Old password');
      return;
    }
    if (!state.newPassword) {
      ShowToast('error', 'Please enter your New password');
      return;
    }
    if (!state.confirmNewPass) {
      ShowToast('error', 'Please Re-Enter your new password');
      return;
    }
    if (state.newPassword.length < 8) {
      ShowToast('error', 'Password is too weak');
      return;
    }
    if (state.newPassword !== state.confirmNewPass) {
      ShowToast('error', 'Passwords must be same!');
      return;
    }
    let data = {
      userId: _id,
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
    };
    await changePassword(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>s===', res);
        ShowToast(res?.success ? 'success' : 'error', res.message);
        if (res.success) {
          // navigation.navigate('OtpScreen', {
          //   data: {
          //     // ...res.data,
          //     token: res.signupToken,
          //     userId: null,
          //     email: null,
          //     screenType: 'RegisterUser',
          //   },
          // });
          navigation?.goBack();
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
            heading="Change Password"
            subHeading="Please enter your new password to reset password"
          />
          <Br space={5} />
          <View
            style={{
              paddingHorizontal: responsiveHeight(2),
              gap: responsiveHeight(2),
            }}>
            <Input2
              onChangeText={val => onChangeText('oldPassword', val)}
              secureTxtEntry
              label="Old Password"
              placeholder={'Enter Your Old Password'}
            />
            <Input2
              onChangeText={val => onChangeText('newPassword', val)}
              secureTxtEntry
              label="Password"
              placeholder={'Enter Your New Password'}
            />
            <Input2
              onChangeText={val => onChangeText('confirmNewPass', val)}
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
            onPress={onUpdatePassPress}
            children={
              isLoading ? (
                <ActivityIndicator size={'large'} color={Colors.white} />
              ) : (
                'Continue'
              )
            }
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

export default ChangePassword;
