/* eslint-disable react-native/no-inline-styles */
import {Alert, View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight} from '../../responsive_dimensions';
import {Header} from '../../components/Header';
import Br from '../../utils/Br';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import {useLazyGetWalletByUserIdQuery} from '../../redux/services/MainIntegration';
import {ShowToast} from '../../GlobalFunctions';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logout, goToLogin} from '../../redux/slices';

const MyWallet = () => {
  const navigation = useNavigation();
  const {isGuest} = useSelector(state => state?.persistedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isGuest) {
      Alert.alert(
        'Login Required',
        'Please log in to access your wallet.',
        [
          {text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack()},
          {text: 'Login', onPress: () => dispatch(goToLogin())},
        ],
      );
    }
  }, [isGuest]);
  const [getWalletByUserId, {data, isLoading}] =
    useLazyGetWalletByUserIdQuery();
  useEffect(() => {
    getWalletByUserId()
      .unwrap()
      .then(res => {
        if (!res.success) {
          ShowToast('error', res.message);
        }
        console.log('walletdata', res);
      })
      .catch(err => {
        ShowToast('error', err?.data?.message || 'Some problem occured');
      });
  }, []);
  return (
    <Wrapper isScroll containerStyle={{paddingBottom: responsiveHeight(2)}}>
      <Header title="My Wallet" />
      <Br space={5} />
      <View
        style={{
          backgroundColor: Colors.theme3,
          alignItems: 'center',
          padding: responsiveHeight(3),
          height: responsiveHeight(18),
          borderRadius: responsiveHeight(2.5),
          gap: responsiveHeight(1.5),
        }}>
        <NormalText
          fontWeight="600"
          fontSize={2}
          title="Available Credits"
          color={Colors.white}
        />
        {isLoading ? (
          <View style={{marginTop: responsiveHeight(1)}}>
            <ActivityIndicator size="large" color={Colors.white} />
          </View>
        ) : (
          <BoldText
            fontSize={4}
            title={`R ${data?.data?.balance || '0.00'}`}
            color={Colors.white}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default MyWallet;
