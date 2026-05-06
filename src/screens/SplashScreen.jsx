import {View, Text, Image, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../assets/images';
import {Color} from '../utils/Colors';
import {responsiveHeight, responsiveWidth} from '../responsive_dimensions';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: Color('button'),
          height: responsiveHeight(29),
          width: responsiveWidth(Platform.OS === 'android' ? 59 : 62.5),
          borderRadius: responsiveHeight(30),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: responsiveHeight(50), width: responsiveWidth(50)}}
          source={images.logoWhite}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
