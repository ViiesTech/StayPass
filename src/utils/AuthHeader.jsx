import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {allImage} from './ImageHub';
import IconComponent from './CustomIcons';
import {Color} from './Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/appHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {H3, H4, H6, Pera} from './Text';
import {images} from '../assets/images';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../responsive_dimensions';
import {Colors} from '../assets/colors';
import {useNavigation} from '@react-navigation/native';

const AuthHeader = ({
  isBackButton,
  goBack,
  heading,
  subHeading,
  mrgnTop,
  containerFlex,
  imageTop,
  mrgnTopText,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View
          style={
            isBackButton
              ? headerStyles.mainConfiner
              : headerStyles.mainConfiner1
          }>
          {isBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={headerStyles.backButton}>
              <IconComponent
                packageName={'Ionicons'}
                iconName={'chevron-back'}
                color={Color('headingColor')}
                size={moderateScale(20)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            flex: containerFlex ? containerFlex : 0.9,
            marginTop: isBackButton
              ? null
              : mrgnTop
              ? responsiveHeight(mrgnTop)
              : responsiveHeight(3),
            // alignSelf:'center',
            // flex: isBackButton ? responsiveHeight(0.101) : 1,
            // marginTop: responsiveHeight(3.5),
          }}>
          <Image
            source={images.logo}
            style={{
              height: responsiveHeight(10),
              width: responsiveWidth(35),
              top: imageTop ? responsiveHeight(imageTop) : null,
            }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View
        style={[
          headerStyles.textConfiner,
          {marginTop: mrgnTopText ? responsiveHeight(mrgnTopText) : null},
        ]}>
        <H4
          bold
          style={{
            fontFamily: 'Poppins-Bold',
          }}
          color={Colors.darkText}>
          {heading}
        </H4>
        <Pera
          style={{
            textAlign: 'center',
            width: responsiveWidth(85),
            fontSize: responsiveFontSize(2),
          }}
          color={Colors.labelText}>
          {subHeading}
        </Pera>
      </View>
    </>
  );
};
const headerStyles = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.backContainer,
    // borderWidth: wp('0.1%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('5%'),
    width: responsiveWidth(8.5),
    height: responsiveHeight(4),
    // height: verticalScale(30),
  },
  mainConfiner: {
    flexDirection: 'row',
    // alignItems:'center',
    paddingHorizontal: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
    // gap: wp('18%'),
  },
  mainConfiner1: {
    // flexDirection:'row',
    alignItems: 'center',
  },
  textConfiner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveHeight(4),
  },
});

export default AuthHeader;
