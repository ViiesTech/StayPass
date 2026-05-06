/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import SvgIcons from './SvgIcons';
import { BoldText, NormalText } from './Titles';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { Colors } from '../assets/colors';

interface ModalProps {
  modalVisible: boolean,
  setModalVisible: () => void,
  icon?: any,
  txt1: string,
  isNormalTxt2?: boolean,
  txt2: string,
}
const ResponseModal: React.FC<ModalProps> = ({ modalVisible, setModalVisible, icon, isNormalTxt2 = false, txt1, txt2 }) => {
  return (
    <Modal animationInTiming={600} animationOutTiming={600} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={setModalVisible} isVisible={modalVisible}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white, paddingVertical: responsiveHeight(3), width: responsiveWidth(90), borderRadius: responsiveHeight(1) }}>
        <SvgIcons xml={icon} height={responsiveHeight(10)} width={responsiveWidth(15)} />
        <BoldText txtAlign="center" title={txt1} />
        {isNormalTxt2 ? (
          <NormalText fontSize={1.6} color="#646464" txtAlign="center" title={txt2} />
        ) : (
          <BoldText txtAlign="center" title={txt2} />
        )}
      </View>
    </Modal>
  );
};

export default ResponseModal;
