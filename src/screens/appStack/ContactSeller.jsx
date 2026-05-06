import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../utils/TextInput';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {BackHeader} from '../../components/Header';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import {ActivityIndicator, View} from 'react-native';
import CustomButton from '../../components/Button';
import {useContactFormMutation} from '../../redux/services/MainIntegration';
import {ShowToast} from '../../GlobalFunctions';
import {useSelector} from 'react-redux';

const ContactSeller = ({navigation, route}) => {
  const [contactForm, {isLoading}] = useContactFormMutation();
  const {_id, email, name, phone} = useSelector(
    state => state.persistedData.user,
  );
  const {ownerId, propertyId} = route?.params;
  const [state, setState] = useState({
    name: name,
    phoneNumber: phone,
    msg: '',
  });
  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };
  console.log('istated', state);
  const contactFormHandler = async () => {
    const {phoneNumber, name: userName, msg} = state;
    let apiData = {
      ownerId: ownerId,
      propertyId: propertyId,
      userId: _id,
      name: userName,
      email: email,
      phone: phoneNumber,
      message: msg,
    };
    contactForm(apiData)
      .unwrap()
      .then(res => {
        console.log('ress', res);
        if (res?.success) {
          ShowToast('success', res?.message);
          navigation?.navigate('BottomStack');
        } else {
          ShowToast('error', res?.message);
        }
      })
      .catch(err => {
        ShowToast('error', error?.data?.message || 'Some problem occured');
      });
  };
  return (
    <Wrapper isScroll containerStyle={{}}>
      <BackHeader title="Contact Seller" />
      <Br space={2} />
      <View
        style={{marginTop: responsiveHeight(2), gap: responsiveHeight(2.5)}}>
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Name"
          value={state?.name}
          keyboardType="numeric"
          placeholder="Enter your name"
          placeholderTextColor="#44535e"
          onChangeText={val => onChangeText('name', val)}
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
          labelTitle="Phone Number"
          value={state?.phoneNumber?.toString()}
          keyboardType="numeric"
          placeholder="Enter your phone number"
          placeholderTextColor="#44535e"
          onChangeText={val => onChangeText('phoneNumber', val)}
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
          labelTitle="Email"
          value={email}
          placeholder={email}
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
          value={state?.msg}
          labelTitle="Message"
          placeholderTextColor="#44535e"
          onChangeText={val => onChangeText('msg', val)}
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
        <CustomButton
          onPress={contactFormHandler}
          style={{backgroundColor: Colors.theme3}}
          children={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Colors.white} />
            ) : (
              'Submit'
            )
          }
        />
      </View>
    </Wrapper>
  );
};

export default ContactSeller;
