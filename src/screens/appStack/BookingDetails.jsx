/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {BackHeader} from '../../components/Header';
import Br from '../../utils/Br';
import {Colors} from '../../assets/colors';
import {BoldText, NormalText} from '../../components/Titles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookingDetailsList from '../../components/BookingDetailsList';
import CustomButton from '../../components/Button';
import ResponseModal from '../../components/ResponseModal';
import Modal from 'react-native-modal';
import {icons} from '../../assets/icons';
import moment from 'moment';
import {useCancelBookingMutation} from '../../redux/services/MainIntegration';
import {ShowToast} from '../../GlobalFunctions';
const BookingDetails = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState();
  const [termsModal, setTermsModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    checkInDate,
    checkOutDate,
    noOfOccupancy,
    noOfNights,
    roomId,
    _id,
    propertyId,
  } = route?.params?.item;
  const [cancelBooking, {isLoading}] = useCancelBookingMutation();
  const [activeType, setActiveType] = useState(roomId?.roomType);
  console.log('bookingid', _id);
  const data = [
    {id: 1, title: 'Single Room', value: 'Single'},
    {id: 2, title: 'Double Room', value: 'Double'},
    {id: 3, title: 'Family Suite', value: 'Family Suite'},
    {id: 4, title: 'Deluxe Room', value: 'Deluxe'},
    {id: 5, title: 'King Size Room', value: 'King Size'},
  ];

  const CancelBookingHandler = async () => {
    let apiData = {
      bookingId: _id,
    };
    cancelBooking(apiData)
      .unwrap()
      .then(res => {
        if (res?.success) {
          ShowToast('success', 'Booking Canceled Successfully');
          setTermsModal(false);
          setModalVisible(true);
          navigation.navigate('BottomStack');
        } else {
          ShowToast('error', res?.message);
        }
      })
      .catch(err => {
        ShowToast(
          'error',
          error?.response?.data?.message || 'Some problem occured',
        );
      });
  };
  return (
    <Wrapper isScroll containerStyle={{}}>
      <BackHeader title="Booking Details" />
      <Br space={4} />
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 6,
          borderRadius: responsiveHeight(1.5),
        }}>
        <View
          style={{
            backgroundColor: Colors.theme4,
            padding: responsiveHeight(2),
            borderRadius: responsiveHeight(1.5),
          }}>
          <NormalText
            fontSize={2}
            fontWeight="600"
            color={Colors.white}
            title="Booking Details"
          />
        </View>
        <View
          style={{
            padding: responsiveHeight(2),
            borderRadius: responsiveHeight(2),
            backgroundColor: '#F9FCFF',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <BookingDetailsList
              width={48}
              Icon={FontAwesome}
              iconName="calendar"
              heading="Check-In Date"
              // title="10 April 2025"
              title={moment(checkInDate, 'DD-MM-YYYY').format('DD MMM YYYY')}
            />
            <BookingDetailsList
              style={{flex: 1}}
              Icon={FontAwesome}
              iconName="calendar"
              heading="Check-Out Date"
              title={moment(checkOutDate, 'DD-MM-YYYY').format('DD MMM YYYY')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: responsiveHeight(2),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <BookingDetailsList
              width={48}
              Icon={Ionicons}
              iconName="extension-puzzle"
              heading="No. Of Occupancy"
              title={noOfOccupancy}
            />
            <BookingDetailsList
              style={{flex: 1}}
              Icon={FontAwesome6}
              iconName="cloud-sun"
              heading="No. Of Nights"
              title={noOfNights}
            />
          </View>
          <BookingDetailsList
            style={{flex: 1, marginTop: responsiveHeight(2)}}
            Icon={FontAwesome}
            iconName="asterisk"
            heading="Room Serial Number"
            title={roomId?.roomNo}
          />
          <Br space={2} />
          <View style={{borderWidth: 1, borderColor: '#C7C7C7'}} />
          <BoldText
            mrgnTop={2}
            fontSize={2.3}
            fontWeight="700"
            title="Room Type"
          />
          <View style={{marginTop: responsiveHeight(1.5)}}>
            <FlatList
              data={data}
              numColumns={2} // 👈 number of items per row (adjust as needed)
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    padding: responsiveHeight(2.2),
                    paddingVertical: responsiveHeight(0.8),
                    borderWidth: 1.7,
                    borderRadius: responsiveHeight(3),
                    backgroundColor:
                      item.value === activeType ? '#DAF8FF' : Colors.white,
                    borderColor:
                      item.value === activeType ? Colors.theme4 : '#656565',
                    margin: 5,
                    // flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  // onPress={() => setActiveTab(item.id)}
                >
                  <NormalText
                    fontSize={2}
                    fontWeight="700"
                    color={
                      item.value === activeType ? Colors.theme4 : '#646464'
                    }
                    title={item.title}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <CustomButton
          onPress={() => setTermsModal(true)}
          children="Cancel Booking"
          style={{backgroundColor: Colors.theme3}}
        />
      </View>
      <Modal
        animationInTiming={600}
        animationOutTiming={600}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setTermsModal(false)}
        isVisible={termsModal}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            paddingVertical: responsiveHeight(3),
            width: responsiveWidth(90),
            borderRadius: responsiveHeight(1),
            gap: responsiveHeight(2.5),
          }}>
          <BoldText txtAlign="center" title="Terms & Conditions" />
          <NormalText
            width={75}
            fontSize={1.6}
            color="#646464"
            txtAlign="center"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: responsiveHeight(2),
            }}>
            <CustomButton
              style={{
                backgroundColor: Colors.theme4,
                borderRadius: responsiveHeight(1.5),
                width: responsiveWidth(35),
              }}
              onPress={() => setTermsModal(false)}
              children="Keep Booking"
            />
            <CustomButton
              onPress={CancelBookingHandler}
              style={{
                backgroundColor: Colors.white,
                borderRadius: responsiveHeight(1.5),
                width: responsiveWidth(35),
                borderWidth: 1.5,
                borderColor: Colors.theme4,
              }}
              txtColor={Colors.theme4}
              children={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={Colors.theme4} />
                ) : (
                  'Confirm Cancel'
                )
              }
            />
          </View>
        </View>
      </Modal>
      <ResponseModal
        setModalVisible={() => setModalVisible(false)}
        modalVisible={modalVisible}
        icon={icons.canceled}
        txt1="Booking Canceled"
        isNormalTxt2={true}
        txt2="Your booking has been successfully canceled."
      />
    </Wrapper>
  );
};

export default BookingDetails;
