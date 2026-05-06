/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Slider from '../../components/Slider';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import IconContainer from '../../components/IconContainer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/Button';
import InterestedInProperty from '../../components/InterestedInProperty';
import PropertiesCards from '../../components/PropertiesCards';
import PropertyReviews from '../../components/PropertyReviews';
import ListHeading from '../../components/ListHeading';
import {
  useLazyGetAllPropertiesQuery,
  useLazyGetAllReviewsQuery,
} from '../../redux/services/MainIntegration';
import {IMAGE_URL} from '../../redux/constant';
import MapView, {Marker} from 'react-native-maps';

const slides = [
  {key: '1', image: images.slider1},
  {key: '2', image: images.slider2},
  {key: '3', image: images.slider1},
  {key: '4', image: images.slider2},
  {key: '5', image: images.slider1},
];

const data = [
  {id: 1, title: 'Location is key in real estate'},
  {id: 2, title: 'Property value depends on various factor'},
  {id: 3, title: 'Access to amenities boosts property value'},
  {id: 4, title: 'Location is key in real estate'},
  {id: 5, title: 'Property value depends on various factor'},
  {id: 6, title: 'Access to amenities boosts property value'},
];

const roomsData = [
  {
    id: 1,
    rooms: '01',
    roomType: 'Single Room',
    bedType: 'King',
    price: '$45:00',
  },
  {
    id: 2,
    rooms: '02',
    roomType: 'Double Room',
    bedType: 'Queen',
    price: '$45:00',
  },
  {
    id: 3,
    rooms: '03',
    roomType: 'Deluxe Room',
    bedType: 'Twin',
    price: '$45:00',
  },
  {
    id: 4,
    rooms: '04',
    roomType: 'King Size Room',
    bedType: 'Sofa',
    price: '$45:00',
  },
  {
    id: 5,
    rooms: '05',
    roomType: 'Family Suite',
    bedType: 'King',
    price: '$45:00',
  },
  {
    id: 6,
    rooms: '06',
    roomType: 'Double Room',
    bedType: 'Twin',
    price: '$45:00',
  },
];
const PropertyDetails = ({navigation, route}) => {
  const {_id} = route?.params;
  const [getPropertyById, {data: propertyData, isLoading: isLoadingProperty}] =
    useLazyGetAllPropertiesQuery();
  const [
    getSimilarProperties,
    {data: similarPropData, isLoading: isLoadingSimilar},
  ] = useLazyGetAllPropertiesQuery();
  const [getAllReviews, {data: reviewsData}] = useLazyGetAllReviewsQuery();
  const propertyReviews = reviewsData?.data;
  const [propertyType, setPropertyType] = useState(null);
  console.log('propertyData', propertyData);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log('region', region);
  const propertyDetails = propertyData?.data[0];
  const {
    type,
    category,
    propertyName,
    address,
    price,
    noOfRooms,
    noOfBathrooms,
    propertySize,
    propertyDescription,
    rooms,
    ownerId,
  } = propertyDetails || {};
  console.log('ownerId', ownerId);

  const isVacational = category === 'VocationalRent';
  const filteredAndSortedProperties = similarPropData?.data
    ?.filter(item => item._id !== _id) // remove current property
    .sort((a, b) => {
      const order = ['Super Hot Property', 'Hot Property', 'None'];
      const aFeature = a.isFeatured || 'None'; // fallback if missing
      const bFeature = b.isFeatured || 'None'; // fallback if missing
      return order.indexOf(aFeature) - order.indexOf(bFeature);
    });
  useEffect(() => {
    if (!propertyDetails) return;
    if (propertyDetails.category === 'Sell') {
      setPropertyType('For Sale');
    } else if (propertyDetails.category === 'Rent') {
      setPropertyType('For Rent');
    } else if (propertyDetails.category === 'Lease') {
      setPropertyType('For Lease');
    } else {
      setPropertyType('For Vacational Rental');
    }
  }, [propertyDetails]);
  // set map region from property location if available
  useEffect(() => {
    const coords = propertyDetails?.location?.coordinates;
    // coordinates are stored as [longitude, latitude]
    if (Array.isArray(coords) && coords.length >= 2) {
      const [lng, lat] = coords;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else if (propertyDetails?.latitude && propertyDetails?.longitude) {
      setRegion({
        latitude: propertyDetails.latitude,
        longitude: propertyDetails.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [propertyDetails]);
  useEffect(() => {
    getPropertyById({propertyId: _id})
      .unwrap()
      .then(res => console.log('Property:', res))
      .catch(err => console.log(err));
  }, [_id]);
  useEffect(() => {
    if (!propertyData?.data[0]?.category) return;
    getSimilarProperties({category: propertyData.data[0].category})
      .unwrap()
      .then(res => console.log('Similar Properties:', res))
      .catch(err => console.log(err));
  }, [propertyData]);
  useEffect(() => {
    if (propertyData?.data[0]?.category === 'VocationalRent') {
      getAllReviews({propertyId: _id})
        .unwrap()
        .then(res => console.log('Reviews:', res))
        .catch(err => console.log(err));
    }
  }, [propertyData]);

  const navigateToContactHandler = () => {
    navigation?.navigate('ContactSeller', {
      ownerId: ownerId?._id,
      propertyId: _id,
    });
  };
  return (
    <Wrapper
      isScroll
      containerStyle={{
        padding: responsiveHeight(0.01),
        paddingTop: responsiveHeight(0.01),
      }}>
      {isLoadingProperty || !propertyDetails ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={Colors.black} />
        </View>
      ) : (
        <View>
          {propertyDetails?.images?.length && (
            <Slider sliderData={propertyDetails?.images} />
          )}
          <View style={{padding: responsiveHeight(2)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(2),
                }}>
                <View
                  style={{
                    backgroundColor: Colors.themeColor,
                    padding: responsiveHeight(0.7),
                    paddingHorizontal: responsiveHeight(1.5),
                    borderRadius: responsiveHeight(0.5),
                  }}>
                  <NormalText
                    txtAlign="center"
                    style={{
                      width: responsiveWidth(isVacational ? 40 : 20),
                      maxWidth: responsiveWidth(isVacational ? 40 : 24),
                      maxHeight: responsiveHeight(3),
                    }}
                    color={Colors.white}
                    numOfLines={1}
                    title={propertyType}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: Colors.black,
                    padding: responsiveHeight(0.45),
                    paddingHorizontal: responsiveHeight(1.5),
                    borderRadius: responsiveHeight(0.5),
                  }}>
                  <NormalText title={type} />
                </View>
              </View>
              {/* <View>
                <NormalText fontWeight="600" title="Gross Price" />
                <BoldText
                  fontSize={2}
                  fontWeight="700"
                  txtDecoration="line-through"
                  title="R 3315100"
                />
              </View> */}

              {!isVacational && (
                <View style={{alignItems: 'center'}}>
                  <BoldText title="Price" fontSize={2} />
                  <BoldText title={`KES ${price}`} />
                </View>
              )}
            </View>
            <BoldText
              mrgnTop={1}
              fontSize={2.5}
              fontWeight="800"
              width={80}
              title={propertyName}
            />
            {/* <Br space={1} /> */}
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(2),
                }}>
                <View
                  style={{
                    height: responsiveHeight(4),
                    width: responsiveWidth(2),
                    backgroundColor: Colors.theme3,
                    borderRadius: responsiveHeight(2),
                  }}
                />
                <BoldText
                  title="Ref # ABCD4567"
                  fontWeight="600"
                  fontSize={2.3}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <BoldText title="Price" fontSize={2} />
                <BoldText title={`R ${price}`} />
              </View>
            </View> */}
            <Br space={2} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveHeight(2),
              }}>
              <Ionicons
                name="location-sharp"
                color={Colors.themeColor}
                size={25}
              />
              <NormalText width={80} title={address} />
            </View>
            <Br space={3} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <IconContainer
                txtFontSize={2}
                txtFontWeight="700"
                iconSize={25}
                iconName="bathtub"
                Icon={FontAwesome}
                title={noOfBathrooms != null ? `${noOfBathrooms} Baths` : 'N/A'}
              />
              <IconContainer
                txtFontSize={2}
                txtFontWeight="700"
                iconSize={25}
                iconName="bed-outline"
                Icon={Ionicons}
                title={noOfRooms != null ? `${noOfRooms} Beds` : 'N/A'}
              />
              <BoldText
                width={25}
                numOfLines={1}
                title={`Area : ${propertySize}`}
                fontSize={2}
              />
            </View>
            <Br space={2} />
            {/* <InterestedInProperty
              onPress={
                category === 'VocationalRent'
                  ? () => navigation.navigate('PaymentDetails')
                  : navigateToContactHandler
              }
              btnTitle={
                category === 'VocationalRent' ? 'Book Now' : 'Contact Now'
              }
            /> */}
            {category !== 'VocationalRent' && (
              <InterestedInProperty
                onPress={navigateToContactHandler}
                btnTitle={'Contact Now'}
              />
            )}
            <Br space={2} />
            <View>
              <BoldText mrgnTop={1} title="About The Property" fontSize={2.3} />
              <NormalText
                mrgnTop={1.5}
                lineHeight={24}
                title={propertyDescription}
                fontSize={2}
              />
            </View>
            {/* <Br space={2} /> */}
            {/* <View>
              <FlatList
                data={data}
                contentContainerStyle={{gap: responsiveHeight(1)}}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveHeight(2),
                      }}>
                      <View
                        style={{
                          borderWidth: 1.5,
                          padding: responsiveHeight(0.4),
                          borderRadius: responsiveHeight(2),
                        }}>
                        <View
                          style={{
                            backgroundColor: '#102939',
                            borderRadius: responsiveHeight(2),
                            padding: responsiveHeight(0.4),
                          }}>
                          <Feather name="arrow-up-right" color={Colors.white} />
                        </View>
                      </View>
                      <NormalText
                        fontWeight="500"
                        fontSize={1.9}
                        title={item.title}
                      />
                    </View>
                  );
                }}
              />
            </View> */}
            {/* <Br space={2} /> */}
            {category !== 'VocationalRent' && <Br space={2} />}
            {category !== 'VocationalRent' && (
              <InterestedInProperty
                onPress={navigateToContactHandler}
                btnTitle={'Contact Now'}
              />
            )}
            {category !== 'VocationalRent' && <Br space={3} />}
            <View>
              {/* <ImageBackground
                imageStyle={{borderRadius: responsiveHeight(2)}}
                style={{height: responsiveHeight(40), justifyContent: 'center'}}
                source={images.map}>
                <View
                  style={{alignItems: 'center', gap: responsiveHeight(0.5)}}>
                  <Ionicons
                    name="location-sharp"
                    color={Colors.theme3}
                    size={responsiveHeight(5.5)}
                  />
                  <NormalText title="Tap to View Map" color={Colors.white} />
                  <NormalText
                    txtAlign="center"
                    title="Find out the location of the property on
an interactive society map"
                    color={Colors.white}
                  />
                </View>
              </ImageBackground> */}
              {propertyDetails?.location?.coordinates ||
              (propertyDetails?.latitude && propertyDetails?.longitude) ? (
                <MapView
                  userInterfaceStyle="light"
                  provider={MapView.PROVIDER_GOOGLE}
                  style={{
                    height: responsiveHeight(40),
                    borderRadius: responsiveHeight(2),
                  }}
                  region={region}
                  mapType="standard"
                  showsUserLocation={false}
                  showsMyLocationButton={false}
                  showsCompass={true}
                  showsScale={true}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  onMapReady={() => console.log('Map is ready')}
                  onError={error => console.log('Map Error:', error)}>
                  <Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title={propertyDetails?.propertyName || 'Property Location'}
                    description={propertyDetails?.address || 'Property Address'}
                  />
                </MapView>
              ) : (
                <View
                  style={{
                    height: responsiveHeight(40),
                    borderRadius: responsiveHeight(2),
                    backgroundColor: Colors.white2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NormalText title="Location not available" />
                </View>
              )}
            </View>
            <Br space={3} />
            <View
              style={{
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
                borderRadius: responsiveHeight(2),
                padding: responsiveHeight(2),
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveHeight(1.5),

                // justifyContent: 'space-between',
              }}>
              <Image
                style={{
                  height: responsiveHeight(10),
                  width: responsiveWidth(20),
                }}
                source={
                  ownerId?.image
                    ? {uri: `${IMAGE_URL}${ownerId?.image}`}
                    : images.userDummy
                }
              />
              <View style={{flex: 1}}>
                <BoldText title="Marketed By" fontSize={2.3} />
                <NormalText mrgnTop={1} title={ownerId?.name} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <BoldText title="Owner" fontSize={2} />
                  <CustomButton
                    onPress={() =>
                      navigation.navigate('SellerProfile', {_id: ownerId?._id})
                    }
                    txtSize={1.8}
                    children="View Profile"
                    style={{
                      backgroundColor: Colors.themeColor,
                      // width: responsiveWidth(42),
                      paddingHorizontal: responsiveHeight(1.7),
                      height: responsiveHeight(4.2),
                    }}
                  />
                </View>
              </View>
            </View>
            <Br space={3} />
            {category === 'VocationalRent' && rooms?.length ? (
              <View>
                <ListHeading title="Rooms" showRightTxt={false} />
                <View
                  style={{
                    borderRadius: responsiveHeight(1),
                    backgroundColor: Colors.white,
                    elevation: 8,
                    borderWidth: 1.5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: {width: 0, height: 2},
                    shadowRadius: 3,
                    marginTop: responsiveHeight(2),

                    overflow: 'hidden', // 👈 important to clip corners
                  }}>
                  <FlatList
                    ListHeaderComponent={() => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: Colors.theme4,
                          borderRadius: responsiveHeight(0.8),
                          paddingHorizontal: responsiveHeight(1),
                          paddingVertical: responsiveHeight(1.7),
                          gap: responsiveHeight(1.5),
                        }}>
                        <BoldText
                          color={Colors.white}
                          fontWeight="700"
                          style={{
                            width: responsiveWidth(12),
                            textAlign: 'center',
                          }}
                          fontSize={1.7}
                          title="Rooms"
                        />
                        <BoldText
                          color={Colors.white}
                          fontWeight="700"
                          style={{
                            width: responsiveWidth(18),
                            textAlign: 'center',
                          }}
                          fontSize={1.7}
                          title="Room Type"
                        />
                        <BoldText
                          color={Colors.white}
                          fontWeight="700"
                          style={{
                            width: responsiveWidth(15),
                            textAlign: 'center',
                          }}
                          fontSize={1.7}
                          title="Bed Type"
                        />
                        <BoldText
                          color={Colors.white}
                          fontWeight="700"
                          style={{
                            width: responsiveWidth(12),
                            textAlign: 'center',
                          }}
                          fontSize={1.7}
                          title="Price"
                        />

                        {/* <View style={{flex:1.2}}/> */}
                      </View>
                    )}
                    data={rooms}
                    renderItem={({item}) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: responsiveHeight(1),
                          alignItems: 'center',
                          gap: responsiveHeight(1.5),

                          backgroundColor:
                            item.id % 2 === 0 ? Colors.white2 : Colors.white,
                          paddingVertical: responsiveHeight(1.2),
                        }}>
                        <NormalText
                          color="#44535E"
                          style={{
                            width: responsiveWidth(12),
                            textAlign: 'center',
                          }}
                          fontSize={1.4}
                          title={item?.roomNo}
                        />
                        <NormalText
                          color="#44535E"
                          style={{
                            width: responsiveWidth(18),
                            textAlign: 'center',
                          }}
                          fontSize={1.4}
                          title={`${item.roomType} Room`}
                        />
                        <NormalText
                          color="#44535E"
                          style={{
                            width: responsiveWidth(15),
                            textAlign: 'center',
                          }}
                          fontSize={1.4}
                          title={item?.bedType}
                        />
                        <NormalText
                          color="#44535E"
                          style={{
                            width: responsiveWidth(12),
                            textAlign: 'center',
                          }}
                          fontSize={1.4}
                          title={`KES ${item?.pricePerNight}`}
                        />
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                          <CustomButton
                            onPress={() =>
                              navigation.navigate('RoomDetails', {
                                roomData: {...item, ownerId: ownerId?._id},
                              })
                            }
                            txtSize={1.3}
                            children="View Details"
                            style={{
                              backgroundColor: Colors.theme3,
                              width: responsiveWidth(18),
                              // paddingHorizontal: responsiveHeight(0.2),
                              height: responsiveHeight(4),
                            }}
                          />
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            ) : null}

            <Br space={2} />
            {filteredAndSortedProperties?.length ? (
              <View
                style={{
                  backgroundColor: Colors.white,
                  elevation: 7,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  borderRadius: responsiveHeight(2),
                  padding: responsiveHeight(1.5),
                }}>
                <FlatList
                  numColumns={2}
                  data={filteredAndSortedProperties}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    gap: responsiveHeight(1.5),
                  }}
                  contentContainerStyle={{
                    gap: responsiveHeight(2),
                    marginTop: responsiveHeight(2),
                  }}
                  renderItem={({item, index}) => {
                    return <PropertiesCards data={item} />;
                  }}
                />
              </View>
            ) : null}

            {category === 'VocationalRent' ? (
              <View
                style={{
                  backgroundColor: '#F9FCFF',
                  borderWidth: 1.5,
                  borderColor: Colors.borderColor7,
                  padding: responsiveHeight(2),
                  borderRadius: responsiveHeight(2),
                  marginTop: responsiveHeight(3),
                }}>
                <BoldText title="Property reviews and rating" fontSize={2.2} />
                <View>
                  <FlatList
                    contentContainerStyle={{gap: responsiveHeight(2)}}
                    data={propertyReviews}
                    renderItem={({item, index}) => {
                      return <PropertyReviews data={item} />;
                    }}
                  />
                </View>
              </View>
            ) : null}

            <CustomButton
              onPress={
                category === 'VocationalRent'
                  ? () =>
                      navigation.navigate(
                        'Ratings',
                        category === 'VocationalRent'
                          ? {propertyId: _id}
                          : {vendorId: ownerId},
                      )
                  : navigateToContactHandler
              }
              children={
                category === 'VocationalRent' ? 'Leave A Review' : 'Contact Now'
              }
              style={{
                backgroundColor: Colors.theme3,
                marginTop: responsiveHeight(3),
              }}
            />
          </View>
        </View>
      )}
    </Wrapper>
  );
};

export default PropertyDetails;
