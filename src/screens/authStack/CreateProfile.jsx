/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../../utils/Wrapper';
import AuthHeader from '../../utils/AuthHeader';
import {Pera} from '../../utils/Text';
import {Color} from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Br from '../../utils/Br';
import CustomButton from '../../components/Button';
import CheckBox from 'react-native-check-box';
import Background from '../../utils/Background';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../responsive_dimensions';
import Input2 from '../../components/Input2';
import {Colors} from '../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NormalText} from '../../components/Titles';
import {icons} from '../../assets/icons';
import Input from '../../utils/TextInput';
import {images} from '../../assets/images';
import {pickImage, ShowToast} from '../../GlobalFunctions';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useUpdateProfileMutation} from '../../redux/services';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import moment from 'moment';

const CreateProfile = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {email, name, image, phone, DOB, _id} = useSelector(
    state => state?.persistedData?.user,
  );
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const [form, setForm] = useState({
    name: name,
    email: email,
    number: phone,
    dob: DOB,
    imagePath: '',
  });
  const {imagePath} = form;
  console.log('imagePath', imagePath);
  console.log('form', form);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeText = (state, value) => {
    setForm(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };
  const handlePickImage = () => {
    pickImage(path => {
      onChangeText('imagePath', path);
    });
  };
  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeText('dob', selectedDate);
    }
  };
  const handleConfirm = selectedDate => {
    setShowPicker(false);
    onChangeText('dob', selectedDate);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };
  const formatDate = type => {
    if (!form.dob) return type;
    const d = new Date(form.dob);
    if (type === 'date') return d.getDate();
    if (type === 'month') return d.toLocaleString('default', {month: 'short'});
    if (type === 'year') return d.getFullYear();
  };

  const onUpdatePress = async () => {
    const {name: userName, number, dob: userDob} = form;
    const formattedDob = moment(userDob).format('DD-MM-YYYY');
    console.log('formatet', formattedDob);
    if (!userName) {
      return ShowToast('error', 'Please Enter Your Name');
    }
    if (!number) {
      return ShowToast('error', 'Please Enter Your Phone Number');
    }
    if (!userDob) {
      return ShowToast('error', 'Please Select Your Date-OF-Birth');
    }
    if (!toggleCheckBox) {
      return ShowToast('error', 'You Must Agree Terms & Policy To Proceed!');
    }
    try {
      const formData = new FormData();
      formData.append('id', _id);
      formData.append('name', form?.name);
      formData.append('phone', form?.number);
      formData.append('DOB', formattedDob);
      if (imagePath) {
        formData.append('image', {
          uri: imagePath?.uri,
          name: imagePath?.fileName || 'userImage.jpg',
          type: imagePath?.type || 'image/jpeg',
        });
      }
      formData.append('latitude', 40.758);
      formData.append('longitude', 73.9855);
      formData.append('locationName', 'Times Square, NYC');
      // ✅ Now call the API
      const res = await updateProfile(formData).unwrap();
      console.log('response of update ===>', res);
      ShowToast('success', res.message);
    } catch (error) {
      console.log('error while update ===>', error);
      ShowToast('error', error?.data?.message);
    }
  };
  return (
    <>
      <Background
        innerContainerStyle={{flex: 1}}
        containerStyle={{paddingTop: responsiveHeight(2)}}>
        <Wrapper x={0.1} style={{flex: 1}}>
          <AuthHeader
            isBackButton={true}
            containerFlex={0.88}
            mrgnTop={5}
            heading={'Create Profile'}
            subHeading={'Please enter your personal details'}
          />
          <Br space={4} />
          <View style={{alignSelf: 'center'}}>
            <Image
              source={
                imagePath
                  ? {uri: imagePath?.uri}
                  : image
                  ? `${IMAGE_URL}${image}`
                  : images.userDummy
              }
              resizeMode="cover"
              style={{
                borderRadius: !imagePath?.uri
                  ? responsiveHeight(10)
                  : responsiveHeight(1),
                height: !imagePath?.uri
                  ? responsiveHeight(15.2)
                  : responsiveHeight(19),
                width: !imagePath?.uri
                  ? responsiveWidth(30.5)
                  : responsiveWidth(40),
              }}
            />
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                borderWidth: 2,
                borderColor: Colors.greyText3,
                position: 'absolute',
                backgroundColor: Colors.white,
                padding: responsiveHeight(1),
                borderRadius: responsiveHeight(3),
                bottom: responsiveHeight(-1),
                right: responsiveHeight(imagePath ? -2.5 : -1),
              }}>
              <Ionicons
                name="camera-outline"
                color={Colors.platinum}
                size={27}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: responsiveHeight(2),
              marginTop: responsiveHeight(3),
              gap: responsiveHeight(2),
            }}>
            <Input
              onChangeText={val => onChangeText('name', val)}
              labelTitle="Name"
              placeholder={'Enter Your Name'}
            />
            <Input
              disabled
              value={form.email}
              labelTitle="Email"
              keyboardType="email-address"
              placeholder={'Enter Your Email'}
            />
            <Input
              onChangeText={val => onChangeText('number', val)}
              labelTitle="Phone"
              keyboardType="numeric"
              placeholder={'Enter Your Phone Number'}
            />
            <View>
              <NormalText
                mrgnLeft={2.5}
                fontSize={1.8}
                color={Colors.greyText3}
                title="Date of birth"
              />
              <View style={loginStyle.container}>
                <TouchableOpacity
                  style={loginStyle.box}
                  onPress={() => setShowPicker(true)}>
                  <Text style={loginStyle.text}>{formatDate('date')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={loginStyle.box}
                  onPress={() => setShowPicker(true)}>
                  <Text style={loginStyle.text}>{formatDate('month')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={loginStyle.box}
                  onPress={() => setShowPicker(true)}>
                  <Text style={loginStyle.text}>{formatDate('year')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showPicker}
                  mode="date"
                  maximumDate={new Date()}
                  date={form?.dob || new Date()}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              </View>
            </View>

            <Br space={1} />
            <View style={loginStyle.checkBoxConfiner}>
              <View style={loginStyle.rememberContainer}>
                <CheckBox
                  checkBoxColor={Color('button')}
                  checkedCheckBoxColor={Color('button')}
                  onClick={() => {
                    setToggleCheckBox(!toggleCheckBox);
                  }}
                  isChecked={toggleCheckBox}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    flex: 1,
                    color: Colors.platinum,
                  }}>
                  By continuing you accept our{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    Privacy Policy
                  </Text>{' '}
                  and{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    Term of Use
                  </Text>
                </Text>
              </View>
            </View>
            <CustomButton
              onPress={onUpdatePress}
              style={{marginTop: responsiveHeight(2)}}
              children={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={Colors.white} />
                ) : (
                  'Continue'
                )
              }
            />
          </View>
        </Wrapper>
      </Background>
    </>
  );
};

const loginStyle = StyleSheet.create({
  inputLabel: {
    paddingBottom: hp('1%'),
  },
  inputContainer: {
    paddingBottom: hp('3%'),
  },
  checkBoxConfiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  bottomConfiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: responsiveHeight(1),
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor6,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
export default CreateProfile;
