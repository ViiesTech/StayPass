/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import Br from '../../utils/Br';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Input from '../../utils/TextInput';
import {Colors} from '../../assets/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {NormalText} from '../../components/Titles';
// import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/Button';
import {pickImage, ShowToast} from '../../GlobalFunctions';
import Feather from 'react-native-vector-icons/Feather';
import {images} from '../../assets/images';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import {useUpdateProfileMutation} from '../../redux/services';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EditProfile = ({navigation}) => {
  // const [showPicker, setShowPicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const {email, name, image, phone, city, DOB, _id} = useSelector(
    state => state?.persistedData?.user,
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [imgPath, setImgPath] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = date => {
    onChangeText('dob', date); // update form
    hideDatePicker();
  };
  console.log('imgPath', imgPath);
  const [form, setForm] = useState({
    name: name,
    email: email,
    number: phone,
    city: city,
    dob: DOB,
    imagePath: '',
  });
  const {imagePath} = form;
  console.log('form', form);
  const formattedDob = moment(form.dob, 'DD-MM-YYYY').format('DD-MM-YYYY');
  const today = new Date();
  const maxDate = new Date(); // user can't select future date
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 100); // 100 years back
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  console.log(' form.number', form.number);
  console.log('formattedDob', formattedDob);
  // formattedDob 13-01-1934
  const handlePickImage = () => {
    pickImage(path => {
      // onChangeText('imagePath', path);
      setImgPath(path);
      // setImgPath(image.uri);
    });
  };
  const onChangeText = (state, value) => {
    setForm(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };
  // const onChange = (event, selectedDate) => {
  //   setShowPicker(false);
  //   if (selectedDate) {
  //     onChangeText('dob', selectedDate);
  //   }
  // };
  console.log('imgpath', imagePath);

  const onUpdatePress = async () => {
    try {
      const formData = new FormData();

      formData.append('id', _id);
      if (imgPath) {
        formData.append('image', {
          uri: imgPath?.uri,
          name: imgPath?.fileName,
          type: imgPath?.type,
        });
      }
      if (form?.name) {
        formData.append('name', form?.name);
      }
      if (form?.number) {
        formData.append('phone', form?.number);
      }
      if (form?.city) {
        formData.append('city', form?.city);
      }
      if (formattedDob) {
        formData.append('DOB', formattedDob);
      }

      formData.append('latitude', 40.758);
      formData.append('longitude', 73.9855);
      formData.append('locationName', 'Times Square, NYC');
      console.log('formData._parts:', formData._parts);
      // ✅ Now call the API
      const res = await updateProfile(formData, {forceRefetch: true}).unwrap();
      console.log('response of update ===>aa', res);
      if (res?.success) {
        navigation?.goBack();
      }
      ShowToast(res?.success ? 'success' : 'error', res.message);
    } catch (error) {
      console.log('error while update ===>', error);
      ShowToast('error', error?.data?.message);
    }
  };
  return (
    <Wrapper isScroll>
      <BackHeader title="Edit Profile" />
      <Br space={2} />
      <View
        style={{
          marginTop: responsiveHeight(2),
          gap: responsiveHeight(2.5),
        }}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={
              imgPath
                ? {uri: imgPath?.uri}
                : image
                ? {uri: `${IMAGE_URL}${image}`}
                : images.userDummy
            }
            style={{
              height: responsiveHeight(15.2),
              width: responsiveWidth(Platform.OS === 'android' ? 30.5 : 32),
              resizeMode: 'cover',
              borderRadius: responsiveHeight(10),
            }}
          />
          <TouchableOpacity
            onPress={handlePickImage}
            style={{
              borderWidth: 2,
              borderColor: Colors.greyText3,
              position: 'absolute',
              backgroundColor: Colors.themeColor,
              padding: responsiveHeight(1),
              borderRadius: responsiveHeight(3),
              bottom: responsiveHeight(0),
              right: responsiveHeight(-1),
            }}>
            <Feather name="edit" color={Colors.black} size={20} />
          </TouchableOpacity>
        </View>
        <Input
          onChangeText={val => onChangeText('name', val)}
          labelFontWeight="600"
          value={form.name}
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Name"
          placeholder={'Enter Your Name'}
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
          value={form.email}
          disabled
          labelColor={Colors.black}
          labelMrgn={false}
          keyboardType="email-address"
          labelTitle="Email"
          placeholder="Enter Your Email"
          placeholderTextColor="#44535e"
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />

        <View style={{gap: responsiveHeight(1)}}>
          <NormalText
            fontSize={1.8}
            fontWeight="600"
            color={Colors.black}
            title={'Date of Birth'}
          />
          <TouchableOpacity
            // onPress={() => {
            //   setShowPicker(true);
            // }}
            onPress={showDatePicker}
            placeholderTextColor={Colors.platinum}
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
              title={formattedDob ? formattedDob : 'Pick Date'}
              color="#44535E"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={
              form.dob
                ? moment(form.dob, 'DD-MM-YYYY').toDate() // parse string from userdata
                : new Date()
            }
            // date={form.dob ? new Date(form.dob) : new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={maxDate}
            minimumDate={minDate}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        </View>
        <Input
          labelFontWeight="600"
          labelColor={Colors.black}
          labelMrgn={false}
          labelTitle="Phone"
          value={String(form.number)}
          onChangeText={val => onChangeText('number', val)}
          keyboardType="numeric"
          placeholder={'Enter Your Phone Number'}
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
          value={form.city}
          onChangeText={val => onChangeText('city', val)}
          labelTitle="City / State"
          placeholder="Enter Your City/State"
          placeholderTextColor="#44535e"
          styling={{
            backgroundColor: '#EAF0F5',
            borderColor: '#C7D5E1',
            borderWidth: 1.5,
            borderRadius: responsiveHeight(1.5),
            height: responsiveHeight(5.8),
          }}
        />
        <Br space={0.5} />
        <CustomButton
          style={{
            backgroundColor: Colors.theme4,
            width: '100%',
            alignSelf: 'center',
          }}
          onPress={onUpdatePress}
          children={
            isLoading ? (
              <ActivityIndicator size={'large'} color={Colors.white} />
            ) : (
              'Save'
            )
          }
        />
      </View>
    </Wrapper>
  );
};

export default EditProfile;
