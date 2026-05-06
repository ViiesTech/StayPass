/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../utils/TextInput';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {BackHeader} from '../../components/Header';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import {ActivityIndicator, View} from 'react-native';
import CustomButton from '../../components/Button';
import {BoldText} from '../../components/Titles';
import StarRating from 'react-native-star-rating-widget';
import {useAddReviewMutation} from '../../redux/services/MainIntegration';
import {useSelector} from 'react-redux';
import {ShowToast} from '../../GlobalFunctions';

const Ratings = ({route, navigation}) => {
  const [totalStars, setTotalStars] = useState(4);
  const {vendorId = null, propertyId = null} = route?.params;
  const [msg, setMsg] = useState('');
  const [addReview, {isLoading}] = useAddReviewMutation();
  const {_id} = useSelector(state => state?.persistedData?.user);

  console.log('vendorid', vendorId);
  console.log('propertyId', propertyId);
  console.log('totalStars', totalStars);
  console.log('msg', msg);

  const addReviewHandler = async () => {
    if (!msg) {
      return ShowToast('error', 'Please Enter Your Review');
    }
    let data = {
      userId: _id,
      rating: totalStars,
      message: msg,
    };

    if (vendorId) {
      data.vendorId = vendorId;
    } else if (propertyId) {
      data.propertyId = propertyId;
    }

    addReview(data)
      .unwrap()
      .then(res => {
        if (res?.success) {
          ShowToast('success', res.message);
          navigation.navigate('BottomStack');
        } else {
          ShowToast('error', res.message);
        }
      })
      .catch(err => {
        console.log('errr', err);

        ShowToast('error', err?.data?.message || 'Some problem occured');
      });
  };
  return (
    <Wrapper isScroll containerStyle={{}}>
      <BackHeader
        title={vendorId ? 'Ratings to seller' : 'Ratings to property'}
      />
      <Br space={2} />
      <View
        style={{marginTop: responsiveHeight(2), gap: responsiveHeight(2.5)}}>
        <View style={{alignItems: 'center'}}>
          <BoldText title="Excellent" fontSize={2.5} fontWeight="700" />
          <StarRating
            enableHalfStar={false}
            emptyColor={Colors.black}
            starSize={45}
            color={Colors.themeColor}
            style={{alignSelf: 'center', marginTop: responsiveHeight(1)}}
            rating={totalStars}
            onChange={setTotalStars}
          />
        </View>
        <Input
          labelFontWeight="700"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Write your review"
          placeholderTextColor="#44535e"
          onChangeText={val => setMsg(val)}
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
          onPress={addReviewHandler}
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

export default Ratings;
