/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { responsiveHeight } from '../responsive_dimensions';
import { Colors } from '../assets/colors';

interface WrapperProps {
  isScroll?: boolean;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const Wrapper: React.FC<WrapperProps> = ({
  isScroll = false,
  children,
  containerStyle,
}) => {
  const Content = isScroll ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(4) : 0}    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false} contentContainerStyle={[{
            flexGrow: 1,
            padding: responsiveHeight(2),
            paddingTop: responsiveHeight(3),
            backgroundColor: Colors.white,
            paddingBottom: responsiveHeight(2),
          }, containerStyle]}>
          {children}
        </ScrollView >
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : (
    <View style={[{
      padding: responsiveHeight(2),
      backgroundColor: Colors.white,
      flex: 1,
    }, containerStyle]}>{children}</View>
  );

  return (
    Content
  );
};

export default Wrapper;
