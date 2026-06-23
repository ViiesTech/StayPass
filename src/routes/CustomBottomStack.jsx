/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, View, TouchableOpacity, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../assets/colors';
import {responsiveHeight, responsiveWidth} from '../responsive_dimensions';
import {NormalText} from '../components/Titles';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logout, goToLogin} from '../redux/slices';

const PROTECTED_TABS = ['Profile', 'Queries'];

const CustomBottomStack = ({state, descriptors, navigation}) => {
  const {isGuest} = useSelector(s => s?.persistedData);
  const dispatch = useDispatch();
  if (!state) return null;
  const WIDTH = responsiveWidth(100);
  const HEIGHT = 70; // slightly taller to hold the curve
  const RADIUS = 25;
  const FAB_WIDTH = responsiveWidth(17.5);
  const FAB_HEIGHT = responsiveHeight(16);
  const DIP_WIDTH = FAB_WIDTH * 1.4; // curve width
  const DIP_DEPTH = FAB_HEIGHT / 2; // curve depth
  const CENTER_X = WIDTH / 2;

  const d = `
M0,${HEIGHT}
L0,${RADIUS} Q0,0 ${RADIUS},0
L${CENTER_X - DIP_WIDTH / 2},0
Q${CENTER_X},${DIP_DEPTH} ${CENTER_X + DIP_WIDTH / 2},0
L${WIDTH - RADIUS},0 Q${WIDTH},0 ${WIDTH},${RADIUS}
L${WIDTH},${HEIGHT}
Z
`;

  const data = [
    {name: 'Home', label: 'Home', icon: Entypo, iconName: 'home'},
    {
      name: 'Queries',
      label: 'My Queries',
      icon: FontAwesome,
      iconName: 'database',
    },
    {isBreak: true},
    {name: 'Community', label: 'Community', icon: Entypo, iconName: 'heart'},
    {name: 'Profile', label: 'Profile', icon: Ionicons, iconName: 'person'},
  ];
  const currentRoute = state.routeNames[state.index];
  return (
    <View style={styles.container}>
      {/* SVG Background */}
      <View style={{position: 'absolute', bottom: 0}}>
        <Svg width={WIDTH} height={HEIGHT}>
          <Path d={d} fill={Colors.themeColor} />
        </Svg>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {data.map((item, index) => {
          if (item.isBreak) {
            return <View key={index} style={{width: FAB_WIDTH}} />;
          }

          const IconName = item.icon;
          const isActive = currentRoute === item?.name;

          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                if (isGuest && PROTECTED_TABS.includes(item.name)) {
                  Alert.alert(
                    'Login Required',
                    'Please log in to access this feature.',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'Login', onPress: () => dispatch(goToLogin())},
                    ],
                  );
                  return;
                }
                navigation.navigate(item.name);
              }}
              style={styles.tab}>
              <IconName
                name={item.iconName}
                size={28}
                color={isActive ? Colors.white : Colors.inactiveTab}
              />
              <NormalText
                fontSize={1.7}
                title={item.label}
                color={isActive ? Colors.white : Colors.inactiveTab}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: responsiveHeight(6.5),
            left: '50%',
            transform: [{translateX: -(FAB_WIDTH / 2)}],
          },
        ]}>
        <Entypo name="magnifying-glass" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  svgStyle: {
    position: 'absolute',
    bottom: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveHeight(2),
    left: responsiveHeight(0.5),
    height: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  tab: {
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#F19921',
    width: responsiveWidth(17.5),
    height: responsiveHeight(8.4),
    borderRadius: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default CustomBottomStack;
