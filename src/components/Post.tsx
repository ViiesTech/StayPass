/* eslint-disable react-native/no-inline-styles */
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useRef, useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import SafeFastImage from './SafeFastImage';
import { Colors } from '../assets/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { BoldText, NormalText } from './Titles';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IMAGE_URL } from '../redux/constant';
import moment from 'moment';
import { images } from '../assets/images';
import { useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import Input from '../utils/TextInput';

interface PostProps {
  item?: any;
  handleLikePress?: () => void;
  handleCommentPress?: () => void;
  onSuccess?: () => void;
  comment: string;
  commentLoading: boolean;
  setComment: (val: string) => void;
}

const Post: React.FC<PostProps> = React.memo(({ item, commentLoading, handleLikePress, handleCommentPress, comment, setComment }) => {
  const { _id } = useSelector((state: any) => state.persistedData.user);
  
  const isLiked = useMemo(() => {
    return item?.like?.some((user: any) => user._id === _id) || false;
  }, [item?.like, _id]);
  
  const refRBSheet = useRef<any>();
  
  const timeAgoShort = useMemo(() => (date: string) => {
    const now = moment();
    const diffSeconds = now.diff(moment(date), 'seconds');

    if (diffSeconds < 60) return `${diffSeconds}s`;

    const diffMinutes = now.diff(moment(date), 'minutes');
    if (diffMinutes < 60) return `${diffMinutes}m`;

    const diffHours = now.diff(moment(date), 'hours');
    if (diffHours < 24) return `${diffHours}h`;

    const diffDays = now.diff(moment(date), 'days');
    return `${diffDays}d`;
  }, []);

  const renderCommentItem = useMemo(() => ({ item: commentItem, index }: any) => (
    <View
      style={{
        flexDirection: 'row',
        gap: responsiveHeight(2),
      }}>
      <SafeFastImage
        style={{
          height: responsiveHeight(5),
          width: responsiveWidth(10.5),
          borderRadius: responsiveHeight(5),
        }}
        source={commentItem?.userId?.image ? { uri: `${IMAGE_URL}${commentItem.userId.image}` } : images.userDummy}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1),
          }}>
          <BoldText
            title={commentItem?.userId?.name || 'Unknown'}
            fontWeight="500"
            fontSize={2}
          />
          <View style={{ top: 1 }}>
            <NormalText title={timeAgoShort(commentItem?.createdAt)} fontSize={1.5} />
          </View>
        </View>
        <NormalText title={commentItem?.message || ''} fontSize={2} />
      </View>
    </View>
  ), [timeAgoShort]);

  if (!item) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: responsiveHeight(2),
        padding: responsiveHeight(2),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveHeight(2),
        }}>
        <SafeFastImage
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(10.5),
            borderRadius: responsiveHeight(5),
          }}
          source={item?.userId?.image ? { uri: `${IMAGE_URL}${item.userId.image}`, priority: FastImage.priority.normal } : images.userDummy}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveHeight(1),
            }}>
            <BoldText
              title={item?.userId?.name}
              fontWeight="500"
              fontSize={2}
            />
            <View style={{ top: 1 }}>
              <NormalText title="added a new photo" fontSize={1.5} />
            </View>
          </View>
          <NormalText title={moment(item?.createdAt).fromNow()} fontSize={1.5} />
        </View>
      </View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: Colors.theme4,
          borderRadius: responsiveHeight(1),
          marginTop: responsiveHeight(2),
        }}>
        <View style={{ paddingHorizontal: responsiveHeight(2) }}>
          <NormalText
            mrgnTop={1.5}
            fontSize={1.8}
            title={item?.caption}
          />
        </View>
        <SafeFastImage
          style={{
            width: '100%',
            height: responsiveHeight(23),
            borderRadius: responsiveHeight(1),
            marginTop: responsiveHeight(1.5),
          }}
          source={{
            uri: `${IMAGE_URL}${item?.posts[0]}`,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveHeight(3.5),
          marginTop: responsiveHeight(2),
        }}>
        <TouchableOpacity
          onPress={handleLikePress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1.5),
          }}>
          {isLiked ? (
            <FontAwesome name="thumbs-up" size={25} />
          ) : (
            <FontAwesome color={'black'} name="thumbs-o-up" size={25} />
          )}
          <NormalText title={item.totalLikes} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1.5),
          }}>
          <FontAwesome color="#575757" name="commenting-o" size={25} />
          <NormalText title={item.totalComments} />
        </TouchableOpacity>
      </View>
      <RBSheet
        draggable
        ref={refRBSheet}
        height={500}
        openDuration={500}
        closeDuration={500}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          },
        }}>
        <Text style={{ fontSize: responsiveFontSize(2.5), alignSelf: 'center', fontWeight: 'bold', color: 'black', marginBottom: 10 }}>
          Comments
        </Text>
        <View style={{ height: 1, width: '100%', backgroundColor: 'lightgray' }} />
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: responsiveHeight(2) }}>
         {item?.comment}
        </ScrollView> */}
        {commentLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator style={{ marginBottom: responsiveHeight(7) }} size={33} color={Colors.theme4} />
          </View>
        ) : (
          <FlatList 
            contentContainerStyle={{ flexGrow: 1, paddingVertical: responsiveHeight(2), gap: responsiveHeight(2) }} 
            data={item?.comment || []} 
            keyExtractor={(commentItem, index) => `comment-${commentItem?._id || index}`}
            renderItem={renderCommentItem}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
        <Input
          value={comment}
          onChangeText={(val: any) => setComment(val)}
          styling={{
            width: responsiveWidth(90),
            marginTop: responsiveHeight(1),
            alignSelf: 'center',
            borderColor: 'darkgray',
            borderRadius: responsiveHeight(1),
          }}
          placeholder="Write a comment..."
          leftIcon={null}
          inputStyle={{}}
          actAsButton={false}
          onPress={() => {}}
          labelTitle=""
          labelFontWeight="normal"
          labelColor=""
          rightIcon={
            <TouchableOpacity
              onPress={() => handleCommentPress?.()}
              style={{}}
            >
              <Feather name="send" size={22} color={Colors.theme4} />
            </TouchableOpacity>
          }
        />
      </RBSheet>
    </View>
  );
});

export default Post;
