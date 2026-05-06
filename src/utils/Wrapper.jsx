import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from './Colors';

const Wrapper = ({ children, style, x }) => {
  const width = x ? (x * 3) : (1 * 3);
  return (
    <View style={{paddingHorizontal: wp(`${width}%`), ...style}}>
      {children}
    </View>
  );
};

export default Wrapper;
