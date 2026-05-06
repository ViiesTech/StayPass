/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import {responsiveHeight} from '../../responsive_dimensions';
import PropertiesCards from '../../components/PropertiesCards';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import {NormalText} from '../../components/Titles';
import {useLazyGetAllPropertiesQuery} from '../../redux/services/MainIntegration';

const PropertiesForSale = ({route}) => {
  const {
    type = 'Sale',
    propertyType = null,
    selectedBedRooms = null,
    minPrice = null,
    maxPrice = null,
    selectedCity = null,
    isFiltered = false,
  } = route?.params || {};
  console.log(
    'route?.params===',
    type,
    propertyType,
    selectedBedRooms,
    minPrice,
    maxPrice,
    isFiltered,
    selectedCity,
  );

  //  propertyType: activePropertyType,
  //             selectedBedRooms,
  //             minPrice,
  //             maxPrice,
  //             checkInDate,
  //             checkOutDate,
  const data = [
    {id: 1, title: 'Sale'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Vacation Rental'},
    {id: 4, title: 'Lease'},
  ];
  const [activeTab, setActiveTab] = useState(type || 'Sale');
  console.log('activeTab', activeTab);
  const [getAllProperties, {data: propertiesData, isLoading}] =
    useLazyGetAllPropertiesQuery();
  const sortedProperties = [...(propertiesData?.data || [])].sort((a, b) => {
    const priority = {
      'Super Hot Property': 1,
      'Hot Property': 2,
      None: 3,
    };

    return (priority[a.isFeatured] || 4) - (priority[b.isFeatured] || 4);
  });
  const getCategory = tab => {
    if (tab === 'Sale') {
      return 'Sell';
    } else if (tab === 'Vacation Rental') {
      return 'VocationalRent';
    }
    return tab;
  };
  console.log('getCategory(propertiesData)', propertiesData);
  useEffect(() => {
    const params = {};

    // Always set the category based on activeTab
    params.category = getCategory(activeTab);

    // Only apply filters if isFiltered is true **and tab hasn't changed**
    if (isFiltered && activeTab === type) {
      if (propertyType) {
        params.type = propertyType;
      }
      if (selectedBedRooms) {
        params.noOfRooms = selectedBedRooms;
      }
      if (minPrice) {
        params.minPrice = minPrice;
      }
      if (maxPrice) {
        params.maxPrice = maxPrice;
      }
      if (selectedCity) {
        params.city = selectedCity;
      }
    }

    getAllProperties(params);
  }, [activeTab]);

  return (
    <Wrapper
      isScroll
      containerStyle={{
        padding: responsiveHeight(0.1),
        paddingBottom: responsiveHeight(4),
      }}>
      <BackHeader
        title="Properties For Sale"
        style={{paddingHorizontal: responsiveHeight(2)}}
      />
      <Br space={4} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={{
            gap: responsiveHeight(1.5),
            paddingHorizontal: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(item.title)}
                style={{
                  padding: responsiveHeight(1),
                  backgroundColor:
                    activeTab === item.title ? '#E6F7F8' : Colors.white,
                  paddingHorizontal: responsiveHeight(2),
                  borderWidth: 1.5,
                  borderRadius: responsiveHeight(3),
                  borderColor:
                    activeTab === item.title
                      ? Colors.themeColor
                      : Colors.inactiveBorder,
                }}>
                <NormalText
                  title={item.title}
                  color={
                    activeTab === item.title
                      ? Colors.themeColor
                      : Colors.inactiveTxt
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Br space={2} />
      <View style={{padding: responsiveHeight(2)}}>
        {isLoading ? (
          <View
            style={{height: responsiveHeight(30), justifyContent: 'center'}}>
            <ActivityIndicator size={40} color={Colors.black} />
          </View>
        ) : !propertiesData?.data?.length ? (
          <View
            style={{height: responsiveHeight(15), justifyContent: 'center'}}>
            <NormalText
              txtAlign="center"
              fontSize={2.4}
              fontWeight="500"
              title="No Properties Found Based On Your Search!!"
            />
          </View>
        ) : (
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
              data={sortedProperties}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: responsiveHeight(1.5),
              }}
              contentContainerStyle={{
                gap: responsiveHeight(2),
                marginTop: responsiveHeight(2),
              }}
              renderItem={({item, index}) => {
                console.log('item', item);
                return <PropertiesCards data={item} />;
              }}
            />
          </View>
        )}
      </View>
    </Wrapper>
  );
};

export default PropertiesForSale;
