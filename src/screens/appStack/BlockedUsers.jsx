/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Wrapper from '../../components/Wrapper';
import {BackHeader} from '../../components/Header';
import SafeFastImage from '../../components/SafeFastImage';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import {images} from '../../assets/images';
import {IMAGE_URL} from '../../redux/constant';
import {
  useLazyGetBlockedUsersQuery,
  useUnblockUserMutation,
} from '../../redux/services/MainIntegration';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import {ShowToast} from '../../GlobalFunctions';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {unblockCommunityUser} from '../../redux/slices';

const BlockedUserSeparator = () => (
  <View style={{height: responsiveHeight(1.5)}} />
);

const BlockedUsers = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [getBlockedUsers, {data, isError}] =
    useLazyGetBlockedUsersQuery();
  const [unblockUser] = useUnblockUserMutation();
  const [selectedBlockedItem, setSelectedBlockedItem] = useState(null);
  const [isSubmittingUnblock, setIsSubmittingUnblock] = useState(false);
  const [isReloadingBlockedUsers, setIsReloadingBlockedUsers] = useState(false);
  const [hasLoadedSuccessfully, setHasLoadedSuccessfully] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const blockedUsers = data?.data || [];

  const fetchBlockedUsers = useCallback(async () => {
    try {
      await getBlockedUsers().unwrap();
      setHasLoadedSuccessfully(true);
      return true;
    } catch (error) {
      ShowToast(
        'error',
        error?.data?.message || 'Unable to load blocked users.',
      );
      return false;
    }
  }, [getBlockedUsers]);

  const refreshBlockedUsers = useCallback(async () => {
    setIsRefreshing(true);
    await fetchBlockedUsers();
    setIsRefreshing(false);
  }, [fetchBlockedUsers]);

  useEffect(() => {
    if (isFocused) {
      fetchBlockedUsers();
    }
  }, [fetchBlockedUsers, isFocused]);

  const unblockUserHandler = async () => {
    const blockedUserId = selectedBlockedItem?.user?._id;
    if (!blockedUserId) {
      return;
    }

    setIsSubmittingUnblock(true);
    try {
      const response = await unblockUser({blockedUserId}).unwrap();
      if (!response?.success) {
        ShowToast('error', response?.message || 'Unable to unblock this user.');
        return;
      }

      dispatch(unblockCommunityUser(blockedUserId));
      setIsSubmittingUnblock(false);
      setSelectedBlockedItem(null);
      setIsReloadingBlockedUsers(true);

      try {
        await getBlockedUsers().unwrap();
        ShowToast(
          'success',
          response?.message || 'User unblocked successfully.',
        );
      } catch (refreshError) {
        ShowToast(
          'error',
          refreshError?.data?.message ||
            'User was unblocked, but the list could not be refreshed.',
        );
      } finally {
        setIsReloadingBlockedUsers(false);
      }
    } catch (error) {
      ShowToast(
        'error',
        error?.data?.message || 'Unable to unblock this user right now.',
      );
    } finally {
      setIsSubmittingUnblock(false);
    }
  };

  const closeUnblockModal = () => {
    if (!isSubmittingUnblock) {
      setSelectedBlockedItem(null);
    }
  };

  const showInitialLoader = !hasLoadedSuccessfully && !isError;
  const showInitialError = !hasLoadedSuccessfully && isError;

  return (
    <Wrapper
      containerStyle={{
        padding: responsiveHeight(2),
        paddingTop: responsiveHeight(3),
      }}>
      <BackHeader title="Blocked Users" />

      {showInitialLoader || isReloadingBlockedUsers ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={Colors.black} />
        </View>
      ) : showInitialError ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons
            name="error-outline"
            size={46}
            color={Colors.greyText3}
          />
          <BoldText
            title="Unable to load blocked users"
            fontSize={2.2}
            mrgnTop={1.5}
            txtAlign="center"
          />
          <TouchableOpacity
            onPress={fetchBlockedUsers}
            style={{
              marginTop: responsiveHeight(2),
              borderWidth: 1,
              borderColor: Colors.themeColor,
              borderRadius: responsiveHeight(1),
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveHeight(2),
            }}>
            <NormalText
              title="Try Again"
              color={Colors.themeColor}
              fontWeight="600"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={blockedUsers}
          keyExtractor={(item, index) =>
            item?.user?._id || `blocked-user-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: responsiveHeight(3),
            paddingBottom: responsiveHeight(5),
          }}
          ItemSeparatorComponent={BlockedUserSeparator}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                minHeight: responsiveHeight(55),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="person-outline"
                size={48}
                color={Colors.greyText3}
              />
              <BoldText
                title="No blocked users"
                fontSize={2.3}
                mrgnTop={1.5}
                txtAlign="center"
              />
              <NormalText
                title="Users you block will appear here."
                color={Colors.greyText4}
                fontSize={1.7}
                mrgnTop={0.8}
                txtAlign="center"
              />
            </View>
          }
          renderItem={({item}) => {
            const user = item?.user || {};

            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.borderColor2,
                  borderRadius: responsiveHeight(1),
                  padding: responsiveHeight(1.5),
                  backgroundColor: Colors.white,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveHeight(1.5),
                  }}>
                  <SafeFastImage
                    source={
                      user?.image
                        ? {uri: `${IMAGE_URL}${user.image}`}
                        : images.userDummy
                    }
                    style={{
                      height: responsiveHeight(6),
                      width: responsiveWidth(12.5),
                      borderRadius: responsiveHeight(4),
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={{flex: 1}}>
                    <BoldText
                      title={user?.name || 'Unknown user'}
                      fontSize={2}
                      fontWeight="600"
                    />
                    <NormalText
                      title={user?.email || ''}
                      color={Colors.greyText4}
                      fontSize={1.6}
                      numOfLines={1}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedBlockedItem(item)}
                    style={{
                      minWidth: responsiveWidth(20),
                      height: responsiveHeight(4.5),
                      borderWidth: 1,
                      borderColor: Colors.themeColor,
                      borderRadius: responsiveHeight(1),
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: responsiveHeight(1.2),
                    }}>
                    <NormalText
                      title="Unblock"
                      color={Colors.themeColor}
                      fontWeight="600"
                      fontSize={1.6}
                    />
                  </TouchableOpacity>
                </View>

                {!!item?.reason && (
                  <NormalText
                    title={`Reason: ${item.reason}`}
                    color={Colors.darkGrey}
                    fontSize={1.6}
                    mrgnTop={1.2}
                  />
                )}
                {!!item?.post?.caption && (
                  <NormalText
                    title={`Post: ${item.post.caption}`}
                    color={Colors.greyText4}
                    fontSize={1.5}
                    mrgnTop={0.7}
                    numOfLines={2}
                  />
                )}
                {!!item?.blockedAt && (
                  <NormalText
                    title={`Blocked ${moment(item.blockedAt).format('DD MMM YYYY')}`}
                    color={Colors.greyText3}
                    fontSize={1.4}
                    mrgnTop={0.7}
                  />
                )}
              </View>
            );
          }}
          refreshing={isRefreshing}
          onRefresh={refreshBlockedUsers}
        />
      )}

      <Modal
        isVisible={!!selectedBlockedItem}
        onBackdropPress={closeUnblockModal}
        onBackButtonPress={closeUnblockModal}
        useNativeDriver
        style={{margin: responsiveHeight(2)}}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: responsiveHeight(1),
            padding: responsiveHeight(2),
          }}>
          <BoldText
            title="Unblock User"
            fontSize={2.3}
            fontWeight="700"
          />
          <NormalText
            title={`Allow ${
              selectedBlockedItem?.user?.name || 'this user'
            } to appear in your community feed again?`}
            color={Colors.greyText4}
            fontSize={1.7}
            mrgnTop={1}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveHeight(1),
              marginTop: responsiveHeight(2.5),
            }}>
            <TouchableOpacity
              disabled={isSubmittingUnblock}
              onPress={closeUnblockModal}
              style={{
                flex: 1,
                height: responsiveHeight(5.5),
                borderWidth: 1,
                borderColor: Colors.borderColor2,
                borderRadius: responsiveHeight(1),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NormalText title="Cancel" fontWeight="600" />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isSubmittingUnblock}
              onPress={unblockUserHandler}
              style={{
                flex: 1.4,
                height: responsiveHeight(5.5),
                borderRadius: responsiveHeight(1),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.themeColor,
              }}>
              {isSubmittingUnblock ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <NormalText
                  title="Unblock User"
                  color={Colors.white}
                  fontWeight="700"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
};

export default BlockedUsers;
