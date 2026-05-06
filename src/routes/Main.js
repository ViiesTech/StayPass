import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPassword from '../screens/authStack/NewPassword';
import MainTabs from './BottomStack';
import PropertiesForSale from '../screens/appStack/PropertiesForSale';
import Filter from '../screens/appStack/Filter';
import ContactSeller from '../screens/appStack/ContactSeller';
import ContactForm from '../screens/appStack/ContactForm';
import ReservationDetails from '../screens/appStack/ReservationDetails';
import PaymentDetails from '../screens/appStack/PaymentDetails';
import AddCard from '../screens/appStack/AddCard';
import PrivacyPolicy from '../screens/appStack/PrivacyPolicy';
import MyWallet from '../screens/appStack/MyWallet';
import ChangePassword from '../screens/appStack/ChangePassword';
import TermsConditions from '../screens/appStack/TermsConditions';
import Ratings from '../screens/appStack/Ratings';
import MyFavrts from '../screens/appStack/MyFavrts';
import MyProfile from '../screens/appStack/MyProfile';
import EditProfile from '../screens/appStack/EditProfile';
import MyCards from '../screens/appStack/MyCards';
import MyBookings from '../screens/appStack/MyBookings';
import BookingDetails from '../screens/appStack/BookingDetails';
import RoomDetails from '../screens/appStack/RoomDetails';
import SellerProfile from '../screens/appStack/SellerProfile';
import MyPost from '../screens/appStack/MyPost';
import CreatePost from '../screens/appStack/CreatePost';
import PropertyDetails from '../screens/appStack/PropertyDetails';

const Main = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="BottomStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomStack" component={MainTabs} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="PropertiesForSale" component={PropertiesForSale} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="ContactSeller" component={ContactSeller} />
      <Stack.Screen name="ContactForm" component={ContactForm} />
      <Stack.Screen name="ReservationDetails" component={ReservationDetails} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Ratings" component={Ratings} />
      <Stack.Screen name="MyFavrts" component={MyFavrts} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyCards" component={MyCards} />
      <Stack.Screen name="MyBookings" component={MyBookings} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
      <Stack.Screen name="SellerProfile" component={SellerProfile} />
      <Stack.Screen name="MyPost" component={MyPost} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
    </Stack.Navigator>
  );
};

export default Main;
