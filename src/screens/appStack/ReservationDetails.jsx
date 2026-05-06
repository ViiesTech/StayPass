/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import Input from '../../utils/TextInput';
import {BackHeader} from '../../components/Header';
import CustomButton from '../../components/Button';
// import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'react-native-check-box';
import {NormalText} from '../../components/Titles';
import {Pera} from '../../utils/Text';
import Br from '../../utils/Br';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../responsive_dimensions';
import {Colors} from '../../assets/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ShowToast} from '../../GlobalFunctions';
import moment from 'moment';
import {
  useCreateBookingMutation,
  useLazyGetRoomBookingsQuery,
} from '../../redux/services/MainIntegration';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const ReservationDetails = ({navigation, route}) => {
  const {
    _id: userId,
    name: userName,
    phone: userPhone,
    email,
  } = useSelector(state => state?.persistedData?.user);

  const {
    propertyId,
    ownerId,
    _id,
    roomNo,
    maxOccupancy,
    pricePerNight,
    serviceCharges,
    blockedDates = [],
  } = route?.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  console.log('_id', _id);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'
  const [activeField, setActiveField] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [getRoomBookings, {isLoading, data: roomBookings}] =
    useLazyGetRoomBookingsQuery();

  const [state, setState] = useState({
    name: userName,
    phoneNumber: userPhone,
    email: email,
    noOfOccupancy: '',
    noOfNights: 0,
    totalCost: 0,
  });

  // Calculate nights between check-in and check-out
  // const calculateNights = (checkIn, checkOut) => {
  //   if (!checkIn || !checkOut) return 0;
  //   const diffTime = checkOut.getTime() - checkIn.getTime();
  //   const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return nights > 0 ? nights : 0;
  // };

  useEffect(() => {
    getRoomBookings(_id)
      .unwrap()
      .then(res => {
        console.log('roomBookings', res);
        processBookedDates(res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  // Process booked dates and blocked dates
  const processBookedDates = bookingsData => {
    const disabledDatesSet = new Set();
    const marked = {};

    // Add blocked dates from room
    if (blockedDates && blockedDates.length > 0) {
      blockedDates.forEach(date => {
        const formattedDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        disabledDatesSet.add(formattedDate);
        marked[formattedDate] = {
          disabled: true,
          disableTouchEvent: true,
          color: '#FFB6C1',
          textColor: '#888',
        };
      });
    }

    // Add booked dates from bookings
    if (bookingsData && bookingsData.length > 0) {
      bookingsData.forEach(booking => {
        if (booking.BookingDates && booking.BookingDates.length > 0) {
          booking.BookingDates.forEach(date => {
            const formattedDate = moment(date, 'DD-MM-YYYY').format(
              'YYYY-MM-DD',
            );
            disabledDatesSet.add(formattedDate);
            marked[formattedDate] = {
              disabled: true,
              disableTouchEvent: true,
              color: '#FFB6C1',
              textColor: '#888',
            };
          });
        }
      });
    }

    setDisabledDates(Array.from(disabledDatesSet));
    setMarkedDates(marked);
  };
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;

    // Convert to midnight to ignore time differences
    const start = new Date(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate(),
    );
    const end = new Date(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate(),
    );

    const diffTime = end.getTime() - start.getTime();
    const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  };

  // Update nights and total cost
  const updateTotalCost = (newCheckIn, newCheckOut) => {
    if (!newCheckIn || !newCheckOut) {
      setState(prev => ({
        ...prev,
        noOfNights: 0,
        totalCost: 0,
      }));
      return;
    }

    const nights = calculateNights(newCheckIn, newCheckOut);

    // Total = (pricePerNight + serviceChargesPerNight) * number of nights
    const total = nights * (pricePerNight + serviceCharges);

    setState(prev => ({
      ...prev,
      noOfNights: nights,
      totalCost: total,
    }));
  };

  // Date picker handler
  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (!selectedDate) return;

    if (activeField === 'checkIn') {
      setCheckInDate(selectedDate);
      updateTotalCost(selectedDate, checkOutDate);
    } else if (activeField === 'checkOut') {
      setCheckOutDate(selectedDate);
      updateTotalCost(checkInDate, selectedDate);
    }
  };

  const onChangeText = (field, value) => {
    setState(prev => ({...prev, [field]: value}));
  };

  const handleBooking = async () => {
    console.log('_id', _id);
    const {name, phoneNumber, noOfOccupancy} = state;
    const formattedCheckIn = moment(checkInDate).format('DD-MM-YYYY');
    const formattedCheckOut = moment(checkOutDate).format('DD-MM-YYYY');
    console.log('formattedCheckIn', formattedCheckIn);
    if (!name) {
      return ShowToast('error', 'Full Name Is Required');
    }
    if (!phoneNumber) {
      return ShowToast('error', 'Phone Number Is Required');
    }
    if (!checkInDate) {
      return ShowToast('error', 'Check In Date Is Required');
    }
    if (!checkOutDate) {
      return ShowToast('error', 'Check Out Date Is Required');
    }
    if (!noOfOccupancy) {
      return ShowToast('error', 'Please Specify Number Of Occupancy');
    }
    if (!toggleCheckBox) {
      return ShowToast('error', 'You Must Agree Our Terms & Policy');
    }
    if (state?.noOfOccupancy > maxOccupancy) {
      return ShowToast('error', `Max ${maxOccupancy} people allowed.`);
    }
    navigation.navigate('PaymentDetails', {
      userId,
      propertyId,
      ownerId,
      roomId: _id,
      checkInDate: formattedCheckIn,
      checkOutDate: formattedCheckOut,
      noOfOccupancy,
      name,
      phone: phoneNumber,
      email,
      totalCost: state.totalCost,
    });

    // let apiData = {
    //   userId: userId,
    //   propertyId: propertyId,
    //   roomId: _id,
    //   name: name,
    //   email: email,
    //   phone: phoneNumber,
    //   checkInDate: formattedCheckIn,
    //   checkOutDate: formattedCheckOut,
    //   noOfOccupancy: noOfOccupancy,
    // };
    // createBooking(apiData)
    //   .unwrap()
    //   .then(res => {
    //     console.log('ress', res);
    //     ShowToast(res?.success ? 'success' : 'error', res?.message);
    //     if (res?.success) {
    //       navigation.navigate('BottomStack');
    //     }
    //   })
    //   .catch(err => {
    //     console.log('errr', err);
    //     ShowToast('error', err?.data?.error || 'Some problem occured');
    //   });
  };

  const getInitialPickerDate = () => {
    if (activeField === 'checkIn' && checkInDate) return checkInDate;
    if (activeField === 'checkOut' && checkOutDate) return checkOutDate;
    return new Date(); // fallback to today
  };

  const handleConfirm = selectedDate => {
    if (!selectedDate) {
      setDatePickerVisibility(false);
      return;
    }

    if (activeField === 'checkIn') {
      setCheckInDate(selectedDate);
      updateTotalCost(selectedDate, checkOutDate);
    } else if (activeField === 'checkOut') {
      setCheckOutDate(selectedDate);
      updateTotalCost(checkInDate, selectedDate);
    }

    setDatePickerVisibility(false);
  };

  // Handle calendar day press
  const handleDayPress = day => {
    const selectedDate = day.dateString;

    // Check if date is disabled
    if (disabledDates.includes(selectedDate)) {
      ShowToast('error', 'This date is already booked or blocked');
      return;
    }

    const jsDate = new Date(selectedDate);

    if (activeField === 'checkIn') {
      setCheckInDate(jsDate);
      // Update marked dates for check-in
      const newMarked = {...markedDates};
      newMarked[selectedDate] = {
        ...newMarked[selectedDate],
        selected: true,
        selectedColor: Colors.themeColor,
      };
      setMarkedDates(newMarked);
      updateTotalCost(jsDate, checkOutDate);
      setIsCalendarVisible(false);
    } else if (activeField === 'checkOut') {
      // Validate check-out is after check-in
      if (checkInDate && jsDate <= checkInDate) {
        ShowToast('error', 'Check-out date must be after check-in date');
        return;
      }

      // Validate no disabled dates in between
      if (checkInDate) {
        const hasBlockedDates = checkDateRangeForBlockedDates(
          checkInDate,
          jsDate,
        );
        if (hasBlockedDates) {
          ShowToast(
            'error',
            'Your selected dates contain already booked or blocked dates',
          );
          return;
        }
      }

      setCheckOutDate(jsDate);
      const newMarked = {...markedDates};
      newMarked[selectedDate] = {
        ...newMarked[selectedDate],
        selected: true,
        selectedColor: Colors.theme3,
      };
      setMarkedDates(newMarked);
      updateTotalCost(checkInDate, jsDate);
      setIsCalendarVisible(false);
    }
  };

  // Check if there are any blocked dates between check-in and check-out
  const checkDateRangeForBlockedDates = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const current = start.clone();

    while (current.isSameOrBefore(end)) {
      const dateStr = current.format('YYYY-MM-DD');
      if (disabledDates.includes(dateStr)) {
        return true;
      }
      current.add(1, 'day');
    }
    return false;
  };
  return (
    <Wrapper isScroll>
      <BackHeader title="Reservation Details" />
      <Br space={2} />
      <View
        style={{marginTop: responsiveHeight(2), gap: responsiveHeight(2.5)}}>
        {/* User Details */}
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Name"
          value={state.name}
          onChangeText={val => onChangeText('name', val)}
          placeholder="David Jason"
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
          labelTitle="Phone Number"
          value={state.phoneNumber?.toString()}
          keyboardType="numeric"
          onChangeText={val => onChangeText('phoneNumber', val)}
          placeholder="Enter Phone Number"
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
          value={state.email}
          onChangeText={val => onChangeText('email', val)}
          keyboardType="email-address"
          placeholder="Enter Email Address"
          placeholderTextColor="#44535e"
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />

        {/* Check-In Date */}
        <View style={{gap: responsiveHeight(1)}}>
          <NormalText
            fontSize={1.8}
            fontWeight="600"
            color={Colors.black}
            title="Check-In Date"
          />
          <TouchableOpacity
            onPress={() => {
              setActiveField('checkIn');
              setIsCalendarVisible(true);
            }}
            style={{
              backgroundColor: Colors.inputBg,
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              borderColor: '#C7D5E1',
              height: heightPercentageToDP('5.8%'),
              width: '100%',
              paddingHorizontal: responsiveHeight(1.5),
              justifyContent: 'center',
            }}>
            <NormalText
              fontFamily="Inter_18pt-Medium"
              fontSize={1.6}
              title={
                checkInDate ? checkInDate.toDateString() : 'Select Check-In'
              }
              color="#44535E"
            />
          </TouchableOpacity>
        </View>

        {/* Check-Out Date */}
        <View style={{gap: responsiveHeight(1)}}>
          <NormalText
            fontSize={1.8}
            fontWeight="600"
            color={Colors.black}
            title="Check-Out Date"
          />
          <TouchableOpacity
            onPress={() => {
              setActiveField('checkOut');
              setIsCalendarVisible(true);
            }}
            style={{
              backgroundColor: Colors.inputBg,
              borderWidth: 1.5,
              borderRadius: responsiveHeight(1.5),
              borderColor: '#C7D5E1',
              height: heightPercentageToDP('5.8%'),
              width: '100%',
              paddingHorizontal: responsiveHeight(1.5),
              justifyContent: 'center',
            }}>
            <NormalText
              fontFamily="Inter_18pt-Medium"
              fontSize={1.6}
              title={
                checkOutDate ? checkOutDate.toDateString() : 'Select Check-Out'
              }
              color="#44535E"
            />
          </TouchableOpacity>
        </View>
        {/* Total Cost (Read-Only) */}
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Total Cost"
          value={`KES ${state.totalCost.toFixed(2)}`}
          placeholder="KES 0.00"
          disabled
          editable={false} // user cannot edit
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />
        {/* Occupancy */}
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Number Of Occupancy"
          value={state.noOfOccupancy}
          onChangeText={val => onChangeText('noOfOccupancy', val)}
          keyboardType="numeric"
          placeholder="Enter No Of Occupancy"
          placeholderTextColor="#44535e"
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />
        {/* Number of Nights (Read-Only) */}
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          disabled
          labelTitle="Number Of Nights"
          value={state.noOfNights.toString()}
          placeholder="0"
          editable={false} // user cannot edit
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />

        {/* Room Serial Number */}
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Room Serial Number"
          placeholder={roomNo || 'A1B2C3D'}
          editable={false}
          disabled
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />

        {/* Terms & Conditions */}
        <View style={styles.checkBoxConfiner}>
          <View style={styles.rememberContainer}>
            <CheckBox
              checkBoxColor={Colors.black}
              checkedCheckBoxColor={Colors.black}
              isChecked={toggleCheckBox}
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
            />
            <Pera
              style={{fontSize: responsiveFontSize(1.9), fontWeight: '700'}}
              color={Colors.black}>
              I accept the terms and conditions
            </Pera>
          </View>
        </View>

        {/* Complete Booking */}
        <CustomButton
          onPress={handleBooking}
          style={{
            backgroundColor: Colors.theme3,
            width: responsiveWidth(90),
            alignSelf: 'center',
          }}
          children={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Colors.white} />
            ) : (
              'Complete Booking'
            )
          }
        />
      </View>

      {/* Calendar Modal */}
      {isCalendarVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: responsiveHeight(2),
              padding: responsiveHeight(2),
              width: responsiveWidth(90),
            }}>
            <NormalText
              fontSize={2}
              fontWeight="700"
              color={Colors.black}
              title={
                activeField === 'checkIn'
                  ? 'Select Check-In Date'
                  : 'Select Check-Out Date'
              }
              style={{marginBottom: responsiveHeight(2)}}
            />
            <Calendar
              current={moment().format('YYYY-MM-DD')}
              minDate={moment().format('YYYY-MM-DD')}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              theme={{
                todayTextColor: Colors.themeColor,
                arrowColor: Colors.themeColor,
                selectedDayBackgroundColor: Colors.themeColor,
                selectedDayTextColor: Colors.white,
                disabledArrowColor: '#d9e1e8',
              }}
            />
            <CustomButton
              onPress={() => setIsCalendarVisible(false)}
              style={{
                backgroundColor: Colors.greyText5,
                marginTop: responsiveHeight(2),
              }}
              children="Cancel"
            />
          </View>
        </View>
      )}
    </Wrapper>
  );
};

export default ReservationDetails;

const styles = StyleSheet.create({
  checkBoxConfiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveHeight(2),
  },
});
