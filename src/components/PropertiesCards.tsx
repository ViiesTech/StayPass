/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {responsiveHeight, responsiveWidth} from '../responsive_dimensions';
import {Colors} from '../assets/colors';
import {images} from '../assets/images';
import {BoldText, NormalText} from './Titles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Br from '../utils/Br';
import IconContainer from './IconContainer';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_URL} from '../redux/constant';
import {useAddToFvrtMutation} from '../redux/services/MainIntegration';
import {ShowToast} from '../GlobalFunctions';
import {useSelector} from 'react-redux';

interface PropertyCardsProps {
  containerWidth?: number;
  data?: object;
  index?: number;
  isFavorite?: any;
  refresh?: () => void;
}
const PropertiesCards: React.FC<PropertyCardsProps> = ({
  containerWidth,
  index,
  data,
  refresh,
  isFavorite,
}) => {
  const featured =
    data?.isFeatured === 'Hot Property'
      ? 'Hot'
      : data?.isFeatured === 'Super Hot Property'
      ? 'Super Hot'
      : null;
  const isVacational = data?.category === 'VocationalRent';
  console.log('data', data?.images);

  // console.log('_id', _id);

  const navigation = useNavigation();
  const {_id} = useSelector(state => state?.persistedData?.user);

  // Temporary UI state
  const [isFvrt, setIsFvrt] = useState(
    data?.favoriteBy?.includes(_id) || false,
  );

  const [addToFvrt] = useAddToFvrtMutation();
  const handleToggle = async () => {
    // 1️⃣ Instant UI update
    setIsFvrt(prev => !prev);

    // 2️⃣ Fire API in background (no need to wait)
    try {
      await addToFvrt({propertyId: data._id, userId: _id})
        .unwrap()
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
        });
      refresh && refresh();
      // optional: ShowToast('success', 'Added to favorites');
    } catch (error) {
      // Rollback if API fails
      setIsFvrt(prev => !prev);
      ShowToast('error', error?.data?.message || 'Some problem occurred');
    }
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PropertyDetails', {_id: data?._id})}
      style={{
        backgroundColor: '#F9FCFF',
        borderWidth: 1.5,
        width: containerWidth
          ? responsiveWidth(containerWidth)
          : responsiveWidth(41),
        borderColor: Colors.borderColor6,
        padding: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
      }}>
      {data?.images && data.images.length > 0 ? (
        <ImageBackground
          imageStyle={{
            borderRadius: responsiveHeight(1.5),
          }}
          source={{uri: `${IMAGE_URL}${data?.images[0]}`}}
          style={{
            width: '100%',
            height: responsiveHeight(17),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: featured ? 'space-between' : 'flex-end',
              padding: responsiveHeight(0.5),
              marginTop: responsiveHeight(0.5),
            }}>
            {featured && (
              <View
                style={{
                  backgroundColor: Colors.superHot,
                  padding: responsiveHeight(0.7),
                  paddingHorizontal: responsiveHeight(1),
                  borderRadius: responsiveHeight(2),
                }}>
                <NormalText
                  fontSize={1.7}
                  title={featured}
                  color={Colors.white}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={handleToggle}
              style={{
                backgroundColor: Colors.themeColor,
                padding: responsiveHeight(0.7),
                borderRadius: responsiveHeight(2),
              }}>
              <Ionicons
                size={20}
                name={isFvrt ? 'heart-sharp' : 'heart-outline'}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: responsiveHeight(1),
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <BoldText
              title={data?.price != null ? `KES ${data.price}` : 'KES N/A'}
              color={Colors.white}
              fontSize={2.2}
              fontWeight="600"
            />
          </View>
        </ImageBackground>
      ) : (
        <View
          style={{
            width: '100%',
            height: responsiveHeight(17),
            backgroundColor: '#F0F4F8',
            borderRadius: responsiveHeight(1.5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: featured ? 'space-between' : 'flex-end',
              padding: responsiveHeight(0.5),
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}>
            {featured && (
              <View
                style={{
                  backgroundColor: Colors.superHot,
                  padding: responsiveHeight(0.7),
                  paddingHorizontal: responsiveHeight(1),
                  borderRadius: responsiveHeight(2),
                }}>
                <NormalText
                  fontSize={1.7}
                  title={featured}
                  color={Colors.white}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={handleToggle}
              style={{
                backgroundColor: Colors.themeColor,
                padding: responsiveHeight(0.7),
                borderRadius: responsiveHeight(2),
              }}>
              <Ionicons
                size={20}
                name={isFvrt ? 'heart-sharp' : 'heart-outline'}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <MaterialCommunityIcons
            name="image-off-outline"
            size={35}
            color="#CBD5E0"
          />
          <NormalText
            mrgnTop={0.5}
            title="No Image"
            color="#A0AEC0"
            fontSize={1.4}
          />
          <View
            style={{
              padding: responsiveHeight(1),
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}>
            <BoldText
              title={data?.price != null ? `KES ${data.price}` : 'KES N/A'}
              color={Colors.themeColor}
              fontSize={2.2}
              fontWeight="600"
            />
          </View>
        </View>
      )}
      <Br space={1} />
      <NormalText title={data?.propertyName} fontWeight="600" numOfLines={1} />
      <Br space={1} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveHeight(1),
        }}>
        <Ionicons name="location" size={20} color={Colors.themeColor} />
        <NormalText title={data?.address} numOfLines={1} width={25} />
      </View>
      <Br space={1} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: responsiveHeight(0.5),
        }}>
        <IconContainer
          title={data?.noOfRooms ? `${data?.noOfRooms} Beds` : 'N/A'}
          Icon={Ionicons}
          iconName="bed-outline"
        />
        <IconContainer
          title={data?.noOfBathrooms ? `${data?.noOfBathrooms} Baths` : 'N/A'}
          Icon={FontAwesome5}
          iconName="bath"
        />
        <IconContainer
          width={30}
          title={`${data?.propertySize}`}
          Icon={Ionicons}
          iconName="expand-outline"
        />
      </View>
    </TouchableOpacity>
  );
};

export default PropertiesCards;
