/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout, goToLogin} from '../../redux/slices';
import Wrapper from '../../components/Wrapper';
import Slider from '../../components/Slider';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {images} from '../../assets/images';
import {BoldText, NormalText} from '../../components/Titles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../assets/colors';
import CustomButton from '../../components/Button';
const slides = [
  {key: '1', image: images.slider2},
  {key: '2', image: images.slider1},
  {key: '3', image: images.slider2},
  {key: '4', image: images.slider1},
  {key: '5', image: images.slider2},
];

const data = [
  {id: 1, title: 'Air Conditioning'},
  {id: 2, title: 'Flat Screen TV'},
  {id: 3, title: 'WiFi'},
  {id: 4, title: 'Soundproof'},
  {id: 5, title: 'Mini Bar'},
];
const RoomDetails = ({navigation, route}) => {
  const {isGuest} = useSelector(state => state?.persistedData);
  const dispatch = useDispatch();
  const sharedBathroomData = [
    {id: 1, title: 'Free toiletries'},
    {id: 2, title: 'Slippers'},
    {id: 3, title: 'Bathrobe'},
    {id: 4, title: 'Hairdryer'},
    {id: 5, title: 'Toilet'},
    {id: 6, title: 'Toilet paper'},
    {id: 7, title: 'Bathtub or Shower'},
  ];
  const roomFacilitiesData = [
    {id: 1, title: 'Dining table'},
    {id: 2, title: 'Electric Kettle'},
    {id: 3, title: 'Flat-screen TV'},
    {id: 4, title: 'Sofa bed'},
    {id: 5, title: 'Fan'},
    {id: 6, title: 'Heating'},
    {id: 7, title: 'Towels'},
    {id: 8, title: 'Telephone'},
    {id: 9, title: 'Ironing facilities'},
    {id: 10, title: 'Soundproof'},
    {id: 11, title: 'Carpeted'},
    {id: 12, title: 'Air conditioning'},
    {id: 13, title: 'TV'},
    {id: 14, title: 'Dining area'},
    {id: 15, title: 'Linens'},
    {id: 16, title: 'Clothes rack'},
    {id: 17, title: 'Minibar'},
    {id: 18, title: 'Hand sanitizer'},
    {id: 19, title: 'Towels/Sheets (extra fee)'},
  ];

  const {
    roomImages,
    facilities,
    bedType,
    window,
    serviceCharges,
    pricePerNight,
    roomNo,
    maxOccupancy,
    propertyId,
    roomName,
    ownerId,
    _id,
  } = route?.params?.roomData;
  const isSmoking = window === 'Smoking';
  console.log('route?.params?.roomData', route?.params);
  return (
    <Wrapper
      isScroll
      containerStyle={{
        padding: responsiveHeight(0.01),
        paddingTop: responsiveHeight(0.01),
      }}>
      <Slider sliderData={roomImages} />
      <View style={{padding: responsiveHeight(2)}}>
        <BoldText mrgnTop={1} title={`${bedType} Room`} fontSize={2.3} />
        <View style={{marginTop: responsiveHeight(1.5)}}>
          <FlatList
            data={facilities}
            numColumns={3} // 👈 number of items per row (adjust as needed)
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: responsiveHeight(1.8),
                  paddingVertical: responsiveHeight(0.8),
                  borderWidth: 1.7,
                  borderRadius: responsiveHeight(3),
                  backgroundColor: Colors.white,
                  borderColor: '#646464',
                  margin: 5,
                  // flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(1),
                  justifyContent: 'center',
                }}
                onPress={() => setActiveTab(item.id)}>
                <View
                  style={{
                    height: responsiveHeight(2.2),
                    width: responsiveWidth(4.3),
                    borderRadius: responsiveHeight(2),
                    backgroundColor: Colors.theme3,
                  }}
                />
                <NormalText
                  fontSize={2}
                  fontWeight="700"
                  color={'#646464'}
                  title={item}
                />
              </View>
            )}
          />
        </View>
        {/* <BoldText mrgnTop={2} title="Room Size" fontSize={2.3} />
        <NormalText
          fontSize={2.2}
          mrgnTop={2}
          title="Comfy beds, 6.7 - Based on 3 reviews"
        />
        <NormalText
          mrgnTop={1}
          title="The spacious double room offers air conditioning, Soundproof walls, as well as a private bathroom boasting a bath and a shower. The double room provides a mini-bar, a dining area, an electric kettle, a carpated floor and a flat-screen TV. The unit has 1 bed."
        /> */}

        <BoldText mrgnTop={2} title="Room Name:" fontSize={2.3} />
        <NormalText fontSize={2.2} mrgnTop={1} title={roomName} />
        <BoldText mrgnTop={2} title="Price/Day:" fontSize={2.3} />
        <NormalText fontSize={2.2} mrgnTop={1} title={`KES ${pricePerNight}`} />
        <BoldText mrgnTop={2} title="Service Charges/Day:" fontSize={2.3} />
        <NormalText fontSize={2.2} mrgnTop={1} title={`KES ${serviceCharges}`} />
        <BoldText mrgnTop={2} title="Number Of Occupancy:" fontSize={2.3} />
        <NormalText fontSize={2.2} mrgnTop={1} title={`${maxOccupancy}`} />

        {/* <BoldText mrgnTop={2} title="In Your Shared Bathroom:" fontSize={2.3} />
        <View>
          <FlatList
            numColumns={2}
            data={sharedBathroomData}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: responsiveHeight(2),
            }}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveHeight(1.5),
                    width: '55%',
                  }}>
                  <Ionicons
                    size={25}
                    color={Colors.black}
                    name="checkmark-sharp"
                  />
                  <NormalText fontWeight="500" title={item.title} />
                </View>
              );
            }}
          />
        </View> */}
        <View>
          <BoldText mrgnTop={2} title="Room Facilities:" fontSize={2.3} />
          <FlatList
            numColumns={2}
            data={facilities}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: responsiveHeight(2),
            }}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveHeight(1.5),
                    width: '55%',
                  }}>
                  <Ionicons
                    size={25}
                    color={Colors.black}
                    name="checkmark-sharp"
                  />
                  <NormalText numOfLines={1} fontWeight="500" title={item} />
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: responsiveHeight(1),
            marginTop: responsiveHeight(2),
          }}>
          <BoldText title="Smoking:" fontSize={2.3} />
          <NormalText
            color="#646464"
            title={isSmoking ? `${window} Allowed` : 'No Smoking'}
            fontSize={2.3}
          />
        </View>

        <CustomButton
          onPress={() => {
            if (isGuest) {
              Alert.alert('Login Required', 'Please log in to reserve a room.', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Login', onPress: () => dispatch(goToLogin())},
              ]);
              return;
            }
            navigation.navigate('ReservationDetails', {
              propertyId,
              _id,
              roomNo,
              maxOccupancy,
              pricePerNight,
              serviceCharges,
              ownerId,
            });
          }}
          children="Reserve Room"
          style={{
            backgroundColor: Colors.theme3,
            marginTop: responsiveHeight(3),
          }}
        />
      </View>
    </Wrapper>
  );
};

export default RoomDetails;
