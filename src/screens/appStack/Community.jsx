/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {Header} from '../../components/Header';
import {images} from '../../assets/images';
import Post from '../../components/Post';
import {Colors} from '../../assets/colors';
import {BoldText, NormalText} from '../../components/Titles';
import {
  useAddCommentMutation,
  useBlockUserMutation,
  useLazyGetAllPostsQuery,
  useLikePostMutation,
  useReportPostMutation,
} from '../../redux/services/MainIntegration';
import {useSelector, useDispatch} from 'react-redux';
import {goToLogin} from '../../redux/slices';
import {ShowToast} from '../../GlobalFunctions';
import {useIsFocused} from '@react-navigation/native';
import SafeFastImage from '../../components/SafeFastImage';
import {IMAGE_URL} from '../../redux/constant';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  containsObjectionableContent,
  objectionableContentMessage,
} from '../../utils/contentModeration';
const Community = ({navigation}) => {
  const communityAvatarSize = responsiveHeight(5);
  const [getAllPosts, {isLoading, data, error}] = useLazyGetAllPostsQuery();
  const [likePost, {isLoading: likeLoading}] = useLikePostMutation();
  const [likeChanged, setLikeChanged] = useState(false);
  const postData = data?.data;
  const {name, image, _id} = useSelector(
    state => state.persistedData.user,
  );
  const {isGuest} = useSelector(state => state.persistedData);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [isRefreshingFeed, setIsRefreshingFeed] = useState(false);
  const [addComment, {isLoading: commentLoading}] = useAddCommentMutation();
  const [blockUser] = useBlockUserMutation();
  const [reportPost] = useReportPostMutation();
  const isMounted = useRef(true);
  const focus = useIsFocused();

  const refreshFeedAfterModeration = async successMessage => {
    setIsRefreshingFeed(true);
    try {
      await getAllPosts().unwrap();
      ShowToast('success', successMessage);
    } catch (error) {
      ShowToast(
        'error',
        error?.data?.message || 'Unable to refresh the community feed.',
      );
    } finally {
      setIsRefreshingFeed(false);
    }
  };

  console.log('_id=====', _id, image);
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
    if (isGuest) {
      Alert.alert('Login Required', 'Please log in to like posts.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Login', onPress: () => dispatch(goToLogin())},
      ]);
      return;
    }
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
    if (isGuest) {
      Alert.alert('Login Required', 'Please log in to add comments.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Login', onPress: () => dispatch(goToLogin())},
      ]);
      return;
    }
    if (!comment.trim() || !postId || !_id) return;
    if (containsObjectionableContent(comment)) {
      ShowToast('error', objectionableContentMessage);
      return;
    }

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

  const reportPostHandler = async (item, reason) => {
    if (isGuest) {
      Alert.alert('Login Required', 'Please log in to report posts.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Login', onPress: () => dispatch(goToLogin())},
      ]);
      return false;
    }

    const postId = item?._id;
    if (!postId) {
      return false;
    }

    try {
      const response = await reportPost({postId, reason}).unwrap();

      if (!response?.success) {
        ShowToast('error', response?.message || 'Unable to report this post.');
        return false;
      }

      refreshFeedAfterModeration(
        response?.message || 'Post reported successfully.',
      );
      return true;
    } catch (err) {
      ShowToast(
        'error',
        err?.data?.message || 'Unable to report this post right now.',
      );
      return false;
    }
  };

  const blockUserHandler = async (item, reason) => {
    if (isGuest) {
      Alert.alert('Login Required', 'Please log in to block users.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Login', onPress: () => dispatch(goToLogin())},
      ]);
      return false;
    }

    const blockedUserId = item?.userId?._id;
    if (!blockedUserId) {
      return false;
    }

    try {
      const response = await blockUser({
        blockedUserId,
        postId: item?._id,
        reason,
      }).unwrap();

      if (!response?.success) {
        ShowToast('error', response?.message || 'Unable to block this user.');
        return false;
      }

      refreshFeedAfterModeration(
        response?.message || 'User blocked successfully.',
      );
      return true;
    } catch (err) {
      ShowToast(
        'error',
        err?.data?.message || 'Unable to block this user right now.',
      );
      return false;
    }
  };
  useEffect(() => {
    isMounted.current = true;
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
  }, [getAllPosts, focus, likeChanged]);
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
      containerStyle={{
        padding: 0.1,
        paddingTop: responsiveHeight(3),
      }}>
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
      {isLoading || isRefreshingFeed ? (
        <>
          <View style={{paddingHorizontal: responsiveHeight(2)}}>
            <Header title="Community" />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={40} color={Colors.black} />
          </View>
        </>
      ) : (
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(14),
          }}
          ListHeaderComponent={
            <>
              <View style={{paddingHorizontal: responsiveHeight(2)}}>
                <Header title="Community" />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: responsiveHeight(2),
                  paddingTop: responsiveHeight(3),
                  marginBottom: responsiveHeight(3),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveHeight(2),
                  }}>
                  <SafeFastImage
                    source={
                      !isGuest && image
                        ? {uri: `${IMAGE_URL}${image}`}
                        : images.userDummy
                    }
                    style={{
                      height: communityAvatarSize,
                      width: communityAvatarSize,
                      borderRadius: communityAvatarSize / 2,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <BoldText
                    title={isGuest ? 'Guest' : name}
                    fontWeight="500"
                    fontSize={2}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (isGuest) {
                      Alert.alert(
                        'Login Required',
                        'Please log in to create a post.',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {text: 'Login', onPress: () => dispatch(goToLogin())},
                        ],
                      );
                      return;
                    }
                    navigation.navigate('CreatePost');
                  }}
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
            </>
          }
          ListEmptyComponent={
            <View
              style={{
                minHeight: responsiveHeight(45),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NormalText
                title="No community posts available."
                color={Colors.greyText4}
                txtAlign="center"
              />
            </View>
          }
          data={postData || []}
          keyExtractor={(item, index) => item?._id || `post-${index}`}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          removeClippedSubviews={true}
          ItemSeparatorComponent={() => (
            <View style={{height: responsiveHeight(3)}} />
          )}
          renderItem={({item}) => (
            <View style={{marginHorizontal: responsiveHeight(2)}}>
              <Post
                handleCommentPress={() => addCommentHandler(item?._id)}
                commentLoading={commentLoading}
                comment={comment}
                setComment={setComment}
                handleLikePress={() => likePostHandler(item?._id)}
                onReportPost={reason => reportPostHandler(item, reason)}
                onBlockUser={reason => blockUserHandler(item, reason)}
                item={item}
              />
            </View>
          )}
        />
      )}
    </Wrapper>
  );
};

export default Community;
