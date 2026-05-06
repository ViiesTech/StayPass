/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../responsive_dimensions';
import {BoldText, NormalText} from './Titles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const PropertyReviews = ({data}) => {
  const formattedDate = moment(data.createdAt).format('MMMM YYYY');
  console.log(formattedDate);
  console.log('reviews data', data);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <BoldText title={data?.userId?.name} fontSize={2.2} />
          <BoldText fontSize={2} title={formattedDate} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1.5),
            marginTop: responsiveHeight(2),
          }}>
          <NormalText width={45} color="#5A5A5A" title={data?.message} />
          <View
            style={{
              height: responsiveHeight(10),
              width: responsiveWidth(1),
              backgroundColor: '#C7C7C7',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveHeight(2),
            }}>
            <AntDesign size={30} name="star" color="#F3D762" />
            <BoldText title={data?.rating} fontSize={3} />
          </View>
        </View>
        {/* <NormalText
          mrgnTop={3}
          fontWeight="600"
          title="Reply"
          txtDecoration="underline"
        /> */}
      </View>
    </View>
  );
};

export default PropertyReviews;
