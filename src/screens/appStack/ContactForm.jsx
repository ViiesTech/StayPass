import React from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../utils/TextInput';
import {responsiveHeight} from '../../responsive_dimensions';
import {Header} from '../../components/Header';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import {View} from 'react-native';
import CustomButton from '../../components/Button';

const ContactForm = () => {
  return (
    <Wrapper isScroll containerStyle={{paddingBottom: responsiveHeight(2)}}>
      <Header title="Contact Form" />
      <Br space={2} />
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: responsiveHeight(2),
            gap: responsiveHeight(2.5),
          }}>
          <Input
            labelFontWeight="600"
            labelColor={Colors.black}
            labelMrgn={false}
            keyboardType="numeric"
            placeholder="First name"
            placeholderTextColor="#44535e"
            styling={{
              backgroundColor: '#EAF0F5',
              borderColor: '#C7D5E1',
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              height: responsiveHeight(5.8),
            }}
          />
          <Input
            labelFontWeight="600"
            labelColor={Colors.black}
            labelMrgn={false}
            keyboardType="numeric"
            placeholder="Last name"
            placeholderTextColor="#44535e"
            styling={{
              backgroundColor: '#EAF0F5',
              borderColor: '#C7D5E1',
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              height: responsiveHeight(5.8),
            }}
          />
          <Input
            labelFontWeight="600"
            labelColor={Colors.black}
            labelMrgn={false}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#44535e"
            styling={{
              backgroundColor: '#EAF0F5',
              borderColor: '#C7D5E1',
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              height: responsiveHeight(5.8),
            }}
          />
          <Input
            labelFontWeight="600"
            labelColor={Colors.black}
            labelMrgn={false}
            placeholder="Email Address"
            keyboardType="email-address"
            placeholderTextColor="#44535e"
            styling={{
              backgroundColor: '#EAF0F5',
              borderColor: '#C7D5E1',
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              height: responsiveHeight(5.8),
            }}
          />
          <Input
            placeholder="Message"
            labelFontWeight="600"
            labelColor={Colors.black}
            labelMrgn={false}
            placeholderTextColor="#44535e"
            inputStyle={{
              height: responsiveHeight(15.8),
            }}
            styling={{
              backgroundColor: '#EAF0F5',
              borderColor: '#C7D5E1',
              borderWidth: 1.5,
              alignItems: 'flex-start',
              borderRadius: responsiveHeight(1.5),
            }}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            style={{
              backgroundColor: Colors.theme4,
            }}
            children="Submit"
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default ContactForm;
