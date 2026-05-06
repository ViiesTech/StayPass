/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Wrapper from '../../components/Wrapper';
import Br from '../../utils/Br';
import {BackHeader} from '../../components/Header';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {Colors} from '../../assets/colors';
import {BoldText, NormalText} from '../../components/Titles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/Button';
import Modal from 'react-native-modal';
import ResponseModal from '../../components/ResponseModal';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {ShowToast} from '../../GlobalFunctions';
import {
  useCreateBookingMutation,
  useLazyVerifyPaystackQuery,
  usePayWithWalletMutation,
  useLazyGetWalletByUserIdQuery,
  useInitializePaystackMutation,
} from '../../redux/services/MainIntegration';
import {icons} from '../../assets/icons';

const PaymentDetails = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(1);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState('wallet');
  const [walletBalance, setWalletBalance] = useState(0);

  const [paystackAuthUrl, setPaystackAuthUrl] = useState(null);
  const [paystackReference, setPaystackReference] = useState(null);
  const [paystackVisible, setPaystackVisible] = useState(false);
  const [webviewLoading, setWebviewLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedReference, setVerifiedReference] = useState(null);
  const verifyingRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [isProcessingPaystack, setIsProcessingPaystack] = useState(false);
  const [isProcessingWallet, setIsProcessingWallet] = useState(false);
  const [paystackTimeoutReached, setPaystackTimeoutReached] = useState(false);

  const {_id} = useSelector(state => state?.persistedData?.user);
  const {
    propertyId,
    roomId,
    checkInDate,
    checkOutDate,
    noOfOccupancy,
    name,
    phone,
    email,
    ownerId,
    totalCost,
  } = route.params;

  const [initializePaystack] = useInitializePaystackMutation();
  const [verifyPaystack] = useLazyVerifyPaystackQuery();
  const [payWithWallet] = usePayWithWalletMutation();
  const [getWalletByUserId] = useLazyGetWalletByUserIdQuery();
  const [createBooking] = useCreateBookingMutation();

  // Fetch wallet balance
  useEffect(() => {
    getWalletByUserId()
      .unwrap()
      .then(res => {
        if (res?.data?.balance) setWalletBalance(res.data.balance);
      })
      .catch(err => {
        ShowToast('error', err?.data?.message || 'Wallet fetch failed');
      });
  }, []);

  // Handle wallet payment
  const payWithWalletHandler = () => {
    if (walletBalance < totalCost) {
      ShowToast('error', 'Insufficient wallet balance');
      return;
    }
    setIsProcessingWallet(true);
    payWithWallet({userId: _id, ownerId, bookingAmount: totalCost})
      .unwrap()
      .then(res => {
        ShowToast(res?.success ? 'success' : 'error', res?.message);
        if (res?.success) {
          handleBooking({
            paymentMethod: 'wallet',
            paymentReference: res?.data?.reference || null,
            paymentData: res?.data || null,
          });
        } else {
          setIsProcessingWallet(false);
        }
      })
      .catch(() => {
        ShowToast('error', 'Wallet payment failed');
        setIsProcessingWallet(false);
      });
  };

  // Booking creation
  const handleBooking = async (paymentInfo = null) => {
    const apiData = {
      userId: _id,
      propertyId,
      roomId,
      name,
      email,
      phone,
      checkInDate,
      checkOutDate,
      noOfOccupancy,
      payment: paymentInfo
        ? {
            method: paymentInfo.paymentMethod || null,
            reference: paymentInfo.paymentReference || null,
            raw: paymentInfo.paymentData || null,
          }
        : null,
    };
    createBooking(apiData)
      .unwrap()
      .then(res => {
        // ShowToast(res?.success ? 'success' : 'error', res?.message);
        if (res?.success) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            setIsProcessingWallet(false);
            setIsProcessingPaystack(false);
            navigation.navigate('BottomStack');
          }, 2000);
        } else {
          setIsProcessingWallet(false);
          setIsProcessingPaystack(false);
        }
      })
      .catch(() => {
        ShowToast('error', 'Booking failed');
        setIsProcessingWallet(false);
        setIsProcessingPaystack(false);
      });
  };

  // Proceed button handler
  const handleProceed = async () => {
    if (selectedPaymentMethodId === 'wallet') {
      payWithWalletHandler();
      return;
    }
    if (selectedPaymentMethodId === 'paystack') {
      setIsProcessingPaystack(true);
      try {
        const res = await initializePaystack({
          amount: totalCost,
          email,
          metadata: {propertyId, roomId},
          callback_url: 'https://staypass.app/payment/callback',
        }).unwrap();
        const payload = res?.data?.data || res?.data || {};
        const authUrl = payload.authorization_url || null;
        const reference =
          payload.reference || payload.ref || payload.reference_code || null;
        console.log('authUrl', authUrl);

        setPaystackReference(reference);
        if (authUrl) setPaystackAuthUrl(authUrl);
        setPaystackVisible(true);
      } catch {
        ShowToast('error', 'Failed to initialize Paystack');
      } finally {
        setIsProcessingPaystack(false);
      }
    }
  };

  // Paystack display items
  const walletItem = {
    id: 1,
    title: 'My Wallet',
    subTitle: walletBalance ? `Available: KES ${walletBalance}` : 'No funds',
    iconName: 'wallet-outline',
    icon: Ionicons,
    paymentMethodId: 'wallet',
  };

  const paystackItem = {
    id: 'paystack',
    title: 'Pay with Paystack',
    subTitle: 'Pay in KES',
    iconName: 'credit-card',
    icon: Fontisto,
    paymentMethodId: 'paystack',
  };

  const displayData = [walletItem, paystackItem];
  console.log('display data ', displayData);

  // WebView timeout
  // useEffect(() => {
  //   let t;
  //   if (paystackVisible) {
  //     setPaystackTimeoutReached(false);
  //     t = setTimeout(() => {
  //       setPaystackTimeoutReached(true);
  //       ShowToast('error', 'Payment is taking too long.');
  //     }, 30000);
  //   }
  //   return () => t && clearTimeout(t);
  // }, [paystackVisible]);

  return (
    <Wrapper isScroll={false}>
      <BackHeader isPlainHeader={false} title="Payment Details" />
      <Br space={2} />

      <View style={{flex: 1}}>
        <FlatList
          data={displayData}
          contentContainerStyle={{
            gap: responsiveHeight(2),
            paddingBottom: responsiveHeight(2),
          }}
          renderItem={({item}) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCard(item.id);
                  setSelectedPaymentMethodId(item.paymentMethodId || null);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: responsiveHeight(2),
                  borderWidth: 1.5,
                  borderColor: Colors.borderColor7,
                  backgroundColor: Colors.bgColor,
                  borderRadius: responsiveHeight(2),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveHeight(2),
                  }}>
                  <Icon name={item.iconName} color={Colors.theme3} size={30} />
                  <View>
                    <BoldText
                      fontWeight="600"
                      fontSize={2}
                      title={item.title}
                    />
                    <BoldText
                      fontWeight="600"
                      fontSize={2}
                      title={item.subTitle}
                      color={Colors.themeColor}
                    />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.selectBg,
                    height: responsiveHeight(3.6),
                    width: responsiveWidth(7.3),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: responsiveHeight(3),
                  }}>
                  {item.id === selectedCard && (
                    <View
                      style={{
                        backgroundColor: Colors.theme3,
                        height: responsiveHeight(2),
                        width: responsiveWidth(4),
                        borderRadius: responsiveHeight(3),
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{paddingVertical: responsiveHeight(2)}}>
          <CustomButton
            onPress={handleProceed}
            disabled={isProcessingPaystack || isProcessingWallet}
            children={
              isProcessingPaystack || isProcessingWallet ? (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <ActivityIndicator color={Colors.white} />
                  <BoldText
                    title={isProcessingWallet ? 'Processing...' : 'Loading...'}
                    color={Colors.white}
                    fontSize={1.8}
                  />
                </View>
              ) : (
                `Proceed (KES ${totalCost})`
              )
            }
            style={{backgroundColor: Colors.theme3}}
          />
        </View>
      </View>

      <ResponseModal
        setModalVisible={() => setModalVisible(false)}
        modalVisible={modalVisible}
        icon={icons.successful}
        // icon={require('../../assets/icons/successful.png')}
        txt1="Congratulations"
        txt2="Booking Successful"
      />

      <Modal
        isVisible={paystackVisible}
        onBackdropPress={() => setPaystackVisible(false)}
        style={{margin: 0}}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.bgColor,
            paddingTop:
              Platform.OS === 'ios' ? responsiveHeight(3) : responsiveHeight(1),
          }}>
          <TouchableOpacity
            disabled={isVerifying}
            onPress={async () => {
              // Verify payment when user closes WebView
              if (paystackReference && !isVerifying && !verifiedReference) {
                setIsVerifying(true);
                try {
                  const verifyRes = await verifyPaystack(
                    paystackReference,
                  ).unwrap();
                  console.log('paystack url', paystackReference);
                  console.log('verifyRes verifyRes', verifyRes);
                  if (
                    verifyRes?.data?.status === 'success' ||
                    verifyRes?.status === 'success'
                  ) {
                    setVerifiedReference(paystackReference);
                    setPaystackVisible(false);
                    handleBooking({
                      paymentMethod: 'paystack',
                      paymentReference: paystackReference,
                      paymentData: verifyRes,
                    });
                  } else {
                    ShowToast('info', 'Payment not completed');
                    setPaystackVisible(false);
                  }
                } catch (err) {
                  ShowToast('info', 'Please complete payment or try again');
                  setPaystackVisible(false);
                } finally {
                  setIsVerifying(false);
                }
              } else {
                setPaystackVisible(false);
              }
            }}
            style={{
              position: 'absolute',
              top: responsiveHeight(7),
              right: responsiveWidth(6),
              zIndex: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: responsiveHeight(0.8),
              borderRadius: responsiveHeight(1),
              opacity: isVerifying ? 0.5 : 1,
            }}>
            {isVerifying ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Ionicons name="close" size={22} color={Colors.white} />
            )}
          </TouchableOpacity>

          {isVerifying && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 10,
              }}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: responsiveHeight(2),
                  padding: responsiveHeight(3),
                  alignItems: 'center',
                  minWidth: responsiveWidth(60),
                }}>
                <ActivityIndicator size="large" color={Colors.theme3} />
                <Br space={2} />
                <BoldText
                  fontWeight="600"
                  fontSize={2.2}
                  title="Verifying Payment..."
                  color={Colors.theme3}
                />
                <Br space={1} />
                <NormalText
                  fontSize={1.8}
                  title="Please wait"
                  color={Colors.themeColor}
                />
              </View>
            </View>
          )}

          {paystackTimeoutReached ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: responsiveHeight(4),
              }}>
              <CustomButton
                onPress={() => {
                  setPaystackVisible(false);
                  setTimeout(() => setPaystackVisible(true), 300);
                  setPaystackTimeoutReached(false);
                }}
                children="Retry"
                style={{backgroundColor: Colors.theme3, width: '80%'}}
              />
            </View>
          ) : (
            <WebView
              style={{flex: 1}}
              source={{uri: paystackAuthUrl}}
              startInLoadingState
              javaScriptEnabled={true}
              domStorageEnabled={true}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={false}
              originWhitelist={['*']}
              // userAgent={
              //   'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
              // }
              onLoadStart={() => setWebviewLoading(true)}
              onLoadEnd={() => setWebviewLoading(false)}
              onNavigationStateChange={async navState => {
                const url = navState?.url || '';
                let foundRef = null;

                try {
                  const match =
                    url.match(/reference=([^&]+)/) ||
                    url.match(/trxref=([^&]+)/);
                  foundRef = match ? match[1] : null;
                } catch {}

                if (
                  foundRef &&
                  verifiedReference !== foundRef &&
                  !isVerifying
                ) {
                  verifyingRef.current = foundRef;
                  setIsVerifying(true);
                  setWebviewLoading(true);
                  try {
                    const verifyRes = await verifyPaystack(foundRef).unwrap();
                    if (
                      verifyRes?.data?.status === 'success' ||
                      verifyRes?.status === 'success'
                    ) {
                      setVerifiedReference(foundRef);
                      setPaystackVisible(false);
                      handleBooking({
                        paymentMethod: 'paystack',
                        paymentReference: foundRef,
                        paymentData: verifyRes,
                      });
                    } else {
                      ShowToast('error', 'Payment verification failed');
                    }
                  } catch {
                    ShowToast('error', 'Verification failed');
                  } finally {
                    setIsVerifying(false);
                    verifyingRef.current = null;
                    setWebviewLoading(false);
                  }
                }
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </Wrapper>
  );
};

export default PaymentDetails;
