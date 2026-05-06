/* eslint-disable react-native/no-inline-styles */
import { View, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Platform, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { icons } from '../assets/icons';
import SvgIcons from './SvgIcons';
import { images } from '../assets/images';
import { BoldText, NormalText } from './Titles';
import { Colors } from '../assets/colors';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices';
import { IMAGE_URL } from '../redux/constant';
import { useDeleteAccountMutation } from '../redux/services';
import { ShowToast } from '../GlobalFunctions';

interface HeaderProps {
  onPress?: () => void;
  title?: string;
  style?: object;
}
interface BackHeaderProps {
  title: string,
  isPlainHeader?: boolean,
  style?: object,
}
export const Header: React.FC<HeaderProps> = ({ onPress, title, style }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { name, email, image, _id } = useSelector((state) => state?.persistedData?.user);
  const { token } = useSelector((state) => state?.persistedData);
  console.log('token', token)
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();

  const handleNavigation = (screen) => {
    setModalVisible(!modalVisible);
    navigation.navigate(screen);
  };
  const data = [
    { id: 1, title: 'Home', navigateTo: 'BottomStack' },
    { id: 2, title: 'My Profile', navigateTo: 'MyProfile' },
    { id: 3, title: 'Favorites', navigateTo: 'MyFavrts' },
    { id: 4, title: 'Wallet', navigateTo: 'MyWallet' },
    { id: 5, title: 'My bookings', navigateTo: 'MyBookings' },
    { id: 6, title: 'My Cards', navigateTo: 'MyCards' },
    { id: 7, title: 'My Posts', navigateTo: 'MyPost' },
    { id: 8, title: 'Privacy Policy', navigateTo: 'PrivacyPolicy' },
    { id: 9, title: 'Terms & Conditions', navigateTo: 'TermsConditions' },
    { id: 10, title: 'Contact Us', navigateTo: 'ContactForm' },
    { id: 11, title: 'Delete Account', navigateTo: '' },
  ];

  const DeleteAccountHandler = async () => {
    setDeleteModalVisible(false);
    let apiData = {
      userId: _id,
    };
    await deleteAccount(apiData)
      .unwrap()
      .then(res => {
        console.log('response of forgot password ===>', res);
        if (res?.success) {
          setModalVisible(false);
        }
        ShowToast(res?.success ? 'success' : 'error', res.message);
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('error', error?.data?.message || 'Some problem occured');
      });
  };
  return (
    <View>
      <View style={[{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(3) }, style]}>
        {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ width: responsiveWidth(14) }}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: Colors.themeColor, borderRadius: responsiveHeight(1), height: responsiveHeight(5.5), width: responsiveWidth(12.5), justifyContent: 'center', alignItems: 'center' }}>
            <SvgIcons xml={icons.menu} height={24} width={24} />
          </TouchableOpacity>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            backgroundColor: Colors.themeColor,
            borderRadius: responsiveHeight(1),
            height: responsiveHeight(5.5),
            width: responsiveWidth(12.5),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SvgIcons xml={icons.menu} height={24} width={24} />
        </TouchableOpacity>
        {title ? (
          <View style={{ position: 'absolute', alignSelf: 'center', width: responsiveWidth(100) }}>
            <NormalText title={title} alignSelf="center" fontSize={2.3} fontWeight="600" />
          </View>
        ) : (
          <Image
            source={images.logo}
            style={{
              height: responsiveHeight(8),
              width: responsiveWidth(25),
            }}
            resizeMode="contain"
          />
        )}
      </View>
      <Modal onBackdropPress={() => setModalVisible(false)} animationInTiming={400} animationOutTiming={400} animationIn={'slideInLeft'} animationOut={'slideOutLeft'} style={{ margin: 0, flex: 1, backgroundColor: Colors.white, width: responsiveWidth(80) }} isVisible={modalVisible}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === 'android' ? responsiveHeight(0.1) : responsiveHeight(5) }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end', margin: responsiveHeight(2.5), width: responsiveWidth(7) }}>
            <SvgIcons xml={icons.cross} height={20} width={20} />
          </TouchableOpacity>
          <View style={{ paddingLeft: responsiveHeight(4), paddingVertical: responsiveHeight(2) }}>
            <View style={{ width: responsiveWidth(30) }}>
              <View style={{ padding: responsiveHeight(0.3), borderWidth: 2, borderColor: Colors.borderColor5, borderRadius: responsiveHeight(10) }}>
                <Image source={image ? { uri: `${IMAGE_URL}${image}` } : images.userDummy} style={{ height: responsiveHeight(13.2), width: responsiveWidth(27.5), resizeMode: 'cover', borderRadius: responsiveHeight(10) }} />
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(2) }}>
              <BoldText title={name} fontWeight="700" fontSize={2.4} color={Colors.black} />
              <NormalText fontWeight="500" title={email} fontSize={2} color={Colors.black} />
              <View style={{ marginTop: responsiveHeight(2) }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={styles.listContainer} onPress={() => { item.id === 11 ? setDeleteModalVisible(true) : handleNavigation(item.navigateTo); }}>
                      <NormalText fontWeight="600" title={item.title} fontSize={2} color={Colors.black} />
                    </TouchableOpacity>
                  );
                }} />
              </View>
            </View>

          </View>
          <View style={{ flex: Platform.OS === 'android' ? 0.8 : 0.6, justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => dispatch(logout())} style={{ borderTopRightRadius: responsiveHeight(4), borderBottomRightRadius: responsiveHeight(4), backgroundColor: Colors.themeColor, width: responsiveWidth(50), paddingVertical: responsiveHeight(1.8) }}>
              <NormalText fontWeight="700" color={Colors.white} alignSelf="center" title="Logout" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      <Modal
        animationInTiming={600}
        animationOutTiming={600}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setDeleteModalVisible(false)}
        isVisible={deleteModalVisible}>
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
          <BoldText width={70} txtAlign="center" title="Are you sure you want to delete account?" />
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              gap: responsiveHeight(2),
              paddingHorizontal: responsiveHeight(2),
            }}>
            <CustomButton
              txtColor={Colors.black}
              style={{
                borderWidth: 1.5,
                borderColor: Colors.black,
                backgroundColor: Colors.white,
                borderRadius: responsiveHeight(1.5),
                width: '100%',
              }}
              onPress={DeleteAccountHandler}
              children={isLoading ? (<ActivityIndicator size={'large'} color={Colors.black} />) : 'Confirm'}
            />
            <CustomButton
              onPress={() => {
                setDeleteModalVisible(false);
              }}
              style={{
                backgroundColor: Colors.theme4,

                borderRadius: responsiveHeight(1.5),
                width: '100%',
              }}
              children="Cancel"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export const BackHeader: React.FC<BackHeaderProps> = ({ style, title = 'Properties For Sale', isPlainHeader = true }) => {
  const navigation = useNavigation();

  return (
    <View style={[{ flexDirection: 'row', gap: responsiveHeight(2) }, style]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={isPlainHeader ? null : styles.backContainer}>
        <Ionicons name="chevron-back-sharp" size={25} color={isPlainHeader ? Colors.black2 : Colors.white} />
      </TouchableOpacity>
      <NormalText alignSelf="center" fontWeight="800" fontSize={2.2} color={Colors.black2} title={title} />
    </View>
  );
};
export const BackHeader2 = ({ }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backContainer, { backgroundColor: '#545557' }]}>
        <Ionicons name="chevron-back-sharp" size={25} color={Colors.white} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(2) }}>
        <TouchableOpacity style={[styles.backContainer, { backgroundColor: '#545557' }]}>
          <Ionicons name="bookmark-outline" size={25} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backContainer, { backgroundColor: '#545557' }]}>
          <Ionicons name="bookmark-outline" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: responsiveHeight(1),
    // backgroundColor:'red',
  },
  backContainer: {
    backgroundColor: '#666666',
    padding: responsiveHeight(0.8),
    borderWidth: 2,
    borderColor: '#494949',
    borderRadius: responsiveHeight(3),
  },
});
