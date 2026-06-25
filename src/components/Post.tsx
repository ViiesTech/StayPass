/* eslint-disable react-native/no-inline-styles */
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useRef, useMemo, useState } from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
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
  onReportPost?: (reason: string) => Promise<boolean> | boolean;
  onBlockUser?: (reason: string) => Promise<boolean> | boolean;
  canModerate?: boolean;
}

const reportReasons = [
  'Harassment or bullying',
  'Hate speech',
  'Sexual content',
  'Spam or scam',
  'Violence or threats',
  'Other objectionable content',
];

const Post: React.FC<PostProps> = React.memo(({
  item,
  commentLoading,
  handleLikePress,
  handleCommentPress,
  comment,
  setComment,
  onReportPost,
  onBlockUser,
  canModerate = true,
}) => {
  const { _id } = useSelector((state: any) => state.persistedData.user);
  const avatarSize = responsiveHeight(5);
  
  const isLiked = useMemo(() => {
    return item?.like?.some((user: any) => user._id === _id) || false;
  }, [item?.like, _id]);
  
  const refRBSheet = useRef<any>();
  const commentsListRef = useRef<any>();
  const [moderationVisible, setModerationVisible] = useState(false);
  const [moderationAction, setModerationAction] = useState<'report' | 'block' | null>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmittingModeration, setIsSubmittingModeration] = useState(false);

  const closeModeration = () => {
    if (isSubmittingModeration) {
      return;
    }
    setModerationVisible(false);
    setModerationAction(null);
    setSelectedReason('');
  };

  const submitModeration = async () => {
    if (!moderationAction || !selectedReason || isSubmittingModeration) {
      return;
    }

    setIsSubmittingModeration(true);
    const succeeded =
      moderationAction === 'report'
        ? await onReportPost?.(selectedReason)
        : await onBlockUser?.(selectedReason);
    setIsSubmittingModeration(false);

    if (succeeded) {
      setModerationVisible(false);
      setModerationAction(null);
      setSelectedReason('');
    }
  };
  
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

  const renderCommentItem = useMemo(() => ({ item: commentItem }: any) => (
    <View
      style={{
        flexDirection: 'row',
        gap: responsiveHeight(2),
      }}>
      <SafeFastImage
        style={{
          height: avatarSize,
          width: avatarSize,
          borderRadius: avatarSize / 2,
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
  ), [avatarSize, timeAgoShort]);

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
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize / 2,
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
        {canModerate && item?.userId?._id !== _id && (
          <TouchableOpacity
            onPress={() => setModerationVisible(true)}
            accessibilityLabel="Community safety options"
            style={{
              marginLeft: 'auto',
              padding: responsiveHeight(0.8),
            }}>
            <Feather name="more-vertical" size={23} color={Colors.black} />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        isVisible={moderationVisible}
        onBackdropPress={closeModeration}
        onBackButtonPress={closeModeration}
        useNativeDriver
        style={{margin: responsiveHeight(2)}}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: responsiveHeight(1),
            padding: responsiveHeight(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1}}>
              <BoldText
                title={
                  moderationAction === 'report'
                    ? 'Report Post'
                    : moderationAction === 'block'
                    ? 'Block User'
                    : 'Community Safety'
                }
                fontSize={2.3}
                fontWeight="700"
              />
              <NormalText
                title={
                  moderationAction
                    ? 'Choose a reason before continuing.'
                    : 'Report objectionable content or block this user.'
                }
                color={Colors.greyText4}
                fontSize={1.6}
                mrgnTop={0.5}
              />
            </View>
            <TouchableOpacity
              disabled={isSubmittingModeration}
              onPress={closeModeration}
              style={{padding: responsiveHeight(0.6)}}>
              <Feather name="x" size={23} color={Colors.black} />
            </TouchableOpacity>
          </View>

          {!moderationAction ? (
            <View style={{gap: responsiveHeight(1.2), marginTop: responsiveHeight(2)}}>
              <TouchableOpacity
                onPress={() => setModerationAction('report')}
                style={{
                  minHeight: responsiveHeight(5.8),
                  borderWidth: 1,
                  borderColor: Colors.borderColor2,
                  borderRadius: responsiveHeight(1),
                  paddingHorizontal: responsiveHeight(1.5),
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(1.2),
                }}>
                <Feather name="flag" size={21} color={Colors.themeColor} />
                <NormalText title="Report Post" fontWeight="600" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModerationAction('block')}
                style={{
                  minHeight: responsiveHeight(5.8),
                  borderWidth: 1,
                  borderColor: Colors.borderColor2,
                  borderRadius: responsiveHeight(1),
                  paddingHorizontal: responsiveHeight(1.5),
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(1.2),
                }}>
                <Feather name="slash" size={21} color={Colors.delete} />
                <NormalText
                  title="Block User"
                  color={Colors.delete}
                  fontWeight="600"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{marginTop: responsiveHeight(2)}}>
              <View style={{gap: responsiveHeight(0.8)}}>
                {reportReasons.map(reason => {
                  const isSelected = selectedReason === reason;
                  return (
                    <TouchableOpacity
                      key={reason}
                      disabled={isSubmittingModeration}
                      onPress={() => setSelectedReason(reason)}
                      style={{
                        minHeight: responsiveHeight(4.8),
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderColor3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <NormalText title={reason} fontSize={1.7} />
                      <Feather
                        name={isSelected ? 'check-circle' : 'circle'}
                        size={20}
                        color={
                          isSelected ? Colors.themeColor : Colors.greyText3
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: responsiveHeight(1),
                  marginTop: responsiveHeight(2),
                }}>
                <TouchableOpacity
                  disabled={isSubmittingModeration}
                  onPress={() => {
                    setModerationAction(null);
                    setSelectedReason('');
                  }}
                  style={{
                    flex: 1,
                    height: responsiveHeight(5.5),
                    borderWidth: 1,
                    borderColor: Colors.borderColor2,
                    borderRadius: responsiveHeight(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NormalText title="Back" fontWeight="600" />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!selectedReason || isSubmittingModeration}
                  onPress={submitModeration}
                  style={{
                    flex: 1.5,
                    height: responsiveHeight(5.5),
                    borderRadius: responsiveHeight(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      moderationAction === 'block'
                        ? Colors.delete
                        : Colors.themeColor,
                    opacity: !selectedReason ? 0.45 : 1,
                  }}>
                  {isSubmittingModeration ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                  ) : (
                    <NormalText
                      title={
                        moderationAction === 'block'
                          ? 'Block User'
                          : 'Report Post'
                      }
                      color={Colors.white}
                      fontWeight="700"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
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
            priority: FastImage.priority.normal,
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
            ref={commentsListRef}
            onContentSizeChange={() => commentsListRef.current?.scrollToEnd({animated: true})}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: responsiveHeight(2), gap: responsiveHeight(2) }} 
            data={item?.comment || []} 
            keyExtractor={(commentItem, index) => `comment-${commentItem?._id || index}`}
            renderItem={renderCommentItem}
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
