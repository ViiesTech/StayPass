/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import Br from '../../utils/Br';
import {BoldText, NormalText} from '../../components/Titles';
import {images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Input from '../../utils/TextInput';
import {Colors} from '../../assets/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../../components/Button';
import {pickImage, ShowToast} from '../../GlobalFunctions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {goToLogin} from '../../redux/slices';
import {useCreatePostMutation} from '../../redux/services/MainIntegration';
import {IMAGE_URL} from '../../redux/constant';
import SafeFastImage from '../../components/SafeFastImage';
import {
  containsObjectionableContent,
  objectionableContentMessage,
} from '../../utils/contentModeration';
const CreatePost = ({navigation}) => {
  const dispatch = useDispatch();
  const {isGuest} = useSelector(state => state?.persistedData);
  const {
    _id,
    image: userImage,
    name: userName,
  } = useSelector(state => state?.persistedData?.user);
  useEffect(() => {
    if (isGuest) {
      Alert.alert(
        'Login Required',
        'Please log in to create a post.',
        [
          {text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack()},
          {text: 'Login', onPress: () => dispatch(goToLogin())},
        ],
      );
    }
  }, [dispatch, isGuest, navigation]);
  const [image, setImage] = useState(null);
  const [createPost, {isLoading}] = useCreatePostMutation();
  const [caption, setCaption] = useState('');
  console.log('caption', caption);
  const handlePickImage = () => {
    pickImage(selected => {
      const img = Array.isArray(selected) ? selected[0] : selected;
      if (img) {
        setImage(img);
      }
    });
  };
  const handleRemoveImage = () => {
    setImage(null);
  };
  const renderImage = () => (
    <View>
      <SafeFastImage
        source={{uri: image.uri}}
        style={{
          width: responsiveWidth(33),
          height: responsiveHeight(15),
          borderRadius: responsiveHeight(1),
          margin: responsiveHeight(1),
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity
        onPress={handleRemoveImage}
        style={{
          padding: responsiveHeight(1),
          paddingHorizontal: responsiveHeight(1.3),
          backgroundColor: '#F9D5D5',
          position: 'absolute',
          right: responsiveHeight(-0.5),
          borderRadius: responsiveHeight(2.5),
        }}>
        <FontAwesome name="trash" color={Colors.delete} size={20} />
      </TouchableOpacity>
    </View>
  );

  const createPostHandler = async () => {
    if (containsObjectionableContent(caption)) {
      ShowToast('error', objectionableContentMessage);
      return;
    }

    const formData = new FormData();

    formData.append('userId', _id);
    formData.append('caption', caption);
    formData.append('posts', {
      uri: image?.uri,
      name: image?.fileName || 'userImage.jpg',
      type: image?.type || 'image/jpeg',
    });
    formData.append('state', 'New York City');
    createPost(formData)
      .unwrap()
      .then(res => {
        if (res.success) {
          navigation.goBack();
          ShowToast('success', res.message);
        } else {
          ShowToast('error', res.message);
        }
      })
      .catch(err => {
        ShowToast(
          'error',
          err?.response?.data?.message || 'Some Problem Occured',
        );
      });
  };
  return (
    <Wrapper isScroll>
      <BackHeader title="Add Post" />
      <Br space={4} />

      {/* Profile Section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveHeight(2),
        }}>
        <SafeFastImage
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(10),
            borderRadius: responsiveHeight(4),
          }}
          source={
            userImage ? {uri: `${IMAGE_URL}${userImage}`} : images.userDummy
          }
          resizeMode={FastImage.resizeMode.cover}
        />
        <View>
          <BoldText title={userName || 'N/A'} fontWeight="500" fontSize={2} />
          <NormalText title="7h" fontSize={1.5} />
        </View>
      </View>

      <Br space={3} />

      {/* Post Input */}
      <Input
        onChangeText={val => setCaption(val)}
        placeholderTextColor={Colors.black}
        placeholder="Write your text"
        inputStyle={{
          height: responsiveHeight(18.8),
        }}
        styling={{
          borderColor: Colors.theme4,
          borderWidth: 1.5,
          alignItems: 'flex-start',
          marginHorizontal: responsiveHeight(1.5),
          borderRadius: responsiveHeight(1.5),
        }}
        multiline={true}
        textAlignVertical="top"
      />

      {/* Upload Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          gap: responsiveHeight(1),
          marginTop: responsiveHeight(4),
        }}
        onPress={handlePickImage}>
        <FontAwesome5 name="images" color="#4BB4B6" size={25} />
        <BoldText title="Add Photo(s)" color="#4BB4B6" fontSize={2.2} />
      </TouchableOpacity>

      {/* Selected Images Grid */}
      {image && (
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(2)}}>
          {renderImage()}
        </View>
      )}
      <Br space={4} />
      <CustomButton
        onPress={createPostHandler}
        children={
          isLoading ? (
            <ActivityIndicator size={'large'} color={Colors.white} />
          ) : (
            'Post'
          )
        }
        style={{backgroundColor: Colors.theme3}}
      />
    </Wrapper>
  );
};

export default CreatePost;
