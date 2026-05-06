/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import Br from '../../utils/Br';
import {Colors} from '../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../responsive_dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import {BoldText, NormalText} from '../../components/Titles';
import CustomButton from '../../components/Button';
import {Pera} from '../../utils/Text';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import {useAddPaymentMethodMutation} from '../../redux/services/MainIntegration';
import {useSelector} from 'react-redux';
// import {CardField, useStripe} from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';

const AddCard = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [addPaymentMethod, {isLoading}] = useAddPaymentMethodMutation();
  const {stripeCustomerId} = useSelector(state => state?.persistedData?.user);
  // const {createPaymentMethod} = useStripe();

  const handleAddCard = async () => {
    // AfricaPay card saving/tokenization not implemented here.
    // Show a friendly message and guide user to payment flow instead.
    Toast.show({
      type: 'info',
      text1: 'Not implemented',
      text2: 'Use the payment flow to add/save cards via Paystack',
    });
  };

  // const handleAddCard = async () => {
  //   if (!cardDetails?.complete) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Invalid Card',
  //       text2: 'Please enter complete card details',
  //     });
  //     return;
  //   }

  //   if (!stripeCustomerId) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: 'Customer ID not found. Please try again.',
  //     });
  //     return;
  //   }

  //   setIsProcessing(true);

  //   try {
  //     // Create payment method with Stripe
  //     const {paymentMethod, error} = await createPaymentMethod({
  //       paymentMethodType: 'Card',
  //     });

  //     if (error) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Card Error',
  //         text2: error.message || 'Failed to process card',
  //       });
  //       setIsProcessing(false);
  //       return;
  //     }

  //     if (!paymentMethod) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: 'Failed to create payment method',
  //       });
  //       setIsProcessing(false);
  //       return;
  //     }

  //     // Call backend API to save payment method
  //     const response = await addPaymentMethod({
  //       customerId: stripeCustomerId,
  //       paymentMethodId: paymentMethod.id,
  //     }).unwrap();

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Success',
  //       text2: 'Card added successfully',
  //     });

  //     // Navigate back after success
  //     setTimeout(() => {
  //       navigation.goBack();
  //     }, 1000);
  //   } catch (error) {
  //     console.log('Error adding card:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: error?.data?.message || 'Failed to add card. Please try again.',
  //     });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <Wrapper isScroll>
      <BackHeader isPlainHeader={false} title="Payment method" />
      <Br space={4} />
      <View
        style={{
          backgroundColor: Colors.white,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 8,
          borderRadius: responsiveHeight(2),
          padding: responsiveHeight(2),
        }}>
        <View style={{flexDirection: 'row', gap: responsiveHeight(2)}}>
          <Entypo name="plus" color={Colors.black} size={25} />
          <View>
            <BoldText fontWeight="700" title="Add card" fontSize={2.2} />
            <NormalText
              title="Add your credit / debit card"
              fontSize={2}
              color="#9E9E9E"
            />
          </View>
        </View>

        <View
          style={{gap: responsiveHeight(3), marginTop: responsiveHeight(3)}}>
          {/* Stripe Card Input */}
          {/* <View
            style={{
              backgroundColor: '#F0F0F0',
              borderRadius: responsiveHeight(1.5),
              padding: responsiveHeight(1.5),
            }}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#F0F0F0',
                textColor: '#000000',
                placeholderColor: '#9E9E9E',
              }}
              style={{
                width: '100%',
                height: responsiveHeight(6),
              }}
              onCardChange={cardDetails => {
                setCardDetails(cardDetails);
              }}
            />
          </View> */}

          <View style={styles.checkBoxConfiner}>
            <View style={styles.rememberContainer}>
              <CheckBox
                checkBoxColor={Colors.theme3}
                checkedCheckBoxColor={Colors.theme3}
                onClick={() => {
                  setToggleCheckBox(!toggleCheckBox);
                }}
                isChecked={toggleCheckBox}
              />
              <Pera style={{fontSize: responsiveFontSize(1.8)}} color="#9DA5B3">
                Save Card Detail Information
              </Pera>
            </View>
          </View>
          <CustomButton
            onPress={handleAddCard}
            disabled={isLoading || isProcessing}
            children={
              isLoading || isProcessing ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                'Add Card'
              )
            }
            style={{backgroundColor: Colors.theme3}}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default AddCard;
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#F0F0F0',
    borderRadius: responsiveHeight(1.5),
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
});
