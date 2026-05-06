/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Wrapper from '../../components/Wrapper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../responsive_dimensions';
import {Header} from '../../components/Header';
import Br from '../../utils/Br';
import Input2 from '../../components/Input2';
import {Pera} from '../../utils/Text';
import {Colors} from '../../assets/colors';
import CheckBox from 'react-native-check-box';
import CustomButton from '../../components/Button';
import {BoldText} from '../../components/Titles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {images} from '../../assets/images';
import {useLazyGetSavedCardsQuery} from '../../redux/services/MainIntegration';
import {useSelector} from 'react-redux';
const MyCards = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [activeCard, setActiveCard] = useState();
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [getSavedCards, {isLoading, data}] = useLazyGetSavedCardsQuery();
  const {_id} = useSelector(state => state?.persistedData?.user);
  console.log('_id===', _id);
  console.log('selectedCard===', selectedCard);

  useEffect(() => {
    if (_id) {
      getSavedCards(_id)
        .unwrap()
        .then(res => {
          console.log('Saved Cards:', res);
          setSavedCards(res?.cards || []);
        })
        .catch(err => console.log('Error fetching saved cards:', err));
    }
  }, [_id]);

  const getCardImage = cardBrand => {
    // Stripe returns brand as 'visa', 'mastercard', etc.
    if (!cardBrand) return images.visa;
    return cardBrand.toLowerCase() === 'mastercard'
      ? images.masterCard
      : images.visa;
  };

  const cardsData = [
    {id: 'add', plusIcon: true},
    ...savedCards.map(card => ({
      id: card.id,
      image: getCardImage(card.card?.brand),
      cardData: card,
    })),
  ];

  return (
    <Wrapper isScroll containerStyle={{paddingBottom: responsiveHeight(2)}}>
      <Header title="My Cards" />
      <Br space={3} />
      <BoldText title="Attached cards" fontWeight="700" />
      <Br space={2} />

      {isLoading ? (
        <View
          style={{
            height: responsiveHeight(17),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.themeColor} />
        </View>
      ) : (
        <View style={{}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveHeight(2),
              paddingRight: responsiveHeight(1),
              flexGrow: 1,
            }}
            data={cardsData}
            horizontal
            renderItem={({item, index}) => {
              return (
                <ScrollView
                  contentContainerStyle={{
                    height: responsiveHeight(17),
                  }}>
                  {item.plusIcon && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AddCard')}
                      style={{
                        backgroundColor: Colors.plusContainer,
                        height: responsiveHeight(17),
                        width: responsiveWidth(13),
                        borderRadius: responsiveHeight(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesome6 name="plus" size={25} color="#6B6B6C" />
                    </TouchableOpacity>
                  )}
                  {item.image && (
                    <TouchableOpacity
                      onPress={() => {
                        setActiveCard(item.id);
                        if (item.cardData) {
                          setSelectedCard(item.cardData);
                        }
                      }}
                      style={{}}>
                      {item.id === activeCard && (
                        <View
                          style={{
                            borderWidth: 2,
                            borderColor: Colors.white,
                            position: 'absolute',
                            borderRadius: responsiveHeight(2),
                            bottom: responsiveHeight(0.8),
                            right: responsiveHeight(2),
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: responsiveHeight(0.78),
                            zIndex: 10,
                          }}>
                          <View
                            style={{
                              backgroundColor: Colors.white,
                              height: responsiveHeight(2.2),
                              borderRadius: responsiveHeight(3),
                              width: responsiveWidth(4.4),
                            }}
                          />
                        </View>
                      )}
                      <Image
                        source={item.image}
                        style={{
                          height: responsiveHeight(17),
                          borderRadius: responsiveHeight(2),
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </ScrollView>
              );
            }}
          />
        </View>
      )}
      <Br space={3} />

      <View style={{gap: responsiveHeight(2)}}>
        <Input2
          labelColor="#808CA0"
          label="Name"
          placeholder={'Jordan Delgado'}
          value={selectedCard?.billing_details?.name || ''}
          editable={false}
        />
        <Input2
          labelColor="#808CA0"
          label="Card number"
          placeholder={'***** ***** **** 789'}
          value={
            selectedCard?.card?.last4
              ? `**** **** **** ${selectedCard.card.last4}`
              : ''
          }
          editable={false}
        />
        <View style={{}}>
          <Input2
            keyboardType="numeric"
            // width={selectedCard ? 100 : 45}
            labelColor="#808CA0"
            label="Expiry Date"
            placeholder={'10-27-2025'}
            value={
              selectedCard?.card?.exp_month && selectedCard?.card?.exp_year
                ? `${selectedCard.card.exp_month}/${selectedCard.card.exp_year}`
                : ''
            }
            editable={false}
          />
          {/* {!selectedCard && (
            <Input2
              keyboardType="numeric"
              maxLength={3}
              width={45}
              labelColor="#808CA0"
              label="CVV"
              placeholder={'***'}
              value={''}
              editable={false}
            />
          )} */}
        </View>
        <View style={loginStyle.rememberContainer}>
          <CheckBox
            checkBoxColor={Colors.themeColor}
            checkedCheckBoxColor={Colors.themeColor}
            onClick={() => {
              setToggleCheckBox(!toggleCheckBox);
            }}
            isChecked={toggleCheckBox}
          />
          <Pera
            style={{fontSize: responsiveFontSize(1.8)}}
            color={Colors.greyText5}>
            Save Detail Information
          </Pera>
        </View>
      </View>
      <Br space={3} />
      <CustomButton
        children="Select Card"
        onPress={() => navigation.goBack()}
        style={{backgroundColor: Colors.theme3}}
      />
    </Wrapper>
  );
};

export default MyCards;
const loginStyle = StyleSheet.create({
  checkBoxConfiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveHeight(1.5),
  },
});
