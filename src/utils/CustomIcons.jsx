// IconComponent.js
import React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const iconPackages = {
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
};

const IconComponent = ({ packageName, iconName, size, color }) => {
  const Icon = iconPackages[packageName];

  if (!Icon) {
    console.error(`Invalid package name: ${packageName}`);
    return null;
  }

  return (
    <View>
      <Icon name={iconName} size={size} color={color} />
    </View>
  );
};

export default IconComponent;