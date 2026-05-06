/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import LottieView from 'lottie-react-native';
import { BoldText, NormalText } from './Titles';
import { Colors } from '../assets/colors';
interface ModalProps {
  modalVisible: boolean,
  setModalVisible: () => void,
  title: string,
  subTitle: string,
  payment?: boolean
}
const SuccessModal: React.FC<ModalProps> = ({ modalVisible, setModalVisible, payment = false, title, subTitle }) => {
  const animationSource = payment
    ? require('../assets/animations/paymentSuccess.json')
    : require('../assets/animations/successMessage.json');
  return (
    <Modal animationInTiming={400} animationOutTiming={400} onBackdropPress={() => setModalVisible(!modalVisible)} isVisible={modalVisible} style={{ margin: 0 }}>
      <View style={{ borderRadius: responsiveHeight(1.5), width: responsiveWidth(75), alignSelf: 'center', padding: responsiveHeight(2), paddingVertical: responsiveHeight(3), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <LottieView duration={2500} autoPlay style={{ width: responsiveHeight(25), height: responsiveWidth(25) }} source={animationSource}
          loop={false} />
        <BoldText alignSelf="center" mrgnTop={2} title={title} />
        <NormalText alignSelf="center" fontWeight="800" fontSize={2} mrgnTop={1.5} title={subTitle} color={Colors.themeColor} />
      </View>
    </Modal>
  );
};

export default SuccessModal;
