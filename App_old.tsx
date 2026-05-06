/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from './src/utils/NavigationContext';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/SplashScreen';
import Login from './src/screens/authStack/Login';
import CreateProfile from './src/screens/authStack/CreateProfile';
import OtpScreen from './src/screens/authStack/OtpScreen';
import ForgetPassword from './src/screens/authStack/ForgetPassword';
import NewPassword from './src/screens/authStack/NewPassword';
import MainTabs from './src/routes/BottomStack';
import CompleteProfile from './src/screens/authStack/CompleteProfile';
import Signup from './src/screens/authStack/Signup';
import {useEffect} from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import PropertiesForSale from './src/screens/appStack/PropertiesForSale';
import Filter from './src/screens/appStack/Filter';
import ContactSeller from './src/screens/appStack/ContactSeller';
import Ratings from './src/screens/appStack/Ratings';
import PrivacyPolicy from './src/screens/appStack/PrivacyPolicy';
import TermsConditions from './src/screens/appStack/TermsConditions';
import ContactForm from './src/screens/appStack/ContactForm';
import ReservationDetails from './src/screens/appStack/ReservationDetails';
import PaymentDetails from './src/screens/appStack/PaymentDetails';
import AddCard from './src/screens/appStack/AddCard';
import MyWallet from './src/screens/appStack/MyWallet';
import ChangePassword from './src/screens/appStack/ChangePassword';
import MyFavrts from './src/screens/appStack/MyFavrts';
import MyProfile from './src/screens/appStack/MyProfile';
import EditProfile from './src/screens/appStack/EditProfile';
import MyCards from './src/screens/appStack/MyCards';
import MyBookings from './src/screens/appStack/MyBookings';
import BookingDetails from './src/screens/appStack/BookingDetails';
import PropertyDetails from './src/screens/appStack/PropertyDetails';
import RoomDetails from './src/screens/appStack/RoomDetails';
import SellerProfile from './src/screens/appStack/SellerProfile';
import MyPost from './src/screens/appStack/MyPost';
import CreatePost from './src/screens/appStack/CreatePost';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from './src/assets/colors';
import {responsiveHeight} from './src/responsive_dimensions';
import Routes from './src/routes/Routes';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import Toast from 'react-native-toast-message';
import {Platform, Text, View} from 'react-native';
const Stack = createNativeStackNavigator();

function App() {
  const {navigationRef} = useNavigation();
  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="CompleteProfile"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="BottomStack" component={MainTabs} />
          <Stack.Screen
            name="PropertiesForSale"
            component={PropertiesForSale}
          />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="ContactSeller" component={ContactSeller} />
          <Stack.Screen name="ContactForm" component={ContactForm} />
          <Stack.Screen
            name="ReservationDetails"
            component={ReservationDetails}
          />
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
      </NavigationContainer>
    </>
  );
}
export default function MobileApp() {
  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.white,
            paddingTop: Platform.OS === 'ios' ? responsiveHeight(4) : null,
          }}>
          <NavigationContainer>
            <Routes />
            <Toast position="top" />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
    // <View style={{flex: 1}}>
    //   <Text>Mobile App is under maintenance. Please check back later.</Text>
    // </View>
  );
}
