/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHeader, BackHeader2, Header} from '../../components/Header';
import Input from '../../utils/TextInput';
import {Colors} from '../../assets/colors';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Wrapper from '../../components/Wrapper';
import {BoldText, NormalText} from '../../components/Titles';
import Br from '../../utils/Br';
import ListHeading from '../../components/ListHeading';
import {images} from '../../assets/images';
import IconContainer from '../../components/IconContainer';
import CustomButton from '../../components/Button';
import PropertiesCards from '../../components/PropertiesCards';
import {
  useCreatePaymentIntentMutation,
  useLazyGetAllPropertiesQuery,
} from '../../redux/services/MainIntegration';
import {ShowToast} from '../../GlobalFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../redux/slices';

const Home = ({navigation}) => {
  const [getAllProperties, {data: propertiesData, isLoading}] =
    useLazyGetAllPropertiesQuery();
  const [searchQuery, setSearchQuery] = useState('');
  // const [createPaymentIntent, {isLoading: paymentIntentLoading}] =
  //   useCreatePaymentIntentMutation();
  const {user} = useSelector(state => state?.persistedData);
  const [superHotProperties, setSuperHotProperties] = useState([]);
  const [hotProperties, setHotProperties] = useState([]);
  const dispatch = useDispatch();
  const [regularProperties, setRegularProperties] = useState([]);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const data = [
    {id: 1, title: 'Sale'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Vacational Rental'},
    {id: 4, title: 'Lease'},
  ];
  const getAllPropertiesHandler = async () => {
    getAllProperties({})
      .unwrap()
      .then(res => {
        if (!res?.success) {
          // ... ShowToast error
        } else {
          // 2. Filter the data after a successful fetch
          const allProperties = res?.data || [];

          const superHot = allProperties.filter(
            p => p.isFeatured === 'Super Hot Property',
          );
          const hot = allProperties.filter(
            p => p.isFeatured === 'Hot Property',
          );
          const regular = allProperties.filter(
            // Assuming 'Regular' or 'None' properties have a different value or are simply missing the key/value
            p =>
              p.isFeatured !== 'Super Hot Property' &&
              p.isFeatured !== 'Hot Property',
          );

          // 3. Set the state
          setSuperHotProperties(superHot);
          setHotProperties(hot);
          setRegularProperties(regular);
        }
      })
      .catch(error => {
        // ... error handling
      });
  };
  // const handleCreatePaymentIntent = async () => {
  //   try {
  //     const response = await createPaymentIntent({_id: user._id}).unwrap();
  //     if (response?.success) {
  //       dispatch(
  //         setUserData({
  //           ...user,
  //           stripeCustomerId: response?.customerId,
  //         }),
  //       );
  //     }
  //     console.log('Payment Intent Created:', response);
  //     // Handle the response as needed
  //   } catch (error) {
  //     console.error('Error creating payment intent:', error);
  //     ShowToast(
  //       'error',
  //       error?.response?.data?.message ||
  //         error?.message ||
  //         'Some Problem Occured',
  //     );
  //   }
  // };
  // useEffect(() => {
  //   if (!user?.stripeCustomerId) {
  //     handleCreatePaymentIntent();
  //   }
  // }, []);
  // useEffect(() => {
  //   getAllProperties()
  //     .unwrap()
  //     .then(res => {
  //       if (!res?.success) {
  //         ShowToast('error', res?.message);
  //       }
  //       console.log('ress', res);
  //     })
  //     .catch(error => {
  //       console.log('erorrdsfs service', error);
  //       ShowToast(
  //         'error',
  //         error?.response?.data?.message ||
  //           error?.message ||
  //           'Some Problem Occured',
  //       );
  //     });
  // }, []);
  useEffect(() => {
    getAllPropertiesHandler();
    // This screen loads properties once on mount and refreshes manually after actions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchesSearch = property => {
    if (!normalizedSearch) {
      return true;
    }

    const searchableValues = [
      property?.propertyName,
      property?.address,
      property?.category,
    ]
      .filter(Boolean)
      .map(value => String(value).toLowerCase());

    return searchableValues.some(value => value.includes(normalizedSearch));
  };

  const filteredSuperHotProperties = superHotProperties.filter(matchesSearch);
  const filteredHotProperties = hotProperties.filter(matchesSearch);
  const filteredRegularProperties = regularProperties.filter(matchesSearch);
  const hasSearchResults =
    filteredSuperHotProperties.length > 0 ||
    filteredHotProperties.length > 0 ||
    filteredRegularProperties.length > 0;

  return (
    <Wrapper isScroll containerStyle={{paddingBottom: 120}}>
      <Header />
      <View style={{marginTop: responsiveHeight(3)}}>
        <Input
          styling={{
            borderColor: '#DDDDDD',
            borderRadius: responsiveHeight(2),
            height: responsiveHeight(6.5),
          }}
          placeholder="Search what you need"
          placeholderTextColor="#BBBBBB"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter')}
          style={{
            backgroundColor: '#F19921',
            position: 'absolute',
            right: 0,
            height: '100%',
            justifyContent: 'center',
            padding: responsiveHeight(1),
            paddingHorizontal: responsiveHeight(1.8),
            borderRadius: responsiveHeight(1),
          }}>
          <Ionicons name="filter" color={Colors.white} size={25} />
        </TouchableOpacity>
      </View>
      <Br space={3} />
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 7,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 6,
          borderRadius: responsiveHeight(2),
          padding: responsiveHeight(2),
        }}>
        <ListHeading title="Browse Properties" showRightTxt={false} />
        <FlatList
          numColumns={2}
          data={data}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            gap: responsiveHeight(2),
          }}
          contentContainerStyle={{
            gap: responsiveHeight(2),
            marginTop: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PropertiesForSale', {
                    type: item.id === 3 ? 'Vacation Rental' : item?.title,
                  })
                }
                style={{
                  backgroundColor: '#F4F5F6',
                  // padding:responsiveHeight(1),
                  width: responsiveWidth(37),
                  // paddingVertical:responsiveHeight(3),
                  height: responsiveHeight(11),
                  borderRadius: responsiveHeight(3),
                  borderColor: '#C7D5E1',
                  borderWidth: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BoldText
                  fontWeight="500"
                  fontSize={2.5}
                  title={item.title}
                  alignSelf="center"
                  txtAlign="center"
                  color={Colors.browseTxt}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Br space={3} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={Colors.black} />
        </View>
      ) : normalizedSearch && !hasSearchResults ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingVertical: responsiveHeight(8),
          }}>
          <NormalText
            txtAlign="center"
            fontSize={2.2}
            fontWeight="600"
            title="No properties found for your search."
          />
        </View>
      ) : (
        <View>
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
            <ListHeading title="Explore Properties" />
            {filteredSuperHotProperties?.length ? (
              <FlatList
                numColumns={2}
                data={filteredSuperHotProperties.slice(0, 2)}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  gap: responsiveHeight(1.5),
                }}
                contentContainerStyle={{
                  gap: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                }}
                renderItem={({item, index}) => {
                  return (
                    <PropertiesCards
                      refresh={getAllPropertiesHandler}
                      data={item}
                    />
                  );
                }}
              />
            ) : (
              <View
                style={{
                  height: responsiveHeight(18),
                  justifyContent: 'center',
                }}>
                <NormalText
                  txtAlign="center"
                  fontSize={2.2}
                  fontWeight="600"
                  title="No Super Hot Properties Found!"
                />
              </View>
            )}
          </View>
          <Br space={3} />

          <ImageBackground
            source={images.banner}
            style={{
              padding: responsiveHeight(1.5),
              paddingVertical: responsiveHeight(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            imageStyle={{borderRadius: responsiveHeight(2)}}>
            <View>
              <BoldText
                fontSize={2.2}
                title="Get Support Of Millions Across Africa"
                width={46}
                lineHeight={30}
              />
              <Br space={2} />
              <CustomButton
                onPress={() =>
                  navigation.navigate('BottomStack', {screen: 'Community'})
                }
                children="Join Community"
                style={{
                  backgroundColor: Colors.theme3,
                  width: responsiveWidth(42),
                  height: responsiveHeight(5.5),
                  // paddingVertical: responsiveHeight(0.4),
                }}
              />
            </View>
            <View style={{}}>
              <Image source={images.bannerImage} />
            </View>
          </ImageBackground>
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
            <ListHeading title="Explore Properties" />
            {filteredHotProperties?.length ? (
              <FlatList
                numColumns={2}
                data={filteredHotProperties.slice(0, 2)}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  gap: responsiveHeight(1.5),
                }}
                contentContainerStyle={{
                  gap: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                }}
                renderItem={({item, index}) => {
                  return (
                    <PropertiesCards
                      // refresh={getAllPropertiesHandler}
                      data={item}
                    />
                  );
                }}
              />
            ) : (
              <View
                style={{
                  height: responsiveHeight(18),
                  justifyContent: 'center',
                }}>
                <NormalText
                  txtAlign="center"
                  fontSize={2.2}
                  fontWeight="600"
                  title="No Hot Properties Found!"
                />
              </View>
            )}
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
            <ListHeading title="Explore Properties" />
            {filteredRegularProperties?.length ? (
              <FlatList
                numColumns={2}
                data={filteredRegularProperties.slice(0, 2)}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  gap: responsiveHeight(1.5),
                }}
                contentContainerStyle={{
                  gap: responsiveHeight(2),
                  marginTop: responsiveHeight(2),
                }}
                renderItem={({item, index}) => {
                  return (
                    <PropertiesCards
                      // refresh={getAllPropertiesHandler}
                      index={index}
                      data={item}
                    />
                  );
                }}
              />
            ) : (
              <View
                style={{
                  height: responsiveHeight(18),
                  justifyContent: 'center',
                }}>
                <NormalText
                  txtAlign="center"
                  fontSize={2.2}
                  fontWeight="600"
                  title="No Properties Found!"
                />
              </View>
            )}
          </View>
        </View>
      )}

      {/* <View
        style={{
          backgroundColor: Colors.white,
          elevation: 7,
          borderRadius: responsiveHeight(2),
          padding: responsiveHeight(2),
        }}>
        <ListHeading title="Latest News" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]}
          contentContainerStyle={{
            gap: responsiveHeight(2),
            marginTop: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={{width: responsiveWidth(40), gap: responsiveHeight(1)}}>
                <Image
                  source={images.property1}
                  style={{borderRadius: responsiveHeight(2)}}
                />
                <NormalText
                  title="Lorem ipsum simply dummy text is for using printing or pricing."
                  fontWeight="500"
                  fontSize={1.7}
                />
              </View>
            );
          }}
        />
      </View> */}
    </Wrapper>
  );
};
export default Home;
