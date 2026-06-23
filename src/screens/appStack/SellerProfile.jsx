/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout, goToLogin} from '../../redux/slices';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {images} from '../../assets/images';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Br from '../../utils/Br';
import Input from '../../utils/TextInput';
import ListHeading from '../../components/ListHeading';
import PropertyReviews from '../../components/PropertyReviews';
import PropertiesCards from '../../components/PropertiesCards';
import CustomButton from '../../components/Button';
import {
  useLazyGetAllPropertiesQuery,
  useLazyGetAllReviewsQuery,
  useLazyGetSellerProfileQuery,
} from '../../redux/services/MainIntegration';
import {IMAGE_URL} from '../../redux/constant';
const SellerProfile = ({navigation, route}) => {
  const {isGuest} = useSelector(state => state?.persistedData);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState({
    id: 1,
    title: 'Sale',
    value: 'Sell',
  });
  const [categoryData, setCategoryData] = useState([
    {id: 1, title: 'Sale', value: 'Sell'},
    {id: 2, title: 'Rent', value: 'Rent'},
    {id: 3, title: 'Vacation Rental', value: 'VocationalRent'},
    {id: 4, title: 'Lease', value: 'Lease'},
  ]);
  console.log('activeTab', activeTab);
  const {_id} = route?.params;
  console.log('_id', _id);
  const [getSellerProfile, {isLoading, data: sellerData}] =
    useLazyGetSellerProfileQuery();
  const FEATURE_PRIORITY = {
    'Super Hot Property': 1,
    'Hot Property': 2,
    None: 3,
  };
  const ownerDetails = sellerData?.data;
  const {
    bio,
    name,
    image,
    email,
    phone,
    forLease = 0,
    forRent = 0,
    locationName,
    forSale = 0,
    avgRating = 0,
    forVocationalRent = 0,
  } = ownerDetails || {};
  console.log('sellerData', sellerData);
  const [getPropertyById, {data: propertyData, isFetching: isLoadingProperty}] =
    useLazyGetAllPropertiesQuery();
  const ownerProperty = propertyData?.data;
  const [getAllReviews, {data: reviewsData}] = useLazyGetAllReviewsQuery();
  const propertyReviews = reviewsData?.data;
  // const [getSellerProfile,{}] = useGetSellerProfileQuery();
  console.log('activeTab', activeTab);
  const sortedOwnerProperty = [...(ownerProperty || [])].sort(
    (a, b) =>
      (FEATURE_PRIORITY[a.isFeatured] || 99) -
      (FEATURE_PRIORITY[b.isFeatured] || 99),
  );
  useEffect(() => {
    getSellerProfile(_id)
      .unwrap()
      .then(res => console.log('Property:', res))
      .catch(err => console.log(err));
  }, [_id]);
  const data = [
    {id: 1, type: 'For Sale', quantity: forSale},
    {id: 2, type: 'For Rent', quantity: forRent},
    {id: 3, type: 'For Vocational Rental', quantity: forVocationalRent},
    {id: 4, type: 'For Lease', quantity: forLease},
  ];

  useEffect(() => {
    getPropertyById({ownerId: _id, category: activeTab.value}, true)
      .unwrap()
      .then(res => console.log('Property:', res))
      .catch(err => console.log(err));
  }, [_id, activeTab.value]);

  useEffect(() => {
    getAllReviews({vendorId: _id})
      .unwrap()
      .then(res => console.log('Reviews:', res))
      .catch(err => console.log(err));
  }, [_id]);
  return (
    <Wrapper isScroll>
      <BackHeader title="Seller Profile" />
      <Br space={4} />
      {isLoading ? (
        <View
          style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} color={Colors.black} />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveHeight(2),
            }}>
            <Image
              style={{
                height: responsiveHeight(16.5),
                width: responsiveWidth(33),
              }}
              source={{uri: `${IMAGE_URL}${image}`}}
            />
            <View>
              <NormalText
                color="#44535E"
                title={name}
                fontWeight="500"
                fontSize={2.4}
              />
              {/* <NormalText
            mrgnTop={0.3}
            color="#44535E"
            title="Member Since 03, March, 2025"
          /> */}
              <NormalText
                mrgnTop={0.3}
                color={Colors.theme4}
                fontWeight="500"
                title={(() => {
                  if (
                    [forSale, forRent, forVocationalRent, forLease].every(
                      v => v === undefined || v === null,
                    )
                  ) {
                    return 'N/A Properties Uploaded';
                  }
                  const total =
                    (Number(forSale) || 0) +
                    (Number(forRent) || 0) +
                    (Number(forVocationalRent) || 0) +
                    (Number(forLease) || 0);
                  return `${total} ${total === 1 ? 'Property' : 'Properties'} Uploaded`;
                })()}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: responsiveHeight(0.5),
                  gap: responsiveHeight(0.5),
                  paddingVertical: responsiveHeight(0.5),
                  borderRadius: responsiveHeight(4),
                  borderWidth: 1.5,
                  borderColor: '#F5C801',
                  width: responsiveWidth(20),
                  justifyContent: 'center',
                  backgroundColor: '#FBF2BE',
                }}>
                <NormalText title={avgRating} />
                <AntDesign size={25} name="star" color="#F3D762" />
              </View>
            </View>
          </View>
          <Br space={3} />
          <View style={{gap: responsiveHeight(2)}}>
            <ListHeading title="Contact Info Details" showRightTxt={false} />
            <Input
              labelFontWeight="600"
              labelColor={Colors.black}
              labelMrgn={false}
              labelTitle="Name"
              value={name ? name : ''}
              keyboardType="numeric"
              disabled
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
              value={phone ? phone.toString() : ''}
              labelFontWeight="600"
              labelColor={Colors.black}
              labelMrgn={false}
              labelTitle="Phone Number"
              keyboardType="numeric"
              disabled
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
              labelTitle="Email"
              keyboardType="numeric"
              value={email ? email : ''}
              disabled
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
              labelTitle="Address"
              disabled
              value={locationName ? locationName : ''}
              keyboardType="numeric"
              placeholder="Lorem Ipsum"
              placeholderTextColor="#44535e"
              styling={{
                backgroundColor: '#EAF0F5',
                borderColor: '#C7D5E1',
                borderWidth: 1.5,
                borderRadius: responsiveHeight(1.5),
                height: responsiveHeight(5.8),
              }}
            />
          </View>
          <View>
            <ListHeading
              marginTop={2}
              title="Uploaded Properties"
              showRightTxt={false}
            />
            <View>
              <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                }}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveHeight(1),
                        backgroundColor: '#EAF0F5',
                        borderWidth: 1.5,
                        borderColor: '#C7D5E1',
                        padding: responsiveHeight(1),
                        borderRadius: responsiveHeight(1),
                      }}>
                      <BoldText title={item.quantity} color="#102939" />
                      <NormalText
                        fontSize={1.6}
                        title={item.type}
                        color="#44535E"
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: responsiveHeight(2),
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.25,
              shadowRadius: 6,
              borderRadius: responsiveHeight(2),
              marginTop: responsiveHeight(3),
            }}>
            <BoldText title="About Seller" />
            <NormalText
              mrgnTop={1}
              color="#44535E"
              title={bio ? bio : 'No description provided by the seller.'}
            />
          </View>
          <Br space={2} />
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
            <BoldText title="Listed Properties" fontSize={2.3} />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoryData}
              contentContainerStyle={{
                gap: responsiveHeight(1.5),
                marginTop: responsiveHeight(2),
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => setActiveTab(item)}
                  style={{
                    padding: responsiveHeight(1),
                    backgroundColor:
                      activeTab.id === item.id ? '#E6F7F8' : Colors.white,
                    paddingHorizontal: responsiveHeight(2),
                    borderWidth: 1.5,
                    borderRadius: responsiveHeight(3),
                    borderColor:
                      activeTab.id === item.id
                        ? Colors.themeColor
                        : Colors.inactiveBorder,
                  }}>
                  <NormalText
                    title={item.title}
                    color={
                      activeTab.id === item.id
                        ? Colors.themeColor
                        : Colors.inactiveTxt
                    }
                  />
                </TouchableOpacity>
              )}
            />
            <FlatList
              numColumns={2}
              data={sortedOwnerProperty}
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
              ListEmptyComponent={
                isLoadingProperty ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.themeColor}
                    style={{marginVertical: responsiveHeight(2)}}
                  />
                ) : (
                  <NormalText
                    color={Colors.greyText3}
                    title={`No properties listed under ${activeTab.title}.`}
                    style={{textAlign: 'center', marginVertical: responsiveHeight(2)}}
                  />
                )
              }
            />
          </View>
          {propertyReviews?.length ? (
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
            onPress={() => {
              if (isGuest) {
                Alert.alert('Login Required', 'Please log in to leave a review.', [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Login', onPress: () => dispatch(goToLogin())},
                ]);
                return;
              }
              navigation.navigate('Ratings', {vendorId: _id});
            }}
            style={{
              marginTop: responsiveHeight(4),
              backgroundColor: Colors.theme3,
            }}
            children="Leave A Review"
          />
        </View>
      )}
    </Wrapper>
  );
};

export default SellerProfile;
