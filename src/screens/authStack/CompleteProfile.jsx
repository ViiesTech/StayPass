/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import AuthHeader from '../../utils/AuthHeader';
import Background from '../../utils/Background';
import Br from '../../utils/Br';
import Wrapper from '../../utils/Wrapper';
import {H6, Pera} from '../../utils/Text';
import Input from '../../utils/TextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../../utils/Colors';
import CheckBox from 'react-native-check-box';
import {moderateScale, verticalScale} from '../../helpers/appHelper';
import CustomButton from '../../components/Button';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {images} from '../../assets/images';
import {icons} from '../../assets/icons';
import {Colors} from '../../assets/colors';
import SvgIcons from '../../components/SvgIcons';
import {BoldText} from '../../components/Titles';

const CompleteProfile = ({navigation, route}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <Background>
      <Wrapper x={0.1}>
        <AuthHeader
          goBack={() => {
            navigation.goBack();
          }}
          isBackButton
          heading={'Complete your Profile'}
          subHeading={'Please enter your personal details'}
        />
        <Br space={5} />
        <View style={{paddingHorizontal: responsiveHeight(2)}}>
          <View style={{alignItems: 'center', marginTop: responsiveHeight(1)}}>
            <View>
              <View
                style={{
                  elevation: 4,
                  backgroundColor: Colors.white,
                  borderRadius: responsiveHeight(0.8),
                }}>
                <Image
                  resizeMode="stretch"
                  source={images.profile3}
                  style={{
                    height: responsiveHeight(18),
                    width: responsiveWidth(36.5),
                    borderRadius: responsiveHeight(2.5),
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderRadius: responsiveHeight(3),
                  borderWidth: 2.5,
                  width: responsiveWidth(13.3),
                  borderColor: Colors.greyText3,
                  backgroundColor: Colors.white,
                  padding: responsiveHeight(1.6),
                  position: 'absolute',
                  bottom: -10,
                  right: -20,
                }}>
                <SvgIcons xml={icons.camera} height={22} width={22} />
              </TouchableOpacity>
            </View>
            <BoldText
              title="Date Of Birth"
              mrgnBottom={1}
              alignSelf="center"
              mrgnTop={5}
              color={Colors.darkText}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveHeight(2),
                marginVertical: responsiveHeight(2),
              }}>
              <Input
                placeholder="Day"
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(6.5),
                  alignItems: 'center',
                  textAlign: 'center',
                  color:Colors.black,
                }}
              />
              <Input
                placeholder="Month"
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(6.5),
                  textAlign: 'center',
                  color:Colors.black,
                }}
              />
              <Input
                placeholder="Year"
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(6.5),
                  textAlign: 'center',
                  color:Colors.black,
                }}
              />
            </View>
          </View>

          <Br space={8} />
        </View>
        <View style={{paddingHorizontal: responsiveHeight(2)}}>
          <CustomButton
            children={'Next'}
            onPress={() => {
              navigation.navigate('BottomStack');
            }}
          />
        </View>
      </Wrapper>
    </Background>
  );
};

const signStyle = StyleSheet.create({
  inputLabel: {
    paddingBottom: hp('1%'),
    paddingLeft: wp('2%'),
  },
  inputContainer: {
    paddingBottom: hp('1%'),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  link: {
    color: Color('privacyAndTerms'),
    textDecorationLine: 'underline',
    fontSize: moderateScale(14),
  },

  linksContainer: {
    flexDirection: 'row',
    columnGap: 2,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default CompleteProfile;
