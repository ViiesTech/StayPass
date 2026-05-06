import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../utils/Wrapper';
import {allImage} from '../../utils/ImageHub';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {H3, H4, H5, H6, Pera} from '../../utils/Text';
import {Color} from '../../utils/Colors';
import CustomButton from '../../components/Button';
import Background from '../../utils/Background';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../../responsive_dimensions';
import {Colors} from '../../assets/colors';

const Welcome = ({navigation}) => {
  return (
    <Wrapper style={{flex: 1, backgroundColor: Colors.white,justifyContent:'center'}}>
      <View style={welcomeStyling.mainContainer}>
        <Image source={allImage.logoWithoutName} />
        <View style={welcomeStyling.subContainer}>
          <H3 style={{fontSize: hp('3%')}} bold>
            Welcome to Stay Pass
          </H3>
          <Pera color={Color('greyText')}>
            SignUp or Login to the application
          </Pera>
        </View>
      </View>
      <View style={{}}>
        <View style={welcomeStyling.buttonConfiner}>
          <CustomButton
            onPress={() => {
              navigation.navigate('Login');
            }}
            children={'Login'}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectProfile')}
            style={welcomeStyling.btnStyle}>
            {/* <H4>Sign Up</H4> */}
            <Pera
              style={{fontWeight: 'bold', fontSize: responsiveFontSize(2)}}
              children={'Sign Up'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
};

const welcomeStyling = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('3%'),
  },
  logoStyle: {
    // width: horizontalScale(250),
    // height: verticalScale(120),
    // resizeMode: 'contain',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    borderWidth: hp('0.2%'),
    borderColor: Color('button'),
    borderRadius: hp('1%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConfiner: {
    gap: hp('5%'),
    paddingTop: responsiveHeight(10),
    paddingHorizontal: responsiveHeight(2),
  },
});

export default Welcome;
