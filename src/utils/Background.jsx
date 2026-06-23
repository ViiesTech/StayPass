/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import KeyboardView from './KeyboardView';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveHeight} from '../responsive_dimensions';
import {Colors} from '../assets/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

const Background = ({
  children,
  noScroll,
  detectScrollEnd,
  onScrollEnd,
  flex,
  containerStyle,
  innerContainerStyle,
}) => {
  // useEffect(() => {
  //     if (Auth) {hasToken();}
  // }, []);

  // const hasToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (!token) {
  //         navigation.reset({
  //             index: 0,
  //             routes: [{ name: 'Splash' }],
  //         });
  //     }
  // };

  const scrollEnd = () => {
    if (detectScrollEnd) {
      onScrollEnd();
    }
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.safeAreaView, containerStyle]}>
      <KeyboardView>
        {noScroll ? (
          children
        ) : flex ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={scrollEnd}
            data={[children]}
            renderItem={({item}) => item}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <View style={innerContainerStyle}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: responsiveHeight(2),
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onScrollEndDrag={e => {
                const {contentOffset, contentSize, layoutMeasurement} =
                  e.nativeEvent;
                const end =
                  contentOffset.y + layoutMeasurement.height >=
                  contentSize.height - 20;
                if (end) {
                  scrollEnd();
                }
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}>
                <View>{children}</View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        )}
      </KeyboardView>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? responsiveHeight(2) : 0,
    paddingBottom: 0.1,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    height: height,
  },
  content: {
    zIndex: 1,
    flex: 1,
    paddingTop: responsiveHeight(3),
    backgroundColor: Colors.white,
  },
});
