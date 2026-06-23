import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {Color} from '../utils/Colors';
import {Colors} from '../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../responsive_dimensions';

const policyItems = [
  'StayPass has zero tolerance for objectionable content or abusive users.',
  'Users may not post harassment, hate, sexual content, threats, spam, scams, or violent content.',
  'Users can report objectionable posts and block abusive users from the community feed.',
  'Reported content may be reviewed and removed, and abusive users may be suspended or removed from StayPass.',
];

const UGCPolicyAgreement = ({accepted, onChange, compact = false}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: responsiveHeight(1.2),
        }}>
        <CheckBox
          checkBoxColor={Color('button')}
          checkedCheckBoxColor={Color('button')}
          onClick={() => onChange(!accepted)}
          isChecked={accepted}
        />
        <Text
          style={{
            flex: 1,
            color: compact ? Colors.greyText5 : '#3B4B68',
            fontSize: responsiveFontSize(1.75),
            lineHeight: responsiveHeight(2.7),
          }}>
          I agree to the{' '}
          <Text
            onPress={() => setVisible(true)}
            style={{
              color: Color('button'),
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
            StayPass Terms of Use
          </Text>
          , including the no-tolerance policy for objectionable content and
          abusive users.
        </Text>
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: responsiveHeight(2),
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}>
          <View
            style={{
              maxHeight: '82%',
              backgroundColor: Colors.white,
              borderRadius: responsiveHeight(1.5),
              padding: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: responsiveFontSize(2.4),
                fontWeight: '700',
                marginBottom: responsiveHeight(1.5),
              }}>
              StayPass Community Terms
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  color: Colors.darkGrey,
                  fontSize: responsiveFontSize(1.8),
                  lineHeight: responsiveHeight(2.9),
                  marginBottom: responsiveHeight(1.5),
                }}>
                Before registering or logging in, you must agree to keep
                StayPass safe for everyone.
              </Text>
              {policyItems.map(item => (
                <Text
                  key={item}
                  style={{
                    color: Colors.black,
                    fontSize: responsiveFontSize(1.8),
                    lineHeight: responsiveHeight(2.9),
                    marginBottom: responsiveHeight(1),
                  }}>
                  {'\u2022'} {item}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                onChange(true);
                setVisible(false);
              }}
              style={{
                marginTop: responsiveHeight(2),
                height: responsiveHeight(5.8),
                borderRadius: responsiveHeight(1),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Color('button'),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: responsiveFontSize(1.9),
                  fontWeight: '700',
                }}>
                Agree and Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                alignItems: 'center',
                paddingTop: responsiveHeight(1.4),
              }}>
              <Text
                style={{
                  color: Colors.greyText4,
                  fontSize: responsiveFontSize(1.7),
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UGCPolicyAgreement;
