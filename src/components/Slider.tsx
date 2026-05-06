import { View, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BackHeader2 } from './Header';
import { responsiveHeight } from '../responsive_dimensions';
import { Colors } from '../assets/colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import { IMAGE_URL } from '../redux/constant';


interface SliderProps {
  sliderData: Array;
}
const Slider: React.FC<SliderProps> = ({ sliderData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderItem = ({ item }) => {
    console.log('item=====', item);
    return (
      <ImageBackground
        source={{ uri: `${IMAGE_URL}${item}` }}
        style={styles.imageBackground}
        resizeMode="cover">
        <BackHeader2 />

        {/* ✅ Dots INSIDE the image */}
        <View style={styles.paginationContainer}>
          {sliderData.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      </ImageBackground>
    );
  };
  return (
    <View>
      <AppIntroSlider
        data={sliderData}
        dotStyle={{}}
        renderItem={renderItem}
        showNextButton={false}
        showDoneButton={false}
        showPrevButton={false}
        renderPagination={() => null}
        onSlideChange={index => setActiveIndex(index)}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  imageBackground: {
    height: responsiveHeight(35),
    padding: responsiveHeight(2),
    justifyContent: 'flex-start',
  },
  paginationContainer: {
    position: 'absolute',
    backgroundColor: '#343739',
    borderWidth: 2,
    borderColor: '#494949',
    padding: responsiveHeight(0.6),
    borderRadius: responsiveHeight(2),
    bottom: responsiveHeight(2), // inside the image
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: responsiveHeight(2),
    marginHorizontal: 4,
    backgroundColor: '#BABABA',
  },
  activeDot: {
    backgroundColor: Colors.white,
    width: 10,
    height: 10,
    bottom: 1,
  },
});
