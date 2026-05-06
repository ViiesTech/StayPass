/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight} from '../../responsive_dimensions';
import {BackHeader, Header} from '../../components/Header';
import Br from '../../utils/Br';
import {Colors} from '../../assets/colors';
import {NormalText} from '../../components/Titles';
import PropertiesCards from '../../components/PropertiesCards';
import {useLazyGetAllFvrtsQuery} from '../../redux/services/MainIntegration';

const MyFavrts = () => {
  const data = [
    {id: 1, title: 'Sale', value: 'Sell'},
    {id: 2, title: 'Rent', value: 'Rent'},
    {id: 3, title: 'Vacation Rental', value: 'VocationalRent'},
    {id: 4, title: 'Lease', value: 'Lease'},
  ];
  const [activeTab, setActiveTab] = useState('Sell');
  const [getAllFvrts, {data: fvrtsData, isLoading}] = useLazyGetAllFvrtsQuery();
  console.log('activetab', activeTab);
  const filteredProperties = fvrtsData?.data
    .filter(fav => fav.propertyId.category === activeTab) // only properties of selected tab
    .map(fav => fav.propertyId);
  const getAllFvrtsHandler = async () => {
    getAllFvrts()
      .unwrap()
      .then(res => {
        console.log('ress', res);
      })
      .catch(error => {
        console.log('errr', error);
      });
  };
  useEffect(() => {
    getAllFvrtsHandler();
  }, []);
  return (
    <Wrapper
      isScroll
      containerStyle={{padding: 0.1, paddingBottom: responsiveHeight(2)}}>
      <Header
        title="My Favorites"
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
                onPress={() => setActiveTab(item.value)}
                style={{
                  padding: responsiveHeight(1),
                  backgroundColor:
                    activeTab === item.value ? '#E6F7F8' : Colors.white,
                  paddingHorizontal: responsiveHeight(2),
                  borderWidth: 1.5,
                  borderRadius: responsiveHeight(3),
                  borderColor:
                    activeTab === item.value
                      ? Colors.themeColor
                      : Colors.inactiveBorder,
                }}>
                <NormalText
                  title={item.title}
                  color={
                    activeTab === item.value
                      ? Colors.themeColor
                      : Colors.inactiveTxt
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* <Br space={2} /> */}
      <View style={{padding: responsiveHeight(2)}}>
        <View style={{}}>
          {isLoading ? (
            <View
              style={{height: responsiveHeight(35), justifyContent: 'center'}}>
              <ActivityIndicator size={40} color={Colors.black} />
            </View>
          ) : filteredProperties?.length ? (
            <FlatList
              numColumns={2}
              data={filteredProperties}
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
                    refresh={getAllFvrtsHandler}
                    data={item}
                    containerWidth={44}
                  />
                );
              }}
            />
          ) : (
            <View
              style={{height: responsiveHeight(15), justifyContent: 'center'}}>
              <NormalText
                fontSize={2.3}
                txtAlign="center"
                fontWeight="600"
                title="No properties available in this category."
              />
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default MyFavrts;
