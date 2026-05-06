/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {Header} from '../../components/Header';
import {images} from '../../assets/images';
import Post from '../../components/Post';
import {Colors} from '../../assets/colors';
import {BoldText, NormalText} from '../../components/Titles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useAddCommentMutation,
  useLazyGetAllPostsQuery,
  useLikePostMutation,
} from '../../redux/services/MainIntegration';
import {useSelector} from 'react-redux';
import {ShowToast} from '../../GlobalFunctions';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import SafeFastImage from '../../components/SafeFastImage';
import {IMAGE_URL} from '../../redux/constant';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Community = ({navigation}) => {
  const [getAllPosts, {isLoading, data, error}] = useLazyGetAllPostsQuery();
  const [likePost, {isLoading: likeLoading}] = useLikePostMutation();
  const [likeChanged, setLikeChanged] = useState(false);
  const postData = data?.data;
  const {name, image, _id} = useSelector(state => state.persistedData.user);
  const [comment, setComment] = useState('');
  const [addComment, {isLoading: commentLoading}] = useAddCommentMutation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMounted = useRef(true);
  const focus = useIsFocused();

  console.log('name', name, image);
  // const postData = [
  //   {
  //     id: 1,
  //     name: 'Kurnia Jones',
  //     profilePic: images.postProfile,
  //     postImg: images.post1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Kurnia Jones',
  //     profilePic: images.postProfile,
  //     postImg: images.post1,
  //   },
  // ];

  const likePostHandler = async postId => {
    if (!_id || !postId) return;

    let likeData = {
      postId: postId,
      userId: _id,
    };

    try {
      const res = await likePost(likeData).unwrap();
      if (res.success && isMounted.current) {
        setLikeChanged(!likeChanged);
      } else if (!res.success) {
        ShowToast('error', res.message);
      }
    } catch (err) {
      ShowToast(
        'error',
        err?.response?.data?.message || 'Some problem occured',
      );
      console.log('err', err);
    }
  };

  const addCommentHandler = async postId => {
    if (!comment.trim() || !postId || !_id) return;

    console.log('comment postId', comment, postId);
    const currentComment = comment;
    setComment('');

    let apiData = {
      postId: postId,
      userId: _id,
      message: currentComment,
    };

    try {
      const res = await addComment(apiData).unwrap();
      if (res.success && isMounted.current) {
        setLikeChanged(!likeChanged);
      } else if (!res.success) {
        ShowToast('error', res?.message);
      }
    } catch (err) {
      ShowToast(
        'error',
        err?.response?.data?.message || 'Some Problem Occured',
      );
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts().unwrap();
        console.log('Property:', res);
      } catch (err) {
        console.log('Error fetching posts:', err);
        if (isMounted.current) {
          ShowToast('error', 'Failed to load posts');
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted.current = false;
    };
  }, [getAllPosts,focus, likeChanged]);
  // const postData = [
  //   {
  //     id: 1,
  //     name: 'Kurnia Jones',
  //     profilePic: images.postProfile,
  //     postImg: images.post1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Alex Charles',
  //     profilePic: images.alexCharles,
  //     postImg: images.post2,
  //   },
  // ];

  return (
    <Wrapper
      isScroll
      containerStyle={{paddingBottom: responsiveHeight(12), padding: 0.1}}>
      <Header
        title="Community"
        style={{paddingHorizontal: responsiveHeight(2)}}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: responsiveHeight(2),
          paddingTop: responsiveHeight(3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1),
          }}>
          <Ionicons name="location-sharp" color={Colors.theme3} size={20} />
          <NormalText title="Nearby landmark" color="#44535E" />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1),
          }}>
          <NormalText title="Select region" color="#44535E" />
          <Ionicons name="chevron-down" color={Colors.black} size={20} />
        </TouchableOpacity>
      </View> */}
      {isLoading ? (
        <View style={{flex: 0.8, justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={Colors.black} />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: responsiveHeight(2),
              paddingTop: responsiveHeight(3),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveHeight(2),
              }}>
              <SafeFastImage
                source={
                  image ? {uri: `${IMAGE_URL}${image}`} : images.userDummy
                }
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(10.5),
                  borderRadius: responsiveHeight(5),
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <BoldText title={name} fontWeight="500" fontSize={2} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveHeight(1),
              }}>
              {/* <View
                style={{
                  padding: responsiveHeight(0.7),
                  borderWidth: 1,
                  borderColor: '#646464',
                  borderRadius: responsiveHeight(3),
                  paddingHorizontal: responsiveHeight(1.6),
                }}>
                <NormalText
                  title={`${postData?.length} Post`}
                  color="#646464"
                />
              </View> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('CreatePost')}
                style={{
                  padding: responsiveHeight(0.7),
                  borderWidth: 1,
                  borderColor: '#646464',
                  borderRadius: responsiveHeight(3),
                  paddingHorizontal: responsiveHeight(1.1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(0.5),
                }}>
                <AntDesign name="plus" size={20} color="#646464" />
                <NormalText title="Create" color="#646464" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveHeight(3),
              padding: responsiveHeight(2),
              paddingTop: responsiveHeight(3),
            }}
            data={postData}
            keyExtractor={(item, index) => item?._id || `post-${index}`}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            windowSize={10}
            getItemLayout={(_, index) => ({
              length: responsiveHeight(50), // Approximate height of each post
              offset: responsiveHeight(53) * index, // Height + gap
              index,
            })}
            renderItem={({item, index}) => {
              console.log('item', item);
              return (
                <Post
                  handleCommentPress={() => {
                    // console.log('val,',val)
                    addCommentHandler(item?._id);
                  }}
                  commentLoading={commentLoading}
                  comment={comment}
                  setComment={setComment}
                  handleLikePress={() => likePostHandler(item?._id)}
                  item={item}
                />
              );
            }}
          />
        </View>
      )}
    </Wrapper>
  );
};

export default Community;
