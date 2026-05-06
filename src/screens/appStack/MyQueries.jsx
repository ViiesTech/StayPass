/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {Header} from '../../components/Header';
import {responsiveHeight, responsiveWidth} from '../../responsive_dimensions';
import Br from '../../utils/Br';
import {BoldText, NormalText} from '../../components/Titles';
import {Colors} from '../../assets/colors';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLazyGetUserQueriesQuery} from '../../redux/services/MainIntegration';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ShowToast} from '../../GlobalFunctions';
const MyQueries = () => {
  const data2 = [
    {id: 1, name: 'Margaret Emily', email: 'margaret.e@gmail.com'},
    {id: 2, name: 'Jonathan Justin', email: 'jonathan.j@gmail.com'},
    {id: 3, name: 'Jonathan Justin', email: 'jonathan.j@gmail.com'},
    {id: 4, name: 'Margaret Emily', email: 'margaret.e@gmail.com'},
  ];
  const [getUserQueries, {isLoading, data}] = useLazyGetUserQueriesQuery();
  const queriesData = data?.data;
  const {_id} = useSelector(state => state?.persistedData?.user);
  useEffect(() => {
    getUserQueries(_id)
      .unwrap()
      .then(res => {
        console.log('eeeresss', res);
      })
      .catch(err => {
        ShowToast(
          'error',
          err?.response?.data?.message || 'Some problem occured',
        );
        console.log('err', err);
      });
  }, []);

  return (
    <Wrapper isScroll containerStyle={{paddingBottom: responsiveHeight(12)}}>
      <Header title="My Queries" />
      <Br space={4} />
      <View
        style={{
          backgroundColor: Colors.white,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 6,
          borderRadius: responsiveHeight(1.5),
        }}>
        <View
          style={{
            backgroundColor: Colors.theme4,
            padding: responsiveHeight(1.5),
            paddingHorizontal: responsiveHeight(2),
            borderRadius: responsiveHeight(1.5),
          }}>
          <NormalText
            fontSize={2}
            fontWeight="600"
            color={Colors.white}
            title="Queries Board"
          />
        </View>
        <View>
          {isLoading ? (
            <View
              style={{
                minHeight: responsiveHeight(35),
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={Colors.black} />
            </View>
          ) : queriesData?.length ? (
            <FlatList
              data={queriesData}
              renderItem={({item, index}) => {
                const category = item?.propertyId?.category;
                const isLastItem = index === queriesData.length - 1;
                const propType =
                  category === 'Sell'
                    ? 'For Sale'
                    : category === 'Rent'
                    ? 'For Rent'
                    : category === 'VocationalRent'
                    ? 'VOC Rent'
                    : 'For Lease';
                return (
                  <View
                    style={{
                      padding: responsiveHeight(2),
                      borderRadius: responsiveHeight(2),
                      backgroundColor: '#F9FCFF',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <BoldText
                        title={item?.ownerId?.name}
                        fontSize={2}
                        fontWeight="700"
                      />
                      <NormalText
                        title={moment(item?.createdAt).format('MMMM YYYY')}
                        fontSize={1.4}
                        fontWeight="500"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: responsiveHeight(2),
                      }}>
                      <View style={styles.iconsContainer}>
                        <Foundation
                          name="mail"
                          color={Colors.theme3}
                          size={15}
                        />
                        <NormalText
                          title={item?.ownerId?.email}
                          fontSize={1.3}
                          fontWeight="500"
                        />
                      </View>
                      <View style={styles.iconsContainer}>
                        <Foundation
                          name="telephone"
                          color={Colors.theme3}
                          size={15}
                        />
                        <NormalText
                          title={item?.ownerId?.phone}
                          fontSize={1.3}
                          fontWeight="500"
                        />
                      </View>
                      <View style={styles.iconsContainer}>
                        <Entypo
                          name="location"
                          color={Colors.theme3}
                          size={15}
                        />
                        <NormalText
                          title={item?.propertyId?.city}
                          fontSize={1.3}
                          fontWeight="500"
                        />
                      </View>
                    </View>
                    <NormalText
                      fontSize={1.7}
                      mrgnTop={3}
                      color="#5A5A5A"
                      title={item?.message}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: responsiveHeight(2),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: responsiveHeight(0.7),
                        }}>
                        <Ionicons name="home" color={Colors.theme4} size={16} />
                        <NormalText
                          fontSize={1.4}
                          maxWidth={32}
                          numOfLines={2}
                          title={item?.propertyId?.propertyName}
                          fontWeight="500"
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: responsiveHeight(0.5),
                        }}>
                        <NormalText
                          fontSize={1.4}
                          color={Colors.theme4}
                          title="Ref#"
                          fontWeight="500"
                        />
                        <NormalText
                          fontSize={1.4}
                          title="N/A"
                          fontWeight="500"
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: responsiveHeight(0.5),
                        }}>
                        <View
                          style={{
                            backgroundColor: Colors.themeColor,
                            height: responsiveHeight(2.5),
                            width: responsiveWidth(5.5),
                            borderRadius: responsiveHeight(0.6),
                          }}
                        />
                        <NormalText
                          fontSize={1.4}
                          title={propType}
                          fontWeight="400"
                        />
                      </View>
                    </View>
                    <Br space={2} />
                    {!isLastItem && (
                      <View style={{borderWidth: 1, borderColor: '#C7C7C7'}} />
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <View
              style={{
                minHeight: responsiveHeight(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NormalText
                title="No Queries Yet"
                fontSize={2.8}
                fontWeight="500"
              />
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default MyQueries;
const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveHeight(0.5),
  },
});
