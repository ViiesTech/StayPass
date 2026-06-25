/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {BackHeader} from '../../components/Header';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Wrapper from '../../components/Wrapper';
import {Colors} from '../../assets/colors';
import Br from '../../utils/Br';
import {BoldText, NormalText} from '../../components/Titles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/Button';
import Input from '../../utils/TextInput';
// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';

const Filter = ({navigation}) => {
  const data = [
    {id: 1, title: 'Sale'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Vacation Rental'},
    {id: 4, title: 'Lease'},
  ];
  const propertyTypeData = [
    {id: 1, title: 'Apartment'},
    {id: 2, title: 'House'},
    {id: 3, title: 'Villa'},
    {id: 4, title: 'Condo'},
  ];

  const [activeTab, setActiveTab] = useState('Sale');
  const [activePropertyType, setActivePropertyType] = useState('Apartment');
  const [selectedBedRooms, setSelectedBedRooms] = useState(1);
  const refRBSheet = useRef();
  const [selectedCity, setSelectedCity] = useState('Thika');
  console.log('activeTab', activeTab);
  const [cities, setCities] = useState([
    {id: 1, cityName: 'Thika'},
    {id: 2, cityName: 'Nairobi'},
    {id: 3, cityName: 'Mombasa'},
    {id: 4, cityName: 'Kisumu'},
    {id: 5, cityName: 'Nakuru'},
    {id: 6, cityName: 'Eldoret'},
    {id: 7, cityName: 'Malindi'},
    {id: 8, cityName: 'Naivasha'},
    {id: 9, cityName: 'Nyeri'},
    {id: 10, cityName: 'Machakos'},
    {id: 11, cityName: 'Kakamega'},
    {id: 12, cityName: 'Meru'},
    {id: 13, cityName: 'Nanyuki'},
    {id: 14, cityName: 'New York'},
    {id: 15, cityName: 'Los Angeles'},
    {id: 16, cityName: 'Chicago'},
    {id: 17, cityName: 'Houston'},
    {id: 18, cityName: 'Miami'},
  ]);

  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'
  const [activeField, setActiveField] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const data2 = [
    {id: 1, title: 'City', subTitle: selectedCity},
  ];
  // onPress={() =>
  //                   navigation.navigate('PropertiesForSale', {type: item?.id})
  //                 }
  // const onChange = (event, selectedDate) => {
  //   setShowPicker(false);

  //   if (selectedDate) {
  //     const formattedDate = moment(selectedDate).format('DD-MM-YYYY');

  //     if (activeField === 'checkIn') {
  //       setCheckInDate(formattedDate);
  //     } else if (activeField === 'checkOut') {
  //       setCheckOutDate(formattedDate);
  //     }
  //   }
  // };

  return (
    <Wrapper
      isScroll
      containerStyle={{
        padding: responsiveHeight(0.1),
        paddingBottom: responsiveHeight(2),
      }}>
      <BackHeader
        title="Filters"
        style={{paddingHorizontal: responsiveHeight(2)}}
      />
      <Br space={3} />
      <View style={styles.horizontalLine} />
      <Br space={2} />
      <BoldText title="I want to" fontSize={2} fontWeight="700" mrgnLeft={2} />
      <Br space={2} />
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
      <Br space={2.5} />
      <View style={styles.horizontalLine} />
      <View>
        <FlatList
          data={data2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  item.id === 1 ? refRBSheet?.current?.open() : null
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: responsiveHeight(2),
                    height: responsiveHeight(10),
                  }}>
                  <View style={{gap: responsiveHeight(0.2)}}>
                    <BoldText
                      title={item.title}
                      fontSize={2}
                      fontWeight="600"
                    />
                    {item.subTitle && (
                      <NormalText
                        title={item.subTitle}
                        color={Colors.greyBg3}
                        fontSize={2}
                        fontWeight="600"
                      />
                    )}
                  </View>
                  {item?.id !== 1 && (
                    <TouchableOpacity>
                      <Ionicons
                        name="chevron-forward"
                        size={25}
                        color={Colors.black2}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Br space={2.5} />
      <BoldText
        title="Property Type"
        fontSize={2}
        fontWeight="700"
        mrgnLeft={2}
      />
      <Br space={2} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={propertyTypeData}
          contentContainerStyle={{
            gap: responsiveHeight(1.5),
            paddingHorizontal: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setActivePropertyType(item.title)}
                style={{
                  padding: responsiveHeight(1),
                  backgroundColor:
                    activePropertyType === item.title
                      ? '#E6F7F8'
                      : Colors.white,
                  paddingHorizontal: responsiveHeight(2),
                  borderWidth: 1.5,
                  borderRadius: responsiveHeight(3),
                  borderColor:
                    activePropertyType === item.title
                      ? Colors.themeColor
                      : Colors.inactiveBorder,
                }}>
                <NormalText
                  title={item.title}
                  color={
                    activePropertyType === item.title
                      ? Colors.themeColor
                      : Colors.inactiveTxt
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={[styles.horizontalLine, {marginVertical: responsiveHeight(2.5)}]}
      />
      <BoldText title="Bedrooms" fontSize={2} fontWeight="700" mrgnLeft={2} />
      <View>
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5, 6]}
          contentContainerStyle={{
            gap: responsiveHeight(2),
            padding: responsiveHeight(2),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedBedRooms(item)}
                style={{
                  width: responsiveWidth(11),
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveHeight(3),
                  backgroundColor:
                    selectedBedRooms === item ? '#E6F7F8' : '#EEEEEE',
                  borderColor: Colors.themeColor,
                  borderWidth: selectedBedRooms === item ? 1.5 : null,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NormalText
                  title={item}
                  color={
                    selectedBedRooms === item ? Colors.themeColor : Colors.black
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={[styles.horizontalLine, {marginTop: responsiveHeight(1.5)}]}
      />
      <View style={{padding: responsiveHeight(2)}}>
        <BoldText
          title="Price Range"
          mrgnTop={1}
          fontSize={2}
          fontWeight="700"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: responsiveHeight(2),
          }}>
          <View>
            <Input
              onChangeText={val => setMinPrice(val)}
              keyboardType="numeric"
              styling={{
                borderColor: '#DDDDDD',
                borderWidth: 1.5,
                width: responsiveWidth(38),
                borderRadius: responsiveHeight(1.5),
                height: responsiveHeight(5.5),
              }}
            />
          </View>
          <BoldText title="To" fontSize={2.4} />
          <Input
            onChangeText={val => setMaxPrice(val)}
            keyboardType="numeric"
            styling={{
              borderColor: '#DDDDDD',
              borderWidth: 1.5,
              width: responsiveWidth(38),
              borderRadius: responsiveHeight(1.5),
              height: responsiveHeight(5.5),
            }}
          />
        </View>
      </View>
      {/* {activeTab === 'Vacation Rental' && (
        <View
          style={[styles.horizontalLine, {marginTop: responsiveHeight(1.5)}]}
        />
      )} */}
      {/* {activeTab === 'Vacation Rental' && (
        <View style={{padding: responsiveHeight(2)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: responsiveHeight(1),
            }}>
            <View style={{gap: responsiveHeight(1), width: '46%'}}>
              <BoldText
                title="Check-In Date"
                mrgnTop={1}
                fontSize={2}
                fontWeight="700"
              />
              <TouchableOpacity
                onPress={() => {
                  setActiveField('checkIn');
                  setShowPicker(true);
                }}
                style={styles.dateContainer}>
                <NormalText title={checkInDate ? checkInDate : 'Select Date'} />
              </TouchableOpacity>
            </View>
            <View style={{gap: responsiveHeight(1), width: '46%'}}>
              <BoldText
                title="Check-Out Date"
                mrgnTop={1}
                fontSize={2}
                fontWeight="700"
              />
              <TouchableOpacity
                onPress={() => {
                  setActiveField('checkOut');
                  setShowPicker(true);
                }}
                style={styles.dateContainer}>
                <NormalText
                  title={checkOutDate ? checkOutDate : 'Select Date'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )} */}
      <View style={{padding: responsiveHeight(2)}}>
        <CustomButton
          // onPress={() => {
          //   activeTab === 1 || activeTab === 2
          //     ? navigation.navigate('PropertyDetails', {type: 'Sale'})
          //     : navigation.navigate('PropertyDetails', {type: 'Vacational'});
          // }}
          onPress={() =>
            navigation.navigate('PropertiesForSale', {
              type: activeTab,
              propertyType: activePropertyType,
              selectedBedRooms,
              minPrice,
              maxPrice,
              // checkInDate,
              // checkOutDate,
              selectedCity,
              isFiltered: true,
            })
          }
          children="Submit"
          style={{backgroundColor: Colors.theme3}}
        />
      </View>
      <RBSheet
        draggable
        ref={refRBSheet}
        height={400}
        openDuration={500}
        closeDuration={500}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          },
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Select City
        </Text>

        <FlatList
          data={cities}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCity(item.cityName);
                refRBSheet.current.close();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 0.5,
                borderColor: '#ccc',
              }}>
              {/* Radio Button */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#1E90FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                {selectedCity === item.cityName && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#1E90FF',
                    }}
                  />
                )}
              </View>

              <Text style={{fontSize: 16, color: Colors.black}}>
                {item.cityName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </RBSheet>
    </Wrapper>
  );
};

export default Filter;
const styles = StyleSheet.create({
  horizontalLine: {
    borderWidth: 1,
    borderColor: Colors.inactiveBorder,
  },
  dateContainer: {
    borderColor: '#DDDDDD',
    padding: responsiveHeight(1.5),
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: responsiveHeight(1.5),
    height: responsiveHeight(5.5),
  },
});
