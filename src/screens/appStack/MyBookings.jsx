/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import Br from '../../utils/Br';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import {responsiveHeight} from '../../responsive_dimensions';
import {useSelector} from 'react-redux';
import {useLazyGetUserBookingsQuery} from '../../redux/services/MainIntegration';
import moment from 'moment';

const MyBookings = ({navigation}) => {
  const {_id} = useSelector(state => state?.persistedData?.user);
  console.log(_id);
  const [getUserBookings, {isLoading, data: bookingData}] =
    useLazyGetUserBookingsQuery();
  const myBookingData = bookingData?.data || [];
  console.log('_id===', _id);
  const getBookingRange = BookingDates => {
    if (!BookingDates || BookingDates.length === 0) return '';

    const startDate = moment(BookingDates[0], 'DD-MM-YYYY');
    const endDate = moment(BookingDates[BookingDates.length - 1], 'DD-MM-YYYY');

    if (startDate.isSame(endDate, 'month')) {
      return `${startDate.format('D')} to ${endDate.format("D MMM 'YY")}`;
    } else {
      return `${startDate.format('D MMM')} to ${endDate.format("D MMM 'YY")}`;
    }
  };
  useEffect(() => {
    getUserBookings(_id)
      .unwrap()
      // .then(res => {
      //   if(!res?.success)
      // })
      .catch(err => {
        ShowToast(
          'error',
          error?.response?.data?.message || 'Some problem occured',
        );
      });
  }, []);
  const data = [
    {
      id: 1,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 2,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 3,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 4,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 5,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 6,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 7,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 8,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 9,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 10,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 11,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 12,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 13,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
    {
      id: 14,
      date: '13/06/2024',
      amount: 'R 123,000',
      forProperty: '(Villa Resort Morocco)',
      forDates: '16 to 18 June’24',
      days: '2',
    },
  ];
  return (
    <Wrapper
      isScroll
      containerStyle={{padding: 0.1, paddingBottom: responsiveHeight(2)}}>
      <BackHeader
        title="My Bookings"
        style={{paddingHorizontal: responsiveHeight(2)}}
      />
      <Br space={2} />

      <View
        style={{
          margin: responsiveHeight(2),

          // Shadow / Elevation (OUTER)
          backgroundColor: 'transparent',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 6,
        }}>
        <View
          style={{
            // Border radius + clipping (INNER)
            backgroundColor: Colors.white,
            borderRadius: responsiveHeight(1),
            overflow: 'hidden',
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
                }}>
                <BoldText
                  color={Colors.white}
                  fontWeight="700"
                  style={{flex: 1, textAlign: 'center'}}
                  fontSize={1.7}
                  title="Date"
                />
                <BoldText
                  color={Colors.white}
                  fontWeight="700"
                  style={{flex: 1, textAlign: 'center'}}
                  fontSize={1.7}
                  title="Amount"
                />
                <BoldText
                  color={Colors.white}
                  fontWeight="700"
                  style={{flex: 1.5, textAlign: 'center'}}
                  fontSize={1.7}
                  title="For Property"
                />
                <BoldText
                  color={Colors.white}
                  fontWeight="700"
                  style={{flex: 0.9, textAlign: 'center'}}
                  fontSize={1.7}
                  title="For Dates"
                />
                <BoldText
                  color={Colors.white}
                  fontWeight="700"
                  style={{flex: 0.7, textAlign: 'center'}}
                  fontSize={1.7}
                  title="Days"
                />
              </View>
            )}
            ListEmptyComponent={() =>
              !isLoading ? (
                <View
                  style={{
                    paddingVertical: responsiveHeight(4),
                    alignItems: 'center',
                  }}>
                  <NormalText
                    fontSize={2.5}
                    fontWeight="500"
                    title="No bookings found"
                    color={Colors.inactiveTxt}
                  />
                </View>
              ) : null
            }
            ListFooterComponent={() =>
              isLoading ? (
                <View
                  style={{
                    paddingVertical: responsiveHeight(4),
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color={Colors.theme4} />
                  <NormalText title="Loading bookings..." mrgnTop={1} />
                </View>
              ) : null
            }
            data={myBookingData}
            keyExtractor={item => item._id.toString()}
            renderItem={({item, index}) => {
              const forDates = getBookingRange(item.BookingDates);

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('BookingDetails', {item})}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: responsiveHeight(1),
                    alignItems: 'center',
                    backgroundColor:
                      (index + 1) % 2 === 0 ? Colors.white2 : Colors.white,
                    paddingVertical: responsiveHeight(1.2),
                  }}>
                  <NormalText
                    color="#44535E"
                    style={{flex: 1, textAlign: 'center'}}
                    fontSize={1.4}
                    title={moment(item.createdAt).format('DD/MM/YYYY')}
                  />
                  <NormalText
                    color="#44535E"
                    style={{flex: 1, textAlign: 'center'}}
                    fontSize={1.4}
                    title={`KES ${item.totalCost}`}
                  />
                  <NormalText
                    color="#44535E"
                    style={{flex: 1.5, textAlign: 'center'}}
                    fontSize={1.4}
                    title={item.propertyId?.propertyName}
                  />
                  <NormalText
                    color="#44535E"
                    style={{flex: 0.8, textAlign: 'center'}}
                    fontSize={1.4}
                    title={forDates}
                  />
                  <NormalText
                    color="#44535E"
                    style={{flex: 0.7, textAlign: 'center'}}
                    fontSize={1.4}
                    title={item.noOfNights.toString()}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default MyBookings;
