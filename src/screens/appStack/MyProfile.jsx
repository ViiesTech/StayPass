/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Header} from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight} from '../../responsive_dimensions';
import Br from '../../utils/Br';
import {images} from '../../assets/images';
import {Colors} from '../../assets/colors';
import {BoldText, NormalText} from '../../components/Titles';
import CustomButton from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import SafeFastImage from '../../components/SafeFastImage';
const MyProfile = ({navigation}) => {
  const {email, name, image} = useSelector(state => state?.persistedData?.user);
  const profileAvatarSize = responsiveHeight(13.2);

  const data = [
    {
      id: 1,
      title: 'Change password',
      icon: MaterialIcons,
      iconName: 'key',
      navigateTo: 'ChangePassword',
    },
    {
      id: 2,
      title: 'Blocked users',
      icon: MaterialIcons,
      iconName: 'block',
      navigateTo: 'BlockedUsers',
    },
  ];
  return (
    <Wrapper isScroll containerStyle={{paddingBottom: responsiveHeight(2)}}>
      <Header title="My Profile" />
      <Br space={4} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: profileAvatarSize}}>
          <View style={{borderRadius: profileAvatarSize / 2}}>
            <SafeFastImage
              source={image ? {uri: `${IMAGE_URL}${image}`} : images.userDummy}
              style={{
                height: profileAvatarSize,
                width: profileAvatarSize,
                borderRadius: profileAvatarSize / 2,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <NormalText
          fontSize={2}
          mrgnTop={2}
          color={Colors.platinum}
          title={name || 'Add your name'}
        />
        <NormalText fontSize={2} color="#737373" title={email} />
        <Br space={3} />
        <CustomButton
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            paddingHorizontal: responsiveHeight(3),
            height: responsiveHeight(6),
            borderBottomWidth: 1,
          }}
          children="Edit Profile"
        />
      </View>
      <View style={{marginTop: responsiveHeight(4)}}>
        <BoldText fontSize={2.6} title="My Account" fontWeight="600" />
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{
              gap: responsiveHeight(2),
              marginTop: responsiveHeight(3),
            }}
            renderItem={({item, index}) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  onPress={() =>
                    item.navigateTo
                      ? navigation.navigate(item.navigateTo)
                      : null
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveHeight(2),
                      }}>
                      <Icon
                        name={item.iconName}
                        size={25}
                        color={Colors.black}
                      />
                      <NormalText fontSize={2} title={item.title} />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        item.navigateTo
                          ? navigation.navigate(item.navigateTo)
                          : null
                      }>
                      <Ionicons
                        name="chevron-forward"
                        color="#174240"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                  {index < data.length - 1 && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#D0D0D0',
                        marginTop: responsiveHeight(2),
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default MyProfile;
